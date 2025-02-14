import { Module } from '@nestjs/common';
//import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from '../../database/core/usuario.entity';
import { Time } from 'src/database/core/time.entity';
import { HistoricoAtletaTime } from 'src/database/core/hist_atleta_time.entity';
import { JWTUtil } from 'utils/jwt-util';
import { CqrsModule } from '@nestjs/cqrs';
import { QueryHandlers } from './queries';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([Usuario, Time, HistoricoAtletaTime])],
  controllers: [UsuariosController],
  providers: [ JWTUtil, ...QueryHandlers],
})
export class UsuariosModule {}
