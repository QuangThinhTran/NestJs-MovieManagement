import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Auth } from 'src/auth/enities/auth.enity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<any> {
    return this.userRepository.find({
      relations: ['role_id'],
    });
  }

  async findOne(id: number): Promise<any> {
    return this.userRepository.findOne({ where: { id } });
  }

  async update(id: number, user: User): Promise<User> {
    await this.userRepository.update(id, user);
    return this.userRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<User> {
    await this.userRepository.softDelete({ id });
    return this.userRepository.findOne({ where: { id } });
  }

  async restore(id: number): Promise<User> {
    await this.userRepository.restore(id);
    return this.userRepository.findOne({ where: { id } });
  }

  async search(query: User | Auth): Promise<any> {
    return this.userRepository.findOne({
      where: {
        username: query.username,
      },
    });
  }
}
