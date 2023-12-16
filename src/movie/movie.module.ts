import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { LoggerService } from 'src/logger/logger.service';

@Module({
  imports: [TypeOrmModule.forFeature([Movie])],
  controllers: [MovieController],
  providers: [MovieService, LoggerService],
})
export class MovieModule {}
