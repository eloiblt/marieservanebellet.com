import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PictureDto } from './dto/picture.dto';

@Injectable()
export class PictureService {
  constructor(private prisma: PrismaService) {}

  async getMenu(): Promise<PictureDto[]> {
    return await this.prisma.picture.findMany({
      where: { isMenu: true },
      select: { id: true, url: true },
    });
  }

  async getForCategory(id: number): Promise<PictureDto[]> {
    return await this.prisma.picture.findMany({
      where: { categoryId: id },
      select: {
        id: true,
        title: true,
        url: true,
        technique: true,
        year: true,
        size: true,
      },
    });
  }

  async create(pictureDto: PictureDto): Promise<void> {
    await this.prisma.picture.create({
      data: {
        year: pictureDto.year,
        gridColumn: pictureDto.gridColumn,
        gridRow: pictureDto.gridRow,
        size: pictureDto.size,
        isMenu: pictureDto.isMenu,
        technique: pictureDto.technique,
        title: pictureDto.title,
        url: pictureDto.url,
        categoryId: pictureDto.categoryId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }

  async update(id: number, pictureDto: PictureDto): Promise<void> {
    delete pictureDto.id;
    pictureDto.updatedAt = new Date();
    await this.prisma.picture.update({ where: { id }, data: pictureDto });
  }

  async remove(id: number): Promise<void> {
    await this.prisma.picture.delete({ where: { id } });
  }
}
