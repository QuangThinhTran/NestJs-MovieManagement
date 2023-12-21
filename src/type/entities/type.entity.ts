import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('type')
export class Type {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  @Column({ unique: true })
  name: string;

  // @ManyToMany(() => Movie, (movie) => movie.types)
  // @JoinTable({
  //   name: 'list_type',
  //   joinColumn: { name: 'type_id', referencedColumnName: 'id' },
  //   inverseJoinColumn: { name: 'movie_id' }
  // })
  // movies?: Movie[];

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deleted_at: Date;
}
