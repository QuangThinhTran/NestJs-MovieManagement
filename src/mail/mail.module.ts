import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import * as dotenv from 'dotenv';
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
  providers: [MailService],
})
export class MailModule { }