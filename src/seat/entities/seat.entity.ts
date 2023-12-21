import { ApiProperty } from "@nestjs/swagger";
import { Constant, Messages } from "src/constant/Constant";
import { MovieShowTime } from "src/movie-show-time/entities/movie-show-time.entity";
import { MovieTheater } from "src/movie-theater/entities/movie-theater.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('seat')
export class Seat {
    @ApiProperty()
    @PrimaryGeneratedColumn({ name: 'id'})
    id: number

    @ApiProperty()
    @Column()
    name: string

    @ApiProperty()
    @Column()
    type: number | Constant

    @ApiProperty()
    @Column()
    status: boolean 

    @ApiProperty()
    @ManyToOne(() => MovieShowTime)
    @JoinColumn({name : 'movie_showtime_id'})
    @Column({nullable : true})
    movie_showtime_id: number | MovieShowTime[]

    @ApiProperty()
    @ManyToOne(() => MovieTheater)
    @JoinColumn({name: 'movie_theater_id'})
    @Column()
    movie_theater_id: number | MovieTheater[]

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;
  
    @UpdateDateColumn({ type: 'timestamp' })
    update_at: Date;
  
    @DeleteDateColumn({ type: 'timestamp' })
    deleted_at: Date;
}
