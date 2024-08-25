import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [AuthModule,PrismaModule, UserModule],
  controllers: [UserController],
  providers: [UserService,JwtService],
})
export class AppModule {}
