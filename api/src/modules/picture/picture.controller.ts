import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PictureService } from './picture.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PictureDto } from './dto/picture.dto';
import { AuthGuard } from '../auth/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as fs from 'fs';
import * as sharp from 'sharp';

@Controller('picture')
@ApiBearerAuth()
@ApiTags('picture')
export class PictureController {
  constructor(private readonly pictureService: PictureService) {}

  @Get()
  async getAll(): Promise<PictureDto[]> {
    return await this.pictureService.getAll();
  }

  @Get('/category/:id')
  async getForCategory(@Param('id') id: string): Promise<PictureDto[]> {
    return await this.pictureService.getForCategory(+id);
  }

  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() picture: PictureDto): Promise<void> {
    await this.pictureService.create(picture);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  async update(
    @Param('id') id: string,
    @Body() picture: PictureDto,
  ): Promise<void> {
    await this.pictureService.update(+id, picture);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async remove(@Param('id') id: string): Promise<void> {
    await this.pictureService.remove(+id);
  }

  @Post('upload')
  @UseGuards(AuthGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: '/pictures/',
        filename: async (req, file, cb) => {
          cb(null, file.originalname);
        },
      }),
    }),
  )
  async uploadFile(
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    const path = '/pictures/';

    await sharp(`${path}${file.originalname}`)
      .resize(1000, null)
      .webp({ quality: 40 })
      .rotate()
      .toFile(`${path}${file.originalname.split('.').slice(0, -1)}.webp`);

    fs.unlinkSync(`${path}${file.originalname}`);
  }
}
