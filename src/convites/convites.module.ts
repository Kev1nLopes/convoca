import { Module } from '@nestjs/common';
import { ConvitesService } from './convites.service';
import { ConvitesController } from './convites.controller';
import { AtletaTimeService } from 'src/atleta_time/atleta_time.service';

@Module({
  controllers: [ConvitesController],
  providers: [ConvitesService, AtletaTimeService],
})
export class ConvitesModule {}
