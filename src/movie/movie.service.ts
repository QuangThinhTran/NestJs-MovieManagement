import { Injectable } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>
  ){}
  async create(data: Movie): Promise<Movie> {
    return this.movieRepository.save(data);
  }

  async findAll(): Promise<Movie[]> {
    return this.movieRepository.find();
  }

  async findOne(id: number): Promise<Movie> {
    return this.movieRepository.findOne({where: {id}});
  }

  async update(id: number, data: Movie): Promise<Movie> {
    await this.movieRepository.update(id, data)
    return this.movieRepository.findOne({ where: {id}});
  }

  async remove(id: number): Promise<any> {
    await this.movieRepository.softDelete(id);
  }

  async restore(id: number): Promise<Movie> {
    await this.movieRepository.restore(id)
    return this.movieRepository.findOne({where: {id}, withDeleted: true})
  }

  async search(data): Promise<Movie[]> {
    return this.movieRepository.find({
      where: {
        movie_name: data.movie_name,
        banner: data.banner,
        description: data.description,
        trailer: data.trailer
      }
    })
  }
}
