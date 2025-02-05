import { Module } from '@nestjs/common';
import { ConvitesService } from './convites.service';
import { ConvitesController } from './convites.controller';
import { AtletaTimeService } from 'src/atleta_time/atleta_time.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Convite } from './entities/convite.entity';
import { AtletaTime } from 'src/atleta_time/entities/atleta_time.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { Time } from 'src/times/entities/time.entity';
import { JWTUtil } from 'utils/jwt-util';

@Module({
  imports: [TypeOrmModule.forFeature([Convite, AtletaTime, Time, Usuario])],
  controllers: [ConvitesController],
  providers: [ConvitesService, AtletaTimeService, UsuariosService, JWTUtil],
})
export class ConvitesModule {}
