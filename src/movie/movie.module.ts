import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { LoggerService } from 'src/logger/logger.service';
import { ListTypeService } from 'src/list-type/list-type.service';
import { ListType } from 'src/list-type/entities/list-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Movie, ListType])],
  controllers: [MovieController],
  providers: [MovieService, LoggerService, ListTypeService],
})
export class MovieModule {}
