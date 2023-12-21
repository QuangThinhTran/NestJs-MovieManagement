import { Injectable } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) {}
  async create(data: Movie, files): Promise<Movie> {
    const { banner, trailer } = files;
    const movie = {
      ...data,
      trailer: trailer[0].originalname,
      banner: banner[0].originalname,
    };

    return this.movieRepository.save(movie);
  }

  async findAll(): Promise<Movie[]> {
    return this.movieRepository.find();
  }

  async findOne(id: number): Promise<Movie> {
    return this.movieRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, data: Movie, files): Promise<Movie> {
    const { banner, trailer } = files;
    const movie = {
      banner: banner[0].originalname,
      trailer: trailer[0].originalname,
      ...data,
    };

    await this.movieRepository.update(id, movie);
    return this.movieRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.movieRepository.softDelete(id);
  }

  async restore(id: number): Promise<Movie> {
    await this.movieRepository.restore({ id });
    return this.movieRepository.findOne({ where: { id }, withDeleted: true });
  }

  async search(query: Movie): Promise<Movie[]> {
    return this.movieRepository
      .createQueryBuilder('Movie')
      .where('Movie.movie_name LIKE :value', { value: `%${query.movie_name}%` })
      .getMany();
  }
}
