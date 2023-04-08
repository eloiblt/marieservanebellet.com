import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CategoryDto } from './dto/category.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('category')
@ApiBearerAuth()
@ApiTags('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getAll(): Promise<CategoryDto[]> {
    return await this.categoryService.getAll();
  }

  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() category: CategoryDto): Promise<void> {
    await this.categoryService.create(category);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  async update(
    @Param('id') id: string,
    @Body() category: CategoryDto,
  ): Promise<void> {
    await this.categoryService.update(+id, category);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async remove(@Param('id') id: string): Promise<void> {
    await this.categoryService.remove(+id);
  }
}
