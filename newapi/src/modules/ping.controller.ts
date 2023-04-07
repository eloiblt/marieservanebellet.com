import { Get } from '@nestjs/common';

export class PingController {
  @Get('ping')
  ping(): string {
    return 'pong';
  }
}
