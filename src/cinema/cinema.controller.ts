import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
  Res,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CinemaService } from './cinema.service';
import { Cinema } from './entities/cinema.entity';
import { ApiTags } from '@nestjs/swagger';
import { LoggerService } from 'src/logger/logger.service';
import { Response } from 'express';
import { Messages } from 'src/constant/Constant';

@ApiTags('Cinema')
@Controller('cinema')
export class CinemaController {
  constructor(
    private readonly cinemaService: CinemaService,
    private readonly logger: LoggerService,
  ) {
    this.logger.setContext('CinemaService');
  }

  @Post('/create')
  async create(@Body() cinema: Cinema, @Res() res: Response): Promise<void> {
    try {
      const existCinema = await this.cinemaService.search(cinema);
      if (existCinema) {
        res.status(HttpStatus.CONFLICT).send({
          message:
            `${cinema.name} or ${cinema.address} ` + Messages.DUPLICATE_DATA,
          status: HttpStatus.CONFLICT,
        });
        return;
      }
      const data = await this.cinemaService.create(cinema);
      res.status(HttpStatus.CREATED).send({
        message: Messages.CREATE_SUCCESS,
        data: data,
        status: HttpStatus.CREATED,
      });
    } catch (e) {
      this.logger.error(e);
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  async findAll(@Res() res: Response): Promise<void> {
    try {
      const data = await this.cinemaService.findAll();
      res.status(HttpStatus.OK).send({
        data: data,
        status: HttpStatus.OK,
      });
    } catch (e) {
      this.logger.error(e);
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/detail/:id')
  async findOne(@Param('id') id: number, @Res() res: Response): Promise<void> {
    try {
      const data = await this.cinemaService.findOne(+id);
      if (!data) {
        res.status(HttpStatus.NOT_FOUND).send({
          message: Messages.NOT_FOUND + ` #${id}`,
          status: HttpStatus.NOT_FOUND,
        });
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

  @Put('/update/:id')
  async update(
    @Param('id') id: number,
    @Body() cinema: Cinema,
    @Res() res: Response,
  ): Promise<void> {
    try {
      console.log(cinema);
      const data = await this.cinemaService.update(id, cinema);
      if (!data) {
        res.status(HttpStatus.NOT_FOUND).send({
          message: Messages.NOT_FOUND + ` #${id}`,
          status: HttpStatus.NOT_FOUND,
        });
      }
      res.status(HttpStatus.OK).send({
        message: Messages.UPDATE_SUCCESS,
        data: data,
        status: HttpStatus.OK,
      });
    } catch (e) {
      this.logger.error(e);
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete('/delete/:id')
  async remove(@Param('id') id: number, @Res() res: Response): Promise<void> {
    try {
      const data = await this.cinemaService.findOne(id);
      if (!data) {
        res.status(HttpStatus.NOT_FOUND).send({
          message: Messages.NOT_FOUND + ` #${id}`,
          status: HttpStatus.NOT_FOUND,
        });
        return;
      }

      await this.cinemaService.remove(id);
      res.status(200).send({
        message: Messages.DELETE_SUCCESS,
        status: HttpStatus.OK,
      });
    } catch (e) {
      this.logger.error(e);
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('/restore/:id')
  async restore(@Param('id') id: number, @Res() res: Response): Promise<void> {
    try {
      const data = await this.cinemaService.restore(id);
      if (!data) {
        res.status(HttpStatus.NOT_FOUND).send({
          message: Messages.NOT_FOUND + ` #${id}`,
          status: HttpStatus.NOT_FOUND,
        });
      }
      res.status(200).send({
        message: Messages.RESTORE_SUCCESS,
        data: data,
        status: HttpStatus.OK,
      });
    } catch (e) {
      this.logger.error(e.message);
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/search')
  async search(@Query() query, @Res() res: Response): Promise<void> {
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
}
