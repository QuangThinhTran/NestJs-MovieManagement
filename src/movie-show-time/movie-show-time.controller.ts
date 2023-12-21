import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpException,
  HttpStatus,
  Put,
  UseGuards,
} from '@nestjs/common';
import { MovieShowTimeService } from './movie-show-time.service';
import { MovieShowTime } from './entities/movie-show-time.entity';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { LoggerService } from 'src/logger/logger.service';
import { Messages } from 'src/constant/Constant';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Movie Showtime')
@Controller('movie-show-time')
export class MovieShowTimeController {
  constructor(
    private readonly movieShowTimeService: MovieShowTimeService,
    private readonly logger: LoggerService
    ) {
      this.logger.setContext('MovieShowTimeService')
    }

  @UseGuards(AuthGuard('jwt'))
  @Post('/create')
  async create(@Body() data: MovieShowTime, @Res() res: Response) {
    try {
      
      const checkDuplicate = await this.movieShowTimeService.duplicateMovieShowtime(data)
      if (checkDuplicate) {
        res.status(HttpStatus.OK).send({
          message: "Same date movie showtime",
        })
        return;
      }

      const checkSameDate = await this.movieShowTimeService.sameDate(data.start_time, checkDuplicate.end_time);
      console.log(checkSameDate)
      if (!checkSameDate) {
        res.status(HttpStatus.OK).send({
          message: "Same date movie showtime",
        })
        return;
      }
      const movieShowtime = await this.movieShowTimeService.create(data);
      if (!movieShowtime) {
        res.status(HttpStatus.CONFLICT).send({
          message: "The showtime movie is showing",
          status: HttpStatus.CONFLICT,
        });
        return;
      }

      res.status(HttpStatus.OK).send({
        data: data,
        status: HttpStatus.OK
      })
    } catch (e) {
      this.logger.error(e);
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    
  }

  @Get()
  async findAll(@Res() res: Response): Promise<void> {
    try {
      const data = await this.movieShowTimeService.findAll();
      res.status(HttpStatus.OK).send({
        data: data,
        status: HttpStatus.OK
      }) 
    } catch (e) {
      this.logger.error(e);
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/detail/:id')
  async findOne(@Param('id') id: number,@Res() res: Response): Promise<void> {
    try {
        const data = await this.movieShowTimeService.findOne(id);
        if (!data) {
          res.status(HttpStatus.NOT_FOUND).send({
            message: `#${id} ` + Messages.NOT_FOUND,
            status: HttpStatus.NOT_FOUND,
          });
          return;
        }

        res.status(HttpStatus.OK).send({
          data: data,
          status: HttpStatus.OK,
        });
    } catch (e) {
      this.logger.error(e);
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('/update/:id')
  async update(@Param('id') id: number, @Body() data: MovieShowTime, @Res() res: Response): Promise<void> {
    try {
      const newData = await this.movieShowTimeService.update(id, data) 
      if (!newData) {
        res.status(HttpStatus.NOT_FOUND).send({
          message: `#${id} ` + Messages.NOT_FOUND,
          status: HttpStatus.NOT_FOUND,
        });
        return;
      }

      res.status(HttpStatus.OK).send({
        data: newData,
        status: HttpStatus.OK,
      });
    } catch (e) {
      this.logger.error(e);
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/delete/:id')
  async remove(@Param('id') id: number, @Res() res: Response): Promise<void> {
    try {
      const data = await this.movieShowTimeService.findOne(id);
      if (!data) {
        res.status(HttpStatus.NOT_FOUND).send({
          message: Messages.NOT_FOUND + ` #${id}`,
          status: HttpStatus.NOT_FOUND,
        });
        return;
      }
      await this.movieShowTimeService.remove(id);
      res.status(200).send({
        message: Messages.DELETE_SUCCESS,
        status: HttpStatus.OK,
      });

    } catch (e) {
      this.logger.error(e);
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    } 
  }
}
