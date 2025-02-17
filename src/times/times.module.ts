import { Module } from '@nestjs/common';
import { TimesService } from './times.service';
import { TimesController } from './times.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from 'src/database/core/usuario.entity';
import { AtletaTime } from 'src/database/core/atleta_time.entity';
import { Esporte } from 'src/database/core/esporte.entity';
// import { UsuariosService } from 'src/usuarios/usuarios.service';
import { AtletaTimeService } from 'src/resources/atleta_time/atleta_time.service';
import { HistoricoAtletaTime } from 'src/database/core/hist_atleta_time.entity';
import { JWTUtil } from 'utils/jwt-util';
import { Time } from 'src/database/core/time.entity';
import { timeCommandHandlers } from './commands';
import { timeQueryHandlers } from './queries';

@Module({
  imports: [TypeOrmModule.forFeature([Time, Usuario, AtletaTime, Esporte, HistoricoAtletaTime])],
  controllers: [TimesController],
  providers: [JWTUtil, ...timeCommandHandlers, ...timeQueryHandlers ],
})
export class TimesModule {}
