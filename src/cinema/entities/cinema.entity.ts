import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity('cinema')
export class Cinema {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  @Unique(['name'])
  @Column()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @Unique(['address'])
  @Column()
  address: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  update_at: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deleted_at: Date;
}
