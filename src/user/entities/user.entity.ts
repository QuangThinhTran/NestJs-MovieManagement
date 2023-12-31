import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { Role } from 'src/role/entities/role.entity';

@Entity('user')
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ unique: true })
  username: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  @Column({ unique: true })
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  @Column()
  password: string;

  @ApiProperty()
  @ManyToOne(() => Role)
  @JoinColumn({ name: 'role_id' })
  @Column()
  role_id: Role;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  update_at: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deleted_at: Date;
}
