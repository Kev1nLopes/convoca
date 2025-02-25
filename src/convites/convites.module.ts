import { Module } from '@nestjs/common';
import { ConvitesService } from './convites.service';
import { ConvitesController } from './convites.controller';

@Module({
  controllers: [ConvitesController],
  providers: [ConvitesService],
})
export class ConvitesModule {}
