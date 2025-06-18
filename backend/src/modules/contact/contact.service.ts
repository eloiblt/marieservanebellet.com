import { HttpException, Injectable, Logger } from '@nestjs/common';
import { ContactDto } from './dto/contact.dto';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class ContactService {
  private readonly logger = new Logger(ContactService.name);

  constructor(private readonly mailService: MailerService) {}

  async sendMail(contactDto: ContactDto): Promise<void> {
    contactDto.message = contactDto.message
      ?.replace(/&#x27;/g, "'")
      ?.replace(/&quot;/g, '"');

    contactDto.message = `Nouveau message ${contactDto.name} (${contactDto.mail})\n\n${contactDto.message}`;

    try {
      await this.mailService.sendMail({
        from: 'marieservanebellet.site@gmail.com',
        to: process.env.MAIL_TO,
        bcc: process.env.MAIL_BCC,
        subject: `Mail de marieservanebellet.com (page contact)`,
        text: contactDto.message,
      });
    } catch (err) {
      this.logger.error('Mail not sent', err);
      throw new HttpException('Mail not sent', 500);
    }
  }
}
