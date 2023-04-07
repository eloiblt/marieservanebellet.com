import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CategoryDto } from './dto/category.dto';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async getAll(): Promise<CategoryDto[]> {
    return await this.prisma.category.findMany();
  }

  async create(categoryDto: CategoryDto): Promise<void> {
    await this.prisma.category.create({ data: { title: categoryDto.title } });
  }

  async update(id: number, categoryDto: CategoryDto): Promise<void> {
    delete categoryDto.id;
    await this.prisma.category.update({ where: { id }, data: categoryDto });
  }

  async remove(id: number): Promise<void> {
    await this.prisma.category.delete({ where: { id } });
  }
}
