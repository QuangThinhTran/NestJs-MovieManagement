import { Injectable } from '@nestjs/common';
import { ListType } from './entities/list-type.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from 'src/movie/entities/movie.entity';

@Injectable()
export class ListTypeService {
  constructor(
    @InjectRepository(ListType)
    private readonly listTypeRepository: Repository<ListType>,
  ) {}

  async create(data: ListType | any): Promise<ListType> {
    return this.listTypeRepository.save(data);
  }

  async update(id: number, data): Promise<any> {
    const listType = await this.listTypeRepository.findOne({
      where: {
        movie_id: id,
      },
    });
    await this.listTypeRepository.update(listType.id, data);
    return this.listTypeRepository.find({
      where: {
        movie_id: id,
      },
      relations: ['type_id'],
      select: ['type_id'],
    });
  }

  async relationMovie(movie: Movie): Promise<ListType[]> {
    return this.listTypeRepository.find({
      where: {
        movie_id: movie.id,
      },
      relations: ['type_id'],
      select: ['type_id'],
    });
  }

  async existTypeOneMovie(movie: Movie): Promise<ListType[]> {
    return this.listTypeRepository.find({
      where: {
        movie_id: movie.id,
        type_id: movie.type_id,
      },
    });
  }
}
