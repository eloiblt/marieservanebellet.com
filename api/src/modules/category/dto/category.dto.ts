import { ApiProperty } from '@nestjs/swagger';

export class CategoryDto {
  @ApiProperty()
  id?: number;

  @ApiProperty()
  title?: string;

  @ApiProperty()
  coverUrl?: string;
}
