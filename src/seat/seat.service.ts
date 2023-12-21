import { Injectable } from '@nestjs/common';
import { Seat } from './entities/seat.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SeatService {
  constructor(
    @InjectRepository(Seat)
    private readonly seatRepository: Repository<Seat>
  ){}
  async create(data: Seat) : Promise<Seat> {
    return this.seatRepository.save(data);
  }

  async getListSeatByTheater(id: number) : Promise<Seat[]> {
    return this.seatRepository.find({
      where: {
        movie_theater_id: id
      }
    });
  }

  async update(id: number, data: Seat): Promise<Seat> {
    console.log(data)
    await this.seatRepository.update(id,data)
    return this.seatRepository.findOne({where: {id}});
  }

  async remove(id: number): Promise<void> {
    await this.seatRepository.softDelete(id)
  }

  seatDetail(data: any) {
    return this.seatRepository.findOne({
      select: [ "name", "type"],
      where: {
        id: data.id
      }
    })
  }
}
