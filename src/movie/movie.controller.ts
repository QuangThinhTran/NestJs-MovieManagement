import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  Res,
  Put,
  UseInterceptors,
  UploadedFiles,
  Query,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { Movie } from './entities/movie.entity';
import { LoggerService } from 'src/logger/logger.service';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Constant, Messages } from 'src/constant/Constant';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { multerOption } from 'src/services/Multer.service';
import { ListTypeService } from './../list-type/list-type.service';
import { DataSource } from 'typeorm';

interface IFile {
  banner: Express.Multer.File | null | undefined;
  trailer?: Express.Multer.File | null | undefined;
}

@ApiTags('Movie')
@Controller('movie')
export class MovieController {
  constructor(
    private readonly movieService: MovieService,
    private readonly listTypeRepository: ListTypeService,
    private readonly logger: LoggerService,
    private dataSource: DataSource,
  ) {
    this.logger.setContext('MovieService');
  }

  @Post('/create')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'banner', maxCount: 1 },
        { name: 'trailer', maxCount: 1 },
      ],
      multerOption,
    ),
  )
  async create(
    @Body() movie: Movie,
    @UploadedFiles()
    files: IFile ,
    @Res() res: Response,
  ): Promise<void> {
    try {      
      const data = await this.movieService.create(movie, files);

      await this.listTypeRepository.create({
        movie_id: data.id,
        type_id: movie.type_id,
      });

      res.status(HttpStatus.CREATED).send({
        message: Messages.CREATE_SUCCESS,
        data: {
          ...data,
          status:
            data.status == Constant.STATUS_MOVIE_ACTIVE
              ? Messages.MOVIE_NOW_SHOWING
              : Messages.MOVIE_NOT_SHOWING,
        },
        status: HttpStatus.CREATED,
      });
    } catch (e) {
      this.logger.error(e);
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  async findAll(@Res() res: Response): Promise<void | any> {
    try {
      const data = await this.movieService.findAll();

      const listStatusMovie = this.getStatusMovie(data)
      
      const result = []
      for (const item of listStatusMovie) {
        const updateItem = await this.listTypeRepository.relationMovie(item)
        result.push({...item, type: updateItem})
      }

      res.status(HttpStatus.OK).send({
        data: result,
        status: HttpStatus.OK,
      });
    } catch (e) {
      this.logger.error(e);
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/detail/:id')
  async findOne(@Param('id') id: number, @Res() res: Response): Promise<void> {
    try {
      const data = await this.movieService.findOne(id);
      if (!data) {
        res.status(HttpStatus.NOT_FOUND).send({
          message: `#${id} ` + Messages.NOT_FOUND,
          status: HttpStatus.NOT_FOUND,
        });
        return;
      }
      
      const listType = await this.listTypeRepository.relationMovie(data)

      const result = {
        ...data,
        status:
          data.status == Constant.STATUS_MOVIE_ACTIVE
            ? Messages.MOVIE_NOW_SHOWING
            : Messages.MOVIE_NOT_SHOWING,
            type: listType
      };
      res.status(HttpStatus.OK).send({
        data: result,
        status: HttpStatus.OK,
      });
    } catch (e) {
      this.logger.error(e);
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put('/update/:id')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'banner', maxCount: 1 },
        { name: 'trailer', maxCount: 1 },
      ],
      multerOption,
    ),
  )
  async update(
    @Param('id') id: number,
    @Body() movie: Movie,
    @UploadedFiles()
    files: IFile,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const data = await this.movieService.update(id, movie, files);
      if (!data) {
        res.status(HttpStatus.NOT_FOUND).send({
          message: Messages.NOT_FOUND + ` #${id}`,
          status: HttpStatus.NOT_FOUND,
        });
      }
      res.status(HttpStatus.OK).send({
        data: {
          ...data,
          status:
            data.status == Constant.STATUS_MOVIE_ACTIVE
              ? Messages.MOVIE_NOW_SHOWING
              : Messages.MOVIE_NOT_SHOWING,
        },
        status: HttpStatus.OK,
      });
    } catch (e) {
      this.logger.error(e);
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete('/delete/:id')
  async remove(@Param('id') id: number, @Res() res: Response): Promise<void> {
    try {
      const data = await this.movieService.findOne(id);
      if (!data) {
        res.status(HttpStatus.NOT_FOUND).send({
          message: Messages.NOT_FOUND + ` #${id}`,
          status: HttpStatus.NOT_FOUND,
        });
        return;
      }
      await this.movieService.remove(id);
      res.status(200).send({
        message: Messages.DELETE_SUCCESS,
        status: HttpStatus.OK,
      });
    } catch (e) {
      this.logger.error(e);
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return;
  }

  @Post('/restore/:id')
  async restore(@Param('id') id: number, @Res() res: Response): Promise<void> {
    try {
      const data = await this.movieService.restore(id);
      if (!data) {
        res.status(HttpStatus.NOT_FOUND).send({
          message: Messages.NOT_FOUND + ` #${id}`,
          status: HttpStatus.NOT_FOUND,
        });
        return;
      }
      res.status(200).send({
        message: Messages.RESTORE_SUCCESS,
        data: {
          ...data,
          status:
            data.status == Constant.STATUS_MOVIE_ACTIVE
              ? Messages.MOVIE_NOW_SHOWING
              : Messages.MOVIE_NOT_SHOWING,
        },
        status: HttpStatus.OK,
      });
    } catch (e) {
      this.logger.error(e);
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/search')
  async search(@Query() query, @Res() res: Response): Promise<void> {
    try {
      const data = await this.movieService.search(query);

      const result = this.getStatusMovie(data)

      res.status(HttpStatus.OK).send({
        data: result,
        status: HttpStatus.OK,
      });
    } catch (e) {
      this.logger.error(e);
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  getStatusMovie(data: Movie[]){
    const result = [];
      for(const item of data){
        if (item.status === Constant.STATUS_MOVIE_ACTIVE) {
          const updatedItem = { ...item, status: Messages.MOVIE_NOW_SHOWING };
          result.push(updatedItem)
        }
        else {
          console.log(item)
          const updatedItem = { ...item, status: Messages.MOVIE_NOT_SHOWING };
          result.push(updatedItem)
        }
      }
      return result
  }
}
