import { Injectable } from '@nestjs/common';
import { MovieShowTime } from './entities/movie-show-time.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DateTimeService } from 'src/services/DateTime.service';
@Injectable()
export class MovieShowTimeService {
  constructor(
    @InjectRepository(MovieShowTime)
    private readonly movieShowTimeRepository: Repository<MovieShowTime>,
    private readonly datetimeServie: DateTimeService
  ) {}

  async create(data: MovieShowTime): Promise<MovieShowTime> {
    return this.movieShowTimeRepository.save(data);
  }

  async findAll(): Promise<MovieShowTime[]> {
    return this.movieShowTimeRepository.find({
      relations: ['movie_id', 'cinema_id', 'movie_theater_id']
    });
  }

  async findOne(id: number): Promise<MovieShowTime> {
    return this.movieShowTimeRepository.findOne({
      where: {id},
      relations: ['movie_id', 'cinema_id', 'movie_theater_id']
    });
  }

  async update(id: number, data: MovieShowTime): Promise<MovieShowTime> {
    await this.movieShowTimeRepository.update(id, data);
    return this.movieShowTimeRepository.findOne({
      where: {id},
      relations: ['movie_id', 'cinema_id', 'movie_theater_id']
    });
  }

  async remove(id: number) {
    await this.movieShowTimeRepository.softDelete(id)
  }

  async duplicateMovieShowtime(data: MovieShowTime): Promise<MovieShowTime> {
    return this.movieShowTimeRepository.findOne({
        where: {
            start_time : data.start_time,
            movie_id: data.movie_id,
            cinema_id: data.cinema_id,
            movie_theater_id: data.movie_theater_id
        }
    })
  }

  async sameDate(start_time: string, end_time: string) {
    const currentStartTime = this.datetimeServie.convertToDateTime(start_time)
    const currentEndTime = this.datetimeServie.convertToDateTime(end_time)
    if (currentStartTime > currentEndTime) {
        return true;
    }
    else {
      return false
    }
  }

  async search(data: MovieShowTime): Promise<MovieShowTime[]> {
    return this.movieShowTimeRepository
    .createQueryBuilder('movie_show_time')
    .leftJoinAndSelect('movie_show_time.movie_id', 'movie')
    .leftJoinAndSelect('movie_show_time.movie_theater_id','movie_theater')
    .leftJoinAndSelect('movie_show_time.cinema_id', 'cinema_id')
    .where('movie_show_time.start_time LIKE :start_time', { start_time: `%${data.start_time}%` })
    .getMany()
  }
}
