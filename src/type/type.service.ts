import { Injectable } from '@nestjs/common';
import { Type } from './entities/type.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TypeService {
  constructor(
    @InjectRepository(Type)
    private readonly typeRepository: Repository<Type>,
  ) {}
  async create(type: Type): Promise<Type> {
    return this.typeRepository.save(type);
  }

  async findAll(): Promise<Type[]> {
    return this.typeRepository.find();
  }

  async findOne(id: number): Promise<Type> {
    return this.typeRepository.findOne({ where: { id } });
  }

  async update(id: number, type: Type): Promise<Type> {
    await this.typeRepository.update(id, type);
    return this.typeRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.typeRepository.softDelete(id);
  }

  async restore(id: number): Promise<Type> {
    await this.typeRepository.restore(id);
    return this.typeRepository.findOne({ where: { id }, withDeleted: true });
  }

  async search(data: Type): Promise<Type> {
    return this.typeRepository.findOne({
      where: {
        name: data.name,
      },
    });
  }
}
