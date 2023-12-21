import { ApiProperty } from '@nestjs/swagger';
import { Cinema } from 'src/cinema/entities/cinema.entity';
import { MovieTheater } from 'src/movie-theater/entities/movie-theater.entity';
import { Movie } from 'src/movie/entities/movie.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('movie_show_time')
export class MovieShowTime {
  @ApiProperty()
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @ApiProperty()
  @Column()
  start_time: string;

  @ApiProperty()
  @Column()
  end_time: string;

  @ApiProperty()
  @Column({ type: 'double' })
  price: number;

  @ApiProperty()
  @ManyToOne(() => MovieTheater)
  @JoinColumn({ name: 'movie_theater_id'})
  movie_theater_id: number | MovieTheater[]

  @ApiProperty()
  @ManyToOne(() => Movie)
  @JoinColumn({ name: 'movie_id' })
  @Column()
  movie_id: number | Movie[];

  @ApiProperty()
  @ManyToOne(() => Cinema)
  @JoinColumn({ name: 'cinema_id' })
  @Column()
  cinema_id: number | Cinema[];

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  update_at: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deleted_at: Date;
}
