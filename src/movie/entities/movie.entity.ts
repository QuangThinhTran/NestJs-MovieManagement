import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('movie')
export class Movie {
    @PrimaryGeneratedColumn({name: 'id'})
    id: number;

    @ApiProperty()
    @IsNotEmpty()
    @Column()
    movie_name: string

    @ApiProperty()
    @IsNotEmpty()
    @Column({ type: 'text'})
    description: string

    @ApiProperty()
    @Column()
    banner: string

    @ApiProperty()
    @Column()
    trailer: string

    @ApiProperty()
    @Column()
    status: number

    @CreateDateColumn({ type: 'timestamp'})
    created_at: Date
    
    @UpdateDateColumn({ type: 'timestamp'})
    updated_at: Date

    @DeleteDateColumn({ type: 'timestamp'})
    deleted_at: Date
}
