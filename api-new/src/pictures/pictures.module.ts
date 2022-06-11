import { Module } from '@nestjs/common';
import { PicturesService } from '../users/users.service';
import { PicturesController } from './pictures.controller';

@Module({
  imports: [],
  controllers: [PicturesController],
  providers: [PicturesService],
})
export class PicturesModule {}
