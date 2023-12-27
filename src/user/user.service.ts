import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find({
      relations: ['role_id'],
    });
  }

  async findOne(id: number | any ): Promise<User> {
    return this.userRepository.findOne({
      where: { id : id },
      relations: ['role_id'],
    });
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

  async checkExist(data: User): Promise<User>
  {
    return this.userRepository.findOne({
      where: {
        username: data.username,
        email: data.username
      }
    })
  }

  async search(query: User): Promise<any> {
    return this.userRepository
      .createQueryBuilder('User')
      .where('User.username LIKE :username', {
        username: `%${query.username}%`,
      })
      .orWhere('User.email LIKE :email', { email: `%${query.email}%` })
      .getMany();
  }
}
