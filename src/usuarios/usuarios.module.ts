import { Module } from '@nestjs/common';
//import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from '../database/core/usuario.entity';
import { Time } from 'src/database/core/time.entity';
// import { HistoricoAtletaTime } from 'src/database/core/hist_atleta_time.entity';
import { JWTUtil } from 'utils/jwt-util';
import { QueryHandlers } from './queries';
import { CommandHandlers } from './commands';

@Module({
  imports: [ TypeOrmModule.forFeature([Usuario, Time])],
  controllers: [UsuariosController],
  providers: [JWTUtil, ...QueryHandlers, ...CommandHandlers],
})
export class UsuariosModule {}
