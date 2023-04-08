import { ApiProperty } from '@nestjs/swagger';

export class ContactDto {
  @ApiProperty({ required: true })
  name?: string;

  @ApiProperty({ required: true })
  mail?: string;

  @ApiProperty({ required: true })
  message?: string;
}
