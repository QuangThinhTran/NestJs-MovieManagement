import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Res,
  HttpStatus,
  HttpException,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Role } from './entities/role.entity';
import { Messages } from 'src/constant/Constant';
import { LoggerService } from 'src/logger/logger.service';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Role')
@Controller('role')
export class RoleController {
  constructor(
    private readonly roleService: RoleService,
    private readonly logger: LoggerService,
  ) {
    this.logger.setContext('RoleService');
  }

  @Post('/create')
  async create(@Body() newRole: Role, @Res() res: Response): Promise<void> {
    try {
      const existRole = await this.roleService.search(newRole);
      if (existRole) {
        res.status(HttpStatus.CONFLICT).send({
          message: `${newRole.name} ` + Messages.DUPLICATE_DATA,
          status: HttpStatus.CONFLICT,
        });
        return;
      }

      const data = await this.roleService.create(newRole);
      res.status(HttpStatus.CREATED).send({
        message: Messages.CREATE_SUCCESS,
        data: data,
        status: HttpStatus.CREATED,
      });
    } catch (e) {
      this.logger.error(e.message);
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async index(@Res() res: Response): Promise<void> {
    try {
      const data = await this.roleService.findAll();
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
  async find(@Param('id') id: number, @Res() res: Response): Promise<void> {
    try {
      const data = await this.roleService.findOne(id);
      if (!data) {
        res.status(HttpStatus.NOT_FOUND).send({
          message: Messages.NOT_FOUND + ` #${id}`,
          status: HttpStatus.NOT_FOUND,
        });
        return;
      }
      res.status(HttpStatus.OK).send({
        data: data,
        status: HttpStatus.OK,
      });
    } catch (e) {
      this.logger.error(e.message);
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put('/update/:id')
  async update(
    @Param('id') id: number,
    @Body() updateRole: Role,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const data = await this.roleService.update(id, updateRole);
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
      this.logger.error(e.message);
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete('/delete/:id')
  async remove(@Param('id') id: number, @Res() res: Response): Promise<void> {
    try {
      const data = await this.roleService.findOne(id);
      if (!data) {
        res.status(HttpStatus.NOT_FOUND).send({
          message: Messages.NOT_FOUND + ` #${id}`,
          status: HttpStatus.NOT_FOUND,
        });
      }

      await this.roleService.remove(id);

      res.status(200).send({
        message: Messages.DELETE_SUCCESS,
        status: HttpStatus.OK,
      });
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('/restore/:id')
  async restore(@Param('id') id: number, @Res() res: Response): Promise<void> {
    try {
      const data = await this.roleService.restore(id);
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
  async searchCondition(
    @Query() query: Role,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const data = await this.roleService.search(query);
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
