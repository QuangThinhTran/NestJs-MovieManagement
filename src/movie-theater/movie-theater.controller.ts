import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  Res,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { MovieTheaterService } from './movie-theater.service';
import { MovieTheater } from './entities/movie-theater.entity';
import { ApiTags } from '@nestjs/swagger';
import { LoggerService } from 'src/logger/logger.service';
import { Response } from 'express';
import { Constant, Messages } from 'src/constant/Constant';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Movie Theater')
@Controller('movie-theater')
export class MovieTheaterController {
  constructor(
    private readonly movieTheaterService: MovieTheaterService,
    private readonly logger: LoggerService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('/create')
  async create(
    @Body() data: MovieTheater,
    @Res() res: Response,
  ): Promise<MovieTheater> {
    try {
      const movieTheater = await this.movieTheaterService.create(data);
      res.status(HttpStatus.CREATED).send({
        data: {
          ...movieTheater,
          status:
            movieTheater.status == Constant.STATUS_MOVIE_THEATER_ACTIVE
              ? Messages.MOVIE_THEATER_ACTIVE
              : Messages.MOVIE_THEATER_INACTIVE,
        },
        message: Messages.CREATE_SUCCESS,
      });
    } catch (e) {
      this.logger.error(e);
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return this.movieTheaterService.create(data);
  }

  @Get()
  async findAll(@Res() res: Response): Promise<void> {
    try {
      const data = await this.movieTheaterService.findAll();

      const result = this.getActiveMovieTheater(data);
      res.status(HttpStatus.OK).send({
        data: result,
        status: HttpStatus.OK,
      });
    } catch (e) {
      this.logger.error(e);
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('/update/:id')
  async updateName(
    @Param('id') id: number,
    @Body() data: MovieTheater,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const newData = await this.movieTheaterService.updateName(id, data);
      if (!newData) {
        res.status(HttpStatus.NOT_FOUND).send({
          message: Messages.NOT_FOUND,
          status: HttpStatus.NOT_FOUND,
        });
        return;
      }

      res.status(HttpStatus.OK).send({
        message: Messages.UPDATE_SUCCESS,
        data: {
          ...newData,
          status:
            newData.status == Constant.STATUS_MOVIE_THEATER_ACTIVE
              ? Messages.MOVIE_THEATER_ACTIVE
              : Messages.MOVIE_THEATER_INACTIVE,
        },
        status: HttpStatus.OK,
      });
    } catch (e) {
      this.logger.error(e);
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/detele/:id')
  async remove(@Param('id') id: number, @Res() res: Response): Promise<void> {
    try {
      await this.movieTheaterService.remove(id);
      res.status(HttpStatus.OK).send({
        message: Messages.DELETE_SUCCESS,
        status: HttpStatus.OK,
      });
    } catch (e) {
      this.logger.error(e);
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/restore/:id')
  async restore(@Param('id') id: number, @Res() res: Response): Promise<void> {
    try {
      const data = await this.movieTheaterService.restore(id);
      if (!data) {
        res.status(HttpStatus.NOT_FOUND).send({
          message: `${id} ` + Messages.NOT_FOUND,
          status: HttpStatus.NOT_FOUND,
        });
      }
      res.status(HttpStatus.OK).send({
        message: Messages.RESTORE_SUCCESS,
        data: {
          ...data,
          status:
            data.status == Constant.STATUS_MOVIE_THEATER_ACTIVE
              ? Messages.MOVIE_THEATER_ACTIVE
              : Messages.MOVIE_THEATER_INACTIVE,
        },
        status: HttpStatus.OK,
      });
    } catch (e) {
      this.logger.error(e);
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
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
