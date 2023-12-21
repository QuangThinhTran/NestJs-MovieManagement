import { Module } from '@nestjs/common';
import { MovieShowTimeService } from './movie-show-time.service';
import { MovieShowTimeController } from './movie-show-time.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieShowTime } from './entities/movie-show-time.entity';
import { LoggerService } from 'src/logger/logger.service';
import { DateTimeService } from 'src/services/DateTime.service';

@Module({
  imports: [TypeOrmModule.forFeature([MovieShowTime])],
  controllers: [MovieShowTimeController],
  providers: [MovieShowTimeService, LoggerService, DateTimeService],
})
export class MovieShowTimeModule {}
