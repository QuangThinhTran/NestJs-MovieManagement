import { Injectable } from '@nestjs/common';
import { Cinema } from './entities/cinema.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CinemaService {
  constructor(
    @InjectRepository(Cinema)
    private readonly cinemaRepository: Repository<Cinema>,
  ) {}

  async create(data: Cinema): Promise<any> {
    return this.cinemaRepository.save(data);
  }

  async findAll(): Promise<Cinema[]> {
    return this.cinemaRepository.find();
  }

  async findOne(id: number): Promise<Cinema> {
    return this.cinemaRepository.findOne({ where: { id } });
  }

  async update(id: number, data: Cinema): Promise<Cinema> {
    await this.cinemaRepository.update(id, data);
    return this.cinemaRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.cinemaRepository.softDelete({ id });
  }

  async restore(id: number): Promise<Cinema> {
    await this.cinemaRepository.restore({ id });
    return this.cinemaRepository.findOne({ where: { id }, withDeleted: true });
  }

  async search(data: Cinema): Promise<Cinema[]> {
    return this.cinemaRepository.find({
      where: {
        name: data.name,
        address: data.address,
      },
    });
  }
}
