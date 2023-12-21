import { Module } from '@nestjs/common';
import { SeatService } from './seat.service';
import { SeatController } from './seat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seat } from './entities/seat.entity';
import { LoggerService } from 'src/logger/logger.service';

@Module({
  imports: [TypeOrmModule.forFeature([Seat])],
  controllers: [SeatController],
  providers: [SeatService, LoggerService],
})
export class SeatModule {}
