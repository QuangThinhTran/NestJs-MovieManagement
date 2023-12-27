import { Module } from '@nestjs/common';
import { MailerModule, MailerService } from '@nestjs-modules/mailer';
import { MailService } from './mail.service';
import * as dotenv from 'dotenv';
import { LoggerService } from 'src/logger/logger.service';
dotenv.config();

@Module({
  imports: [MailerModule.forRoot({
  
  transport: {
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD
      }
    }
  })],
  providers: [MailService, LoggerService],
})
export class MailModule { }