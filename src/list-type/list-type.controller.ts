import {
  Controller,
  Body,
  Param,
  Put,
  HttpException,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { ListTypeService } from './list-type.service';
import { ApiTags } from '@nestjs/swagger';
import { LoggerService } from 'src/logger/logger.service';
import { Response } from 'express';

@ApiTags('List-type')
@Controller('list-type')
export class ListTypeController {
  constructor(
    private readonly listTypeService: ListTypeService,
    private readonly logger: LoggerService,
  ) {
    this.logger.setContext('listTypeService');
  }

  // @Post('/create')
  // async create(@Body() listType: ListType,@Res() res: Response): Promise<void> {
  //   try {
  //     const typeIds: number[] = [listType.type_id];

  //     typeIds.forEach((typeId: number) => {
  //         // Perform actions for each typeId
  //         console.log(typeId); // For example, logging the value
  //         // Your logic here...
  //     });
  //     // const data = await this.listTypeService.create(listType)
  //     // res.status(HttpStatus.OK).send({
  //     //   data: data,
  //     //   status: HttpStatus.OK
  //     // })
  //   } catch (e) {
  //     this.logger.error(e);
  //     throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
  //   }
  // }

  @Put('/update/:id')
  async update(
    @Param('id') id: number,
    @Body() data,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const newData = await this.listTypeService.update(id, data);

      res.status(HttpStatus.OK).send({
        data: newData,
        status: HttpStatus.OK,
      });
    } catch (e) {
      this.logger.error(e);
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
