import {
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { AuthDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtServie: JwtService,
  ) {}

  async login(dto: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!user || !(await bcrypt.compare(dto.password, user.password)))
      throw new ForbiddenException('Invalid Credentials error');
    const access_token = await this.signToken(
      user.id,
      user.email,
      process.env.SECRET_KEY,
      '1h',
    );
    const refresh_token = await this.signToken(
      user.id,
      user.email,
      process.env.REFRESH_KEY,
      '7d',
    );
    return { user, access_token, refresh_token };
  }

  async register(dto: RegisterDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (user) throw new ConflictException('Email already exists');

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const newUser = await this.prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        password: hashedPassword,
      },
    });
    const access_token = await this.signToken(
      newUser.id,
      newUser.email,
      process.env.SECRET_KEY,
      '1h',
    );
    const refresh_token = await this.signToken(
      newUser.id,
      newUser.email,
      process.env.REFRESH_KEY,
      '7d',
    );

    return {
      access_token,
      refresh_token
    }
  }

  // refresh token
  async refreshToken(user: any) {
    const access_token = await this.signToken(
      user.id,
      user.email,
      process.env.SECRET_KEY,
      '1h',
    );
    const refresh_token = await this.signToken(
      user.id,
      user.email,
      process.env.REFRESH_KEY,
      '7d',
    );

    return { access_token, refresh_token };
  }

  // generate token
  async signToken(
    userId: number,
    email: string,
    key: string,
    expiresTime: string,
  ) {
    const payload = {
      sub: userId,
      email,
    };
    const token = await this.jwtServie.signAsync(payload, {
      secret: key,
      expiresIn: expiresTime,
    });
    return token;
  }
}
