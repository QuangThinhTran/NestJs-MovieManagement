import { Controller, Post, Body, Patch, Param } from '@nestjs/common';
import { ListTypeService } from './list-type.service';
import { ListType } from './entities/list-type.entity';
import { ApiTags } from '@nestjs/swagger';
import { LoggerService } from 'src/logger/logger.service';

@ApiTags('List-type')
@Controller('list-type')
export class ListTypeController {
  constructor(
    private readonly listTypeService: ListTypeService,
    private readonly logger: LoggerService,
  ) {
    this.logger.setContext('listTypeService');
  }

  @Post()
  create(@Body() createListTypeDto: ListType) {
    return this.listTypeService.create(createListTypeDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateListTypeDto: ListType) {
    return this.listTypeService.update(+id, updateListTypeDto);
  }
}
