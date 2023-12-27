import { MailerService } from "@nestjs-modules/mailer";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import * as fs from 'fs';
import * as path from 'path';
import * as ejs from 'ejs';
import { LoggerService } from "src/logger/logger.service";

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
}