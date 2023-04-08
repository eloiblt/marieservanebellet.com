import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserDto } from './dto/user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async login(userDto: UserDto): Promise<string> {
    const user = await this.prisma.user.findFirst({
      where: { mail: userDto.mail },
    });

    if (await bcrypt.compare(userDto?.password, user?.password)) {
      const payload = { mail: user.mail };
      return await this.jwtService.signAsync(payload);
    }

    throw new UnauthorizedException();
  }
}
