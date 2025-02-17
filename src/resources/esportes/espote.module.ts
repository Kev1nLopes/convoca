import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AtletaTime } from 'src/database/core/atleta_time.entity';
import { TimesService } from 'src/times/times.service';
import { Time } from 'src/database/core/time.entity';
import { Esporte } from '../../database/core/esporte.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Esporte])],
  providers: [ ]
})
export class EsporteModule {}
