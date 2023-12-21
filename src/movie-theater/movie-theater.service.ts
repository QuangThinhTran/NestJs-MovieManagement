import { Injectable } from '@nestjs/common';
import { MovieTheater } from './entities/movie-theater.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MovieTheaterService {
  constructor(
    @InjectRepository(MovieTheater)
    private readonly movieTheater: Repository<MovieTheater>,
  ) {}

  async create(data: MovieTheater): Promise<MovieTheater> {
    return this.movieTheater.save(data);
  }

  async findAll(): Promise<MovieTheater[]> {
    return this.movieTheater.find();
  }

  async updateStatus(id: number, data: MovieTheater): Promise<MovieTheater> {
    await this.movieTheater.update(id, {
      status: data.status,
    });
    return this.movieTheater.findOne({ where: { id } });
  }

  async updateName(id: number, data: MovieTheater): Promise<MovieTheater> {
    await this.movieTheater.update(id, {
      name: data.name,
    });
    return this.movieTheater.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.movieTheater.softDelete(id);
  }

  async restore(id: number): Promise<MovieTheater> {
    await this.movieTheater.restore(id);
    return this.movieTheater.findOne({ where: { id }, withDeleted: true });
  }

  async search(data: MovieTheater): Promise<MovieTheater[]> {
    return this.movieTheater
      .createQueryBuilder('movie_theater')
      .where('movie_theater.name LIKE :name', { name: `%${data.name}%` })
      .getMany();
  }
}
