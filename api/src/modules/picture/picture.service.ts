import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PictureDto } from './dto/picture.dto';
import * as fs from 'fs';

@Injectable()
export class PictureService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(): Promise<PictureDto[]> {
    const pictures = await this.prisma.picture.findMany();
    return pictures.map((p) => ({ ...p }) as PictureDto);
  }

  async getForCategory(id: number): Promise<PictureDto[]> {
    const pictures = await this.prisma.picture.findMany({
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

    return pictures.map((p) => ({ ...p }) as PictureDto);
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

    if (fs.existsSync(`/pictures/${picture?.url}`)) {
      fs.rmSync(`/pictures/${picture?.url}`);
    }

    await this.prisma.picture.delete({ where: { id } });
  }
}
