import { Controller } from '@nestjs/common';
import { PictureService } from './picture.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('picture')
@ApiTags('picture')
export class PictureController {
  constructor(private readonly pictureService: PictureService) {}
}
