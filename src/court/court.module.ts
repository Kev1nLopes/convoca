import { Module } from '@nestjs/common';
import { CourtService } from './court.service';
import { CourtController } from './court.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtAuthGuard } from 'src/guard/jwt.guard';
import { UserService } from 'src/user/user.service';

@Module({
  controllers: [CourtController],
  providers: [CourtService, JwtAuthGuard, PrismaService, UserService],
})
export class CourtModule {}
