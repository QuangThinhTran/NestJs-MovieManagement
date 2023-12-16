import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Auth } from './enities/auth.enity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    readonly authRepository: Repository<User>,
    private readonly JWT: JwtService,
  ) {}

  async register(user: User): Promise<User> {
    const hashPassword = await bcrypt.hash(user.password, 10);
    const data = { ...user, password: hashPassword };
    return this.authRepository.save(data);
  }

  async login(user: Auth): Promise<any> {
    const auth = await this.authRepository.findOne({
      where: {
        username: user.username,
      },
    });

    if (!auth) {
      return false;
    }

    const match = await bcrypt.compare(user.password, auth.password);
    if (!match) {
      return false;
    }

    return {
      username: auth.username,
      email: auth.email,
      token: this.JWT.sign(user),
    };
  }

  logout() {
    return 'Authentication=; HttpOnly; Path=/; Max-Age=0';
  }
}
