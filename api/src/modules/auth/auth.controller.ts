import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';

@Controller()
@ApiBearerAuth()
@ApiTags('user')
export class AuthController {
  constructor(private readonly userService: AuthService) {}

  @Post('login')
  async login(@Body() userDto: UserDto): Promise<string> {
    return await this.userService.login(userDto);
  }
}
