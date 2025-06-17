import { HttpException, Injectable } from '@nestjs/common';
import { ContactDto } from './dto/contact.dto';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class ContactService {
  constructor(private readonly mailService: MailerService) {}

  async sendMail(contactDto: ContactDto): Promise<void> {
    contactDto.message = contactDto.message
      .replace(/&#x27;/g, "'")
      .replace(/&quot;/g, '"');

    try {
      await this.mailService.sendMail({
        from: 'marieservanebellet.site@gmail.com',
        to: process.env.MAIL_TO,
        bcc: process.env.MAIL_BCC,
        subject: `Nouveau mail reçu de ${contactDto.name}, <${contactDto.mail}>`,
        text: contactDto.message,
      });
    } catch (err) {
      throw new HttpException('Mail not sent', 500);
    }
  }
}
