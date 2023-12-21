import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { LoggerService } from 'src/logger/logger.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cinema } from 'src/cinema/entities/cinema.entity';
import { Movie } from 'src/movie/entities/movie.entity';
import { MovieTheater } from 'src/movie-theater/entities/movie-theater.entity';
import { MovieShowTime } from 'src/movie-show-time/entities/movie-show-time.entity';
import { MovieService } from 'src/movie/movie.service';
import { MovieShowTimeService } from 'src/movie-show-time/movie-show-time.service';
import { MovieTheaterService } from 'src/movie-theater/movie-theater.service';
import { CinemaService } from 'src/cinema/cinema.service';
import { DateTimeService } from 'src/services/DateTime.service';

@Module({
  imports: [TypeOrmModule.forFeature([Movie, Cinema, MovieTheater, MovieShowTime])],
  controllers: [SearchController],
  providers: [LoggerService, MovieService,CinemaService, MovieTheaterService, MovieShowTimeService, DateTimeService],
})
export class SearchModule {}
