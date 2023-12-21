import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from './entities/ticket.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TicketService {
    constructor(
        @InjectRepository(Ticket)
        private readonly ticketService: Repository<Ticket>
    ){}

    async booking(data: Ticket): Promise<Ticket> {
        return this.ticketService.save(data)
    }

    async getTicket(id: number): Promise<Ticket>
    {
        return this.ticketService.findOne({
            where: {
                user_id: id
            },
            relations: ['movie_showtime_id', 'user_id']
        })
    }
}
