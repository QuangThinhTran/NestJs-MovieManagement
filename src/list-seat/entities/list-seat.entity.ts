import { ApiProperty } from "@nestjs/swagger";
import { Seat } from "src/seat/entities/seat.entity";
import { Ticket } from "src/ticket/entities/ticket.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('list-seat')
export class ListSeat{
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id : number

    @ApiProperty()
    @ManyToOne(() => Seat)
    @JoinColumn({ name: 'seat_id'})
    @Column()
    seat_id: number | Seat

    @ApiProperty()
    @ManyToOne(() => Ticket)
    @JoinColumn({ name: 'ticket_id'})
    @Column()
    ticket_id: number | Ticket

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date
}