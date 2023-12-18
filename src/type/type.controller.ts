import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  HttpException,
  HttpStatus,
  Res,
  Put,
} from '@nestjs/common';
import { TypeService } from './type.service';
import { Type } from './entities/type.entity';
import { LoggerService } from './../logger/logger.service';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Messages } from 'src/constant/Constant';

@ApiTags('Type')
@Controller('type')
export class TypeController {
  constructor(
    private readonly typeService: TypeService,
    private readonly logger: LoggerService,
  ) {
    this.logger.setContext('TypeService');
  }

  @Post('/create')
  async create(@Body() type: Type, @Res() res: Response): Promise<void> {
    try {
      const existData = await this.typeService.search(type);
      if (existData) {
        console.log(!existData);
        res.status(HttpStatus.CONFLICT).send({
          message: `${existData.name} ` + Messages.DUPLICATE_DATA,
          status: HttpStatus.CONFLICT,
        });
      }

      const data = await this.typeService.create(type);
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
      const data = await this.typeService.findAll();
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
      const data = await this.typeService.findOne(id);
      if (!data) {
        res.status(HttpStatus.NOT_FOUND).send({
          message: `#${id} ` + Messages.NOT_FOUND,
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
  async pdate(
    @Param('id') id: number,
    @Body() type: Type,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const data = await this.typeService.update(id, type);
      if (!data) {
        res.status(HttpStatus.NOT_FOUND).send({
          message: Messages.NOT_FOUND,
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
      const existType = await this.typeService.findOne(id);
      if (!existType) {
        res.status(HttpStatus.NOT_FOUND).send({
          message: `${id} ` + Messages.NOT_FOUND,
          status: HttpStatus.NOT_FOUND,
        });
        return;
      }

      await this.typeService.remove(id);
      res.status(HttpStatus.OK).send({
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
      const data = await this.typeService.restore(id);
      if (!data) {
        res.status(HttpStatus.NOT_FOUND).send({
          message: `${id} ` + Messages.NOT_FOUND,
          status: HttpStatus.NOT_FOUND,
        });
      }
      res.status(HttpStatus.OK).send({
        message: Messages.RESTORE_SUCCESS,
        data: data,
        status: HttpStatus.OK,
      });
    } catch (e) {
      this.logger.error(e);
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/search')
  async search(@Query() query, @Res() res: Response): Promise<void> {
    try {
      const data = await this.typeService.search(query);
      res.status(HttpStatus.OK).send({
        data: data,
        status: HttpStatus.OK,
      });
    } catch (e) {
      this.logger.error(e);
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
