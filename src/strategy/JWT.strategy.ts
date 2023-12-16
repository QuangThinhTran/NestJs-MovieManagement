import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { UserService } from './../user/user.service';

dotenv.config();

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_KEY,
    });
  }

  async validate(decodeToken: any) {
    return decodeToken;
  }
}
