import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ListSeat } from './entities/list-seat.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ListSeatService {
    constructor(
        @InjectRepository(ListSeat)
        private readonly listSeatRepository: Repository<ListSeat>
    ){}

    async addSeat(data): Promise<ListSeat> 
    {
        return this.listSeatRepository.save(data);
    }

    async getSeat(id: number): Promise<ListSeat[]>
    {
        return this.listSeatRepository.find({
            where: {
                ticket_id: id
            },
            relations: ['seat_id']
        })
    }
}
