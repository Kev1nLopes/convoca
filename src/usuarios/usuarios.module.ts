import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Time } from 'src/times/entities/time.entity';
import { HistoricoAtletaTime } from 'src/hist_atleta_time/entities/hist_atleta_time.entity';
import { JWTUtil } from 'utils/jwt-util';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario, Time, HistoricoAtletaTime])],
  controllers: [UsuariosController],
  providers: [UsuariosService, JWTUtil],
})
export class UsuariosModule {}
