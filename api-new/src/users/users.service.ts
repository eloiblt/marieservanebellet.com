import { Injectable } from '@nestjs/common';

@Injectable()
export class PicturesService {
  getHello(): string {
    return 'Hello World!';
  }
}
