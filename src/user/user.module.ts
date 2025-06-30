import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtAuthGuard } from 'src/guard/jwt.guard';

@Module({
  controllers: [UserController],
  providers: [UserController, JwtAuthGuard, UserService, PrismaService],
  exports: [UserService],
})
export class UserModule {}
