import { ApiProperty } from "@nestjs/swagger";
import { MovieShowTime } from "src/movie-show-time/entities/movie-show-time.entity";
import { Seat } from "src/seat/entities/seat.entity";
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('ticket')
export class Ticket {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty()
    @Column({ type: 'double'})
    total: number

    @ApiProperty()
    @ManyToOne(() => MovieShowTime)
    @JoinColumn({ name: 'movie_showtime_id'})
    @Column()
    movie_showtime_id: number | MovieShowTime[]

    @ApiProperty()
    @ManyToOne(() => User)
    @JoinColumn({name : 'user_id'})
    @Column()
    user_id: number | User

    seat_id: number | Seat

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date
}