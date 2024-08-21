import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AtletaTime } from 'src/atleta_time/entities/atleta_time.entity';
import { TimesService } from 'src/times/times.service';
import { Time } from 'src/times/entities/time.entity';
import { Esporte } from './entities/esporte.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Esporte])],
  providers: [ ]
})
export class EsporteModule {}
