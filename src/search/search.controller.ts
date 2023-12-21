import { Controller, Get, HttpException, HttpStatus, Query, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { CinemaService } from 'src/cinema/cinema.service';
import { Constant, Messages } from 'src/constant/Constant';
import { LoggerService } from 'src/logger/logger.service';
import { MovieShowTimeService } from 'src/movie-show-time/movie-show-time.service';
import { MovieTheater } from 'src/movie-theater/entities/movie-theater.entity';
import { MovieTheaterService } from 'src/movie-theater/movie-theater.service';
import { Movie } from 'src/movie/entities/movie.entity';
import { MovieService } from 'src/movie/movie.service';

@ApiTags('Search')
@Controller('search')
export class SearchController {
  constructor(
    private readonly movieService: MovieService,
    private readonly cinemaService: CinemaService,
    private readonly movieTheaterService: MovieTheaterService,
    private readonly movieShowTimeService: MovieShowTimeService,
    private readonly logger: LoggerService
    ) {
      this.logger.setContext('SearchController')
    }

    @Get('/cinema')
    async searchCinema(@Query() query, @Res() res: Response): Promise<void> {
      try {
        const data = await this.cinemaService.search(query);
        res.status(HttpStatus.OK).send({
          data: data,
          status: HttpStatus.OK,
        });
      } catch (e) {
        this.logger.error(e.message);
        throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }

    @Get('/movie')
    async searchMovie(@Query() query, @Res() res: Response): Promise<void> {
      try {
        const data = await this.movieService.search(query);
  
        const result = this.getStatusMovie(data);
  
        res.status(HttpStatus.OK).send({
          data: result,
          status: HttpStatus.OK,
        });
      } catch (e) {
        this.logger.error(e);
        throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }

    @Get('/movie-theater')
    async searchMovieTheater(@Query() query, @Res() res: Response): Promise<void> {
      try {
        const data = await this.movieTheaterService.search(query);
        const result = this.getActiveMovieTheater(data);
  
        res.status(HttpStatus.OK).send({
          data: result,
          status: HttpStatus.OK,
        });
      } catch (e) {
        this.logger.error(e.message);
        throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }

    @Get('/movie-showtime')
    async searchMovieShowtime(@Query() query, @Res() res: Response): Promise<void> {
      try {
        console.log(query)
        const data = await this.movieShowTimeService.search(query);

        res.status(HttpStatus.OK).send({
          data: data,
          status: HttpStatus.OK,
        });
      } catch (e) {
        this.logger.error(e.message);
        throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }

    getStatusMovie(data: Movie[]) {
      const result = [];
      for (const item of data) {
        if (item.status === Constant.STATUS_MOVIE_ACTIVE) {
          const updatedItem = { ...item, status: Messages.MOVIE_NOW_SHOWING };
          result.push(updatedItem);
        } else {
          console.log(item);
          const updatedItem = { ...item, status: Messages.MOVIE_NOT_SHOWING };
          result.push(updatedItem);
        }
      }
      return result;
    }

    getActiveMovieTheater(data: MovieTheater[]) {
      const result = [];
      for (const item of data) {
        if (item.status == Constant.STATUS_MOVIE_THEATER_ACTIVE) {
          const updateItem = { ...item, status: Messages.MOVIE_THEATER_ACTIVE };
          result.push(updateItem);
        } else {
          const updateItem = { ...item, status: Messages.MOVIE_THEATER_INACTIVE };
          result.push(updateItem);
        }
      }
      return result;
    }
}
