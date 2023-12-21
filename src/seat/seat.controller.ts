import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Res, Put, UseGuards } from '@nestjs/common';
import { SeatService } from './seat.service';
import { Seat } from './entities/seat.entity';
import { LoggerService } from 'src/logger/logger.service';
import { Response } from 'express';
import { Constant, Messages } from 'src/constant/Constant';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Seat')
@Controller('seat')
export class SeatController {
  constructor(
    private readonly seatService: SeatService,
    private readonly logger: LoggerService
    ) {
      this.logger.setContext('SeatService')
    }

  @UseGuards(AuthGuard('jwt'))
  @Post('/create')
  async create(@Body() data: Seat, @Res() res: Response): Promise<void> {
    try {
      const seat = await this.seatService.create(data);
      res.status(HttpStatus.CREATED).send({
          data: {...seat, 
            type: seat.type === Constant.TYPE_SEAT_NOMAL ? Messages.TYPE_SEAT_NOMAL : Messages.TYPE_SEAT_VIP,
            status: seat.status === true ? Messages.STATUS_SEAT_BOOKED : Messages.STATUS_SEAT_BOOK
          },
          status: HttpStatus.CREATED
      })
    } catch (e) {
      this.logger.error(e.message);
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    } 
  }

  @Get('/list-seat/:id')
  async getAll(@Param('id') id: number, @Res() res: Response): Promise<void> {
    try {
      const data = await this.seatService.getListSeatByTheater(id);
      if (!data) {
        res.status(HttpStatus.NOT_FOUND).send({
          message: `${id} ` + Messages.NOT_FOUND,
        })
        return;
      }
      
      const type = this.getTypeSeat(data)
      const result = this.getStatusSeat(type)

      res.status(HttpStatus.OK).send({
        data: result,
        status: HttpStatus.OK
      })
    } catch (e) {
      this.logger.error(e.message);
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    } 
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('/update/:id')
  async update(@Param('id') id: number, @Body() data: Seat,@Res() res: Response): Promise<void> {
    try {
      const seat = await this.seatService.update(id, data)
      res.status(HttpStatus.OK).send({
        data: {...seat, 
          type: seat.type === Constant.TYPE_SEAT_NOMAL ? Messages.TYPE_SEAT_NOMAL : Messages.TYPE_SEAT_VIP,
          status: seat.status === true ? Messages.STATUS_SEAT_BOOKED : Messages.STATUS_SEAT_BOOK
        }
      })
    } catch (e) {
      this.logger.error(e.message);
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.seatService.remove(id);
  }

  getTypeSeat(data: Seat[]): Seat[] {
    const result = []
    for(const item of data) {
      if (item.type == Constant.TYPE_SEAT_NOMAL && item.status == true) {
        const update = {...item, type: Messages.TYPE_SEAT_NOMAL}
        result.push(update)
      }
      else {
        const update = {...item, type: Messages.TYPE_SEAT_VIP}
        result.push(update)
      }
    }
    return result;
  }

  getStatusSeat(data: Seat[]): Seat[] {
    const result = []
    for(const item of data) {
      if (item.status === true) {
        const update = {...item, status: Messages.STATUS_SEAT_BOOKED}
        result.push(update)
      }
      else {
        const update = {...item, status: Messages.STATUS_SEAT_BOOK}
        result.push(update)
      }
    }
    return result;
  }
}
