import { ApiProperty } from '@nestjs/swagger';
import { Movie } from 'src/movie/entities/movie.entity';
import { Type } from 'src/type/entities/type.entity';
import {
    Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('list_type')
export class ListType {
  @ApiProperty()
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @ApiProperty()
  @ManyToOne(() => Type)
  @JoinColumn({ name: 'type_id' })
  @Column()
  type_id: Type | number; 

  @ApiProperty()
  @ManyToOne(() => Movie)
  @JoinColumn({ name: 'movie_id' })
  @Column()
  movie_id: Movie | number;

  
  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  update_at: Date;
}
