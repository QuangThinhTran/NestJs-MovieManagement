import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Res,
  Put,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { Messages } from 'src/constant/Messages';
import { Response } from 'express';
import { LoggerService } from 'src/logger/logger.service';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly logger: LoggerService,
  ) {
    this.logger.setContext('UsersService');
  }

  @Get()
  async index(@Res() res: Response): Promise<void> {
    try {
      const data = await this.userService.findAll();
      res.status(HttpStatus.OK).send({
        data: data,
        status: HttpStatus.OK,
      });
    } catch (e) {
      this.logger.error(e.message);
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/detail/:id')
  async findOne(@Param('id') id: number, @Res() res: Response): Promise<void> {
    try {
      const data = this.userService.findOne(id);
      if (!data) {
        res.status(HttpStatus.NOT_FOUND).send({
          message: Messages.NOT_FOUND + ` #${id}`,
        });
      }
      res.status(HttpStatus.OK).send({
        data: data,
        status: HttpStatus.OK,
      });
    } catch (e) {
      this.logger.error(e.message);
      throw new HttpException(e.message, e.status);
    }
  }

  @Put('/update/:id')
  async update(
    @Param('id') id: number,
    @Body() updateUser: User,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const data = this.userService.update(id, updateUser);
      if (!data) {
        res.status(HttpStatus.NOT_FOUND).send({
          message: Messages.NOT_FOUND + ` #${id}`,
        });
      }
      res.status(HttpStatus.OK).send({
        message: Messages.UPDATE_SUCCESS,
        data: data,
        status: HttpStatus.OK,
      });
    } catch (e) {
      this.logger.error(e.message);
      throw new HttpException(e.message, e.status);
    }
  }

  @Delete('/delete/:id')
  async remove(@Param('id') id: number, @Res() res: Response): Promise<void> {
    try {
      const data = this.userService.findOne(id);
      if (!data) {
        res.status(HttpStatus.NOT_FOUND).send({
          message: Messages.NOT_FOUND + ` #${id}`,
        });
      }
      await this.userService.remove(id);
      res.status(HttpStatus.OK).send({
        message: Messages.DELETE_SUCCESS,
        status: HttpStatus.OK,
      });
    } catch (e) {
      this.logger.error(e.message);
      throw new HttpException(e.message, e.status);
    }
  }

  @Post('/restore/:id')
  async restore(@Param('id') id: number, @Res() res: Response): Promise<void> {
    try {
      const data = await this.userService.restore(id);
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
      throw new HttpException(e.message, e.status);
    }
  }

  @Get('/search')
  async search(@Query() query: User, @Res() res: Response): Promise<void> {
    try {
      const data = await this.userService.search(query);
      res.status(HttpStatus.OK).send({
        data: data,
        status: HttpStatus.OK,
      });
    } catch (e) {
      this.logger.error(e.message);
      throw new HttpException(e.message, e.status);
    }
  }
}
