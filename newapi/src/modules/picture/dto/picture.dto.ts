import { ApiProperty } from '@nestjs/swagger';

export class PictureDto {
  @ApiProperty()
  id?: number;

  @ApiProperty()
  year?: number;

  @ApiProperty()
  gridColumn?: string;

  @ApiProperty()
  gridRow?: string;

  @ApiProperty()
  size?: string;

  @ApiProperty()
  isMenu?: boolean;

  @ApiProperty()
  technique?: string;

  @ApiProperty()
  title?: string;

  @ApiProperty()
  url?: string;

  @ApiProperty()
  createdAt?: Date;

  @ApiProperty()
  updatedAt?: Date;

  @ApiProperty()
  categoryId?: number;
}
