import { Module } from '@nestjs/common';
import { HistAtletaTimeService } from './hist_atleta_time.service';
import { HistAtletaTimeController } from './hist_atleta_time.controller';

@Module({
  controllers: [HistAtletaTimeController],
  providers: [HistAtletaTimeService],
})
export class HistAtletaTimeModule {}
