import { MailerService } from "@nestjs-modules/mailer";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import * as fs from 'fs';
import * as path from 'path';
import * as ejs from 'ejs';
import { LoggerService } from "src/logger/logger.service";
import { Ticket } from "src/ticket/entities/ticket.entity";
import { MovieShowTime } from "src/movie-show-time/entities/movie-show-time.entity";
import { User } from "src/user/entities/user.entity";

interface IMailBookingTicket {
    total: number;
    user: number | User;
    movie_showtime: number | MovieShowTime[];
    seat: any[];
}
@Injectable()
export class MailService {
    constructor(
        private readonly mailService: MailerService,
        private readonly logger: LoggerService,
    ){}

    async mailRegister(mail: string, username: string): Promise<void> {
        try {
            const templatePath = path.join(__dirname, '..','..' ,'src/views', 'register.ejs');
            const templateContent = fs.readFileSync(templatePath, 'utf-8');

            this.mailService.sendMail({
                to: mail, 
                from: process.env.MAIL_FROM_ADDRESS || 'noreply@nestjs.com',
                subject: 'Register Success',
                html: ejs.render(templateContent, { name: username }),
            })
        } catch (e) {
            this.logger.error(e.message);
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    async mailBookingTicket(mail: string, data: Ticket): Promise<void> {
        try {
            const templatePath = path.join(__dirname, '..','..' ,'src/views', 'bookingTicket.ejs');
            const templateContent = fs.readFileSync(templatePath, 'utf-8');

            this.mailService.sendMail({
                to: mail, 
                from: process.env.MAIL_FROM_ADDRESS || 'noreply@nestjs.com',
                subject: 'Booking ticket Success',
                html: ejs.render(templateContent, { data: data }),
            })
        } catch (e) {
            this.logger.error(e.message);
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}