import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { ApiTags } from '@nestjs/swagger';
import { CategoryDto } from './dto/category.dto';

@Controller('category')
@ApiTags('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getAll(): Promise<CategoryDto[]> {
    return await this.categoryService.getAll();
  }

  @Post()
  async create(@Body() category: CategoryDto): Promise<void> {
    await this.categoryService.create(category);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() category: CategoryDto,
  ): Promise<void> {
    await this.categoryService.update(+id, category);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.categoryService.remove(+id);
  }
}
