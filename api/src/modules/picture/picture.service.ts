import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PictureDto } from './dto/picture.dto';
import * as fs from 'fs';

@Injectable()
export class PictureService {
  constructor(private prisma: PrismaService) {}

  async getAll(): Promise<PictureDto[]> {
    return this.prisma.picture.findMany();
  }

  async getForCategory(id: number): Promise<PictureDto[]> {
    return this.prisma.picture.findMany({
      where: { categoryId: id },
      orderBy: [
        {
          gridRow: 'asc',
        },
        {
          gridColumn: 'asc',
        },
      ],
      select: {
        id: true,
        title: true,
        url: true,
        technique: true,
        year: true,
        size: true,
        gridRow: true,
        gridColumn: true,
      },
    });
  }

  async create(pictureDto: PictureDto): Promise<void> {
    await this.prisma.picture.create({
      data: {
        year: pictureDto.year ? Number(pictureDto.year) : 0,
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
    const picture = await this.prisma.picture.findUnique({ where: { id } });

    if (fs.existsSync(`/pictures/${picture.url}`)) {
      fs.rmSync(`/pictures/${picture.url}`);
    }

    await this.prisma.picture.delete({ where: { id } });
  }
}
