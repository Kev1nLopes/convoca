import { Module } from '@nestjs/common';
import { SportCenterService } from './sport_center.service';
import { SportCenterController } from './sport_center.controller';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/user/user.service';
import { JwtAuthGuard } from 'src/guard/jwt.guard';

@Module({
  controllers: [SportCenterController],
  providers: [SportCenterService, PrismaService, UserService, JwtAuthGuard],
})
export class SportCenterModule {}
