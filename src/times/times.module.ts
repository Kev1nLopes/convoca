import { Module } from '@nestjs/common';
import { TimesService } from './times.service';
import { TimesController } from './times.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Time } from './entities/time.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { AtletaTime } from 'src/atleta_time/entities/atleta_time.entity';
import { Esporte } from 'src/esportes/entities/esporte.entity';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { AtletaTimeService } from 'src/atleta_time/atleta_time.service';
import { HistoricoAtletaTime } from 'src/hist_atleta_time/entities/hist_atleta_time.entity';
import { JWTUtil } from 'utils/jwt-util';

@Module({
  imports: [TypeOrmModule.forFeature([Time, Usuario, AtletaTime, Esporte, HistoricoAtletaTime])],
  controllers: [TimesController],
  providers: [TimesService, UsuariosService, AtletaTimeService, JWTUtil],
})
export class TimesModule {}
