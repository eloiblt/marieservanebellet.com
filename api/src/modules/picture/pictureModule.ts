import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { PictureController } from './picture.controller';
import { PictureService } from './picture.service';

@Module({
  imports: [PrismaModule],
  controllers: [PictureController],
  providers: [PictureService],
})
export class PictureModule {}
