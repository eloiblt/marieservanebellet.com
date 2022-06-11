import { Controller, Get } from '@nestjs/common';
import { UsersService } from '../pictures/pictures.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAll(): string {
    return 'all users';
  }
}
