import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ContactDto } from './dto/contact.dto';
import * as nodeMailer from 'nodemailer';

@Injectable()
export class ContactService {
  constructor(private prisma: PrismaService) {}

  async sendMail(contactDto: ContactDto): Promise<void> {
    const transporter = nodeMailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_TLS === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    contactDto.message = contactDto.message
      .replace(/&#x27;/g, "'")
      .replace(/&quot;/g, '"');

    const mailOptions = {
      from: 'marieservanebellet.site@gmail.com',
      to: process.env.MAIL_TO,
      bcc: process.env.MAIL_BCC,
      subject:
        'Nouveau mail reçu de ' +
        contactDto.name +
        ', <' +
        contactDto.mail +
        '>',
      text: contactDto.message,
    };

    if (!(await transporter.sendMail(mailOptions))) {
      throw new HttpException('Mail not sent', 500);
    }
  }
}
