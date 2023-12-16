import {
  Controller,
  Post,
  Body,
  HttpException,
  Res,
  HttpStatus,
  UseGuards,
  Request,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/user/entities/user.entity';
import { UserService } from './../user/user.service';
import { Messages } from 'src/constant/Messages';
import { ApiTags } from '@nestjs/swagger';
import { LoggerService } from 'src/logger/logger.service';
import { Auth } from './enities/auth.enity';
import { AuthService } from './auth.service';
import { TokenBlacklistService } from 'src/services/TokenBlacklist.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly logger: LoggerService,
    private readonly backlist: TokenBlacklistService,
  ) {
    this.logger.setContext('AuthService');
  }

  @Post('/register')
  async handleRegister(
    @Body() user: User,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const existUser = await this.userService.search(user);
      if (existUser) {
        res.status(HttpStatus.CONFLICT).send({
          message: `${user.username} ` + Messages.DUPLICATE_DATA,
          status: HttpStatus.CONFLICT,
        });
      }

      const data = await this.authService.register(user);
      res.status(HttpStatus.CREATED).send({
        message: Messages.CREATE_SUCCESS,
        data: data,
        status: HttpStatus.OK,
      });
    } catch (e) {
      this.logger.error(e.message);
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('/login')
  async handleLogin(@Body() auth: Auth, @Res() res: Response): Promise<void> {
    try {
      const data = await this.authService.login(auth);
      if (!data) {
        res.status(HttpStatus.OK).send({
          message: Messages.LOGIN_FAILED,
          status: HttpStatus.OK,
        });
        return;
      }

      res.status(HttpStatus.OK).send({
        message: Messages.LOGIN_SUCCESS,
        data: data,
        status: HttpStatus.OK,
      });
    } catch (e) {
      this.logger.error(e.message);
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/logout')
  async handleLogout(@Request() req, @Res() res: Response) {
    try {
      res.status(HttpStatus.OK).send({
        message: Messages.LOGOUT_SUCCESS,
        status: HttpStatus.OK,
      });
    } catch (e) {
      this.logger.error(e.message);
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
