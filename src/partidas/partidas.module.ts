import { Module } from '@nestjs/common';
import { PartidasService } from './partidas.service';
import { PartidasController } from './partidas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Partida } from './entities/partida.entity';
import { Time } from 'src/times/entities/time.entity';
import { Desafio } from 'src/desafios/entities/desafio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Partida, Time, Desafio])],
  controllers: [PartidasController],
  providers: [PartidasService],
})
export class PartidasModule {}
