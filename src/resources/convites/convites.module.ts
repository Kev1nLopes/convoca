import { Module } from '@nestjs/common';
import { ConvitesService } from './convites.service';
import { ConvitesController } from './convites.controller';
import { AtletaTimeService } from 'src/resources/atleta_time/atleta_time.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Convite } from '../../database/core/convite.entity';
import { AtletaTime } from 'src/database/core/atleta_time.entity';
import { Usuario } from 'src/database/core/usuario.entity';
// import { UsuariosService } from 'src/usuarios/usuarios.service';
import { Time } from 'src/database/core/time.entity';
import { JWTUtil } from 'utils/jwt-util';

@Module({
  imports: [TypeOrmModule.forFeature([Convite, AtletaTime, Time, Usuario])],
  controllers: [ConvitesController],
  providers: [ConvitesService, AtletaTimeService, JWTUtil],
})
export class ConvitesModule {}
