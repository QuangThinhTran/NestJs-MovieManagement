import { Module } from '@nestjs/common';
import { MovieTheaterService } from './movie-theater.service';
import { MovieTheaterController } from './movie-theater.controller';
import { MovieTheater } from './entities/movie-theater.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerService } from 'src/logger/logger.service';

@Module({
  imports: [TypeOrmModule.forFeature([MovieTheater])],
  controllers: [MovieTheaterController],
  providers: [MovieTheaterService, LoggerService],
})
export class MovieTheaterModule {}
