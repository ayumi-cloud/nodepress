import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import { AUTH } from '@app/app.config';
import buildUnauthorizedException from '@app/errors/unauthorized';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: AUTH.jwtTokenSecret,
    });
  }

  validate(payload: any) {
    const data = this.authService.validateAuthData(payload);
    if (data) {
      return data;
    } else {
      throw buildUnauthorizedException();
    }
  }
}