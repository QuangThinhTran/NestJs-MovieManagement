import { Module } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from './entities/ticket.entity';
import { LoggerService } from 'src/logger/logger.service';
import { ListSeatService } from 'src/list-seat/list-seat.service';
import { ListSeat } from 'src/list-seat/entities/list-seat.entity';
import { SeatService } from 'src/seat/seat.service';
import { Seat } from 'src/seat/entities/seat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ticket, ListSeat, Seat])],
  controllers: [TicketController],
  providers: [TicketService, LoggerService, ListSeatService, SeatService],
})
export class TicketModule {}
