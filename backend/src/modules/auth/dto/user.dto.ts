import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty()
  mail?: string;

  @ApiProperty()
  password?: string;
}
