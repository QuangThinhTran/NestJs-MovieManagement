import { Module } from '@nestjs/common';
import { ListTypeService } from './list-type.service';
import { ListTypeController } from './list-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListType } from './entities/list-type.entity';
import { LoggerService } from 'src/logger/logger.service';
@Module({
  imports: [TypeOrmModule.forFeature([ListType])],
  controllers: [ListTypeController],
  providers: [ListTypeService, LoggerService],
})
export class ListTypeModule {}
