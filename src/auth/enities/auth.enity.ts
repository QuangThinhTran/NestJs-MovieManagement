import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Column, Entity } from 'typeorm';

@Entity('user')
export class Auth {
  @ApiProperty()
  @IsNotEmpty()
  @Column()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @Column()
  password: string;
}
