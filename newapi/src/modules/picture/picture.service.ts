import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PictureService {
  constructor(private prisma: PrismaService) {}

  async findOne(id: number) {
    return await this.prisma.picture.findUnique({ where: { id } });
  }

  remove(id: number) {
    return this.prisma.picture.delete({ where: { id } });
  }
}
