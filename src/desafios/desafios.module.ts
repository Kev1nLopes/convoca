import { Module } from '@nestjs/common';
import { DesafiosService } from './desafios.service';
import { DesafiosController } from './desafios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Desafio } from './entities/desafio.entity';
import { Time } from 'src/times/entities/time.entity';
import { PartidasService } from 'src/partidas/partidas.service';
import { Partida } from 'src/partidas/entities/partida.entity';
import { JWTUtil } from 'utils/jwt-util';

@Module({
  imports: [TypeOrmModule.forFeature([Time, Desafio, Partida])],
  controllers: [DesafiosController],
  providers: [DesafiosService, PartidasService, JWTUtil],
})
export class DesafiosModule {}
