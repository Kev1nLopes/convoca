import { Module } from '@nestjs/common';
import { PartidasService } from './partidas.service';
import { PartidasController } from './partidas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Partida } from '../../database/core/partida.entity';
import { Time } from 'src/database/core/time.entity';
import { Desafio } from 'src/database/core/desafio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Partida, Time, Desafio])],
  controllers: [PartidasController],
  providers: [PartidasService],
})
export class PartidasModule {}
