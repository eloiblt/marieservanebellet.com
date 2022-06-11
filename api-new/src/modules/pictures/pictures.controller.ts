import { Controller, Get } from '@nestjs/common';
import { PicturesService } from '../users/users.service';

@Controller('pictures')
export class PicturesController {
  constructor(private readonly picturesService: PicturesService) {}

  @Get()
  getAll(): string {
    return 'all pictures';
  }
}
