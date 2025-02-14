import { Module } from '@nestjs/common';
import { DesafiosService } from './desafios.service';
import { DesafiosController } from './desafios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Desafio } from '../../database/core/desafio.entity';
import { Time } from 'src/database/core/time.entity';
import { PartidasService } from 'src/resources/partidas/partidas.service';
import { Partida } from 'src/database/core/partida.entity';
import { JWTUtil } from 'utils/jwt-util';

@Module({
  imports: [TypeOrmModule.forFeature([Time, Desafio, Partida])],
  controllers: [DesafiosController],
  providers: [DesafiosService, PartidasService, JWTUtil],
})
export class DesafiosModule {}
