import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CourtModule } from './court/court.module';
import { UserService } from './user/user.service';
import { SportCenterModule } from './sport_center/sport_center.module';
import { BookingsModule } from './bookings/bookings.module';
import { ScheduleModule } from '@nestjs/schedule';
import { BookingCron } from './tasks/Booking.cron';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    UserModule,
    AuthModule,
    CourtModule,
    SportCenterModule,
    BookingsModule,
  ],
  controllers: [],
  providers: [BookingCron, PrismaService],
})
export class AppModule {}
