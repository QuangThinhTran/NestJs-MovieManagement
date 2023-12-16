import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async create(newRole: Role): Promise<Role> {
    return this.roleRepository.save(newRole);
  }

  async findAll(): Promise<any> {
    return this.roleRepository.find();
  }

  async findOne(id: number): Promise<Role> {
    return this.roleRepository.findOne({ where: { id } });
  }

  async update(id: number, updateRole: Role): Promise<Role> {
    await this.roleRepository.update(id, updateRole);
    return this.roleRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.roleRepository.softDelete({ id });
  }

  async restore(id: number): Promise<Role> {
    await this.roleRepository.restore(id);
    return this.roleRepository.findOne({ where: { id }, withDeleted: true });
  }

  async search(query: Role): Promise<Role[]> {
    return this.roleRepository.find({
      where: {
        name: query.name,
      },
    });
  }
}
