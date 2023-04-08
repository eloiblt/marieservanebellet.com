import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
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

  // @Post('upload')
  // @UseGuards(AuthGuard)
  // @UseInterceptors(FileInterceptor('file'))
  // uploadFile(
  //   @UploadedFile(
  //     new ParseFilePipe({
  //       validators: [
  //         new MaxFileSizeValidator({ maxSize: 1000 }),
  //         new FileTypeValidator({ fileType: 'image/jpeg' }),
  //       ],
  //     }),
  //   )
  //   file: Express.Multer.File,
  // ) {
  //   console.log(file);
  // }
}
