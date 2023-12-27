import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Res, UseGuards } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { LoggerService } from 'src/logger/logger.service';
import { Ticket } from './entities/ticket.entity';
import { ListSeatService } from 'src/list-seat/list-seat.service';
import { Seat } from 'src/seat/entities/seat.entity';
import { Response } from 'express';
import { Constant, Messages } from 'src/constant/Constant';
import { ListSeat } from 'src/list-seat/entities/list-seat.entity';
import { SeatService } from 'src/seat/seat.service';
import { AuthGuard } from '@nestjs/passport';
import { MailService } from 'src/mail/mail.service';
import { UserService } from 'src/user/user.service';

// @UseGuards(AuthGuard('jwt'))
@Controller('ticket')
export class TicketController {
  constructor(
    private readonly ticketService: TicketService,
    private readonly listSeatService: ListSeatService,
    private readonly seatService: SeatService,
    private readonly userService: UserService,
    private readonly mailService: MailService,
    private readonly logger: LoggerService
    ) {
      this.logger.setContext('TicketService')
    }

    @Post('/booking-ticket')
    async bookingTicket(@Body() data: Ticket, @Res() res: Response): Promise<void>
    { 
      try {
        const seats = Array.isArray(data.seat_id) ? data.seat_id : [data.seat_id]
        const ticket =  await this.ticketService.booking(data)

        for(const item of seats)
        {
            await this.listSeatService.addSeat({
              seat_id: item,
              ticket_id: ticket.id
            })
        }

        const user = await this.userService.findOne(ticket.user_id)

        await this.mailService.mailBookingTicket(user.email, ticket)
        res.status(HttpStatus.CREATED).send({
          'data': ticket
        })
      } catch (e) {
        this.logger.error(e);
        throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }

    @Get('/get-ticket/:id')
    async getTicket(@Param('id') id: number,@Res() res: Response): Promise<Ticket>{
      try {
          const ticket = await this.ticketService.getTicket(id)
          if (!ticket) {
            res.status(HttpStatus.NOT_FOUND).send({
              message: Messages.NOT_FOUND + ` #${id}`,
            });
            return;
          }
          const seat = await this.listSeatService.getSeat(ticket.id)

          const result = await this.getResponseTicket(ticket, seat)

          res.status(HttpStatus.OK).send({
            data: result,
            status: HttpStatus.OK,
          });
          return
      } catch (e) {
        this.logger.error(e);
        throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }

    async getResponseTicket(ticket: Ticket, seat: ListSeat[]) {
      const result = [];
      for(const item of seat) 
      {
        const seat = await this.seatService.seatDetail(item.seat_id)
        if (seat.type === Constant.TYPE_SEAT_NOMAL) {
            const update = Messages.TYPE_SEAT_NOMAL
            result.push({name: seat.name, type: update})
        }
        else{
          const update = Messages.TYPE_SEAT_VIP
          result.push({name: seat.name, type: update})
        }
      }
        return {
          total: ticket.total,
          user: ticket.user_id,
          movie_showtime: ticket.movie_showtime_id,
          seat: result
        }
    }
}
