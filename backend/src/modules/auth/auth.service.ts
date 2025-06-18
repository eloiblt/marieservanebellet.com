import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserDto } from './dto/user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(userDto: UserDto): Promise<string> {
    const user = await this.prisma.user.findFirst({
      where: { mail: userDto.mail },
    });

    const passwordEquals = await bcrypt.compare(
      userDto.password ?? '',
      user!.password,
    );

    if (passwordEquals) {
      const payload = { mail: user!.mail };
      return await this.jwtService.signAsync(payload);
    }

    throw new UnauthorizedException();
  }
}
