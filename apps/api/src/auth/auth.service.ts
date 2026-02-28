import {Injectable, UnauthorizedException} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import {PrismaService} from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService
  ) {}

  private async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({where: {email}});
    if (!user) return null;
    const match = await bcrypt.compare(password, user.password);
    if (!match) return null;
    return {id: user.id, email: user.email};
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = {sub: user.id, email: user.email};
    const accessToken = this.jwt.sign(payload);
    return {accessToken, user};
  }
}

