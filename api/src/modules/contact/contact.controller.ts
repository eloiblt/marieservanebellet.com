import { Body, Controller, Post } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ContactDto } from './dto/contact.dto';

@Controller('contact')
@ApiBearerAuth()
@ApiTags('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  async create(@Body() contactDto: ContactDto): Promise<void> {
    await this.contactService.sendMail(contactDto);
  }
}
