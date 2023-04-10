import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { PrismaService } from './modules/prisma/prisma.service';

@Controller()
@ApiBearerAuth()
export class AppController {
  constructor(private prisma: PrismaService) {}

  @Get('ping')
  ping(): string {
    return 'pong';
  }
}
