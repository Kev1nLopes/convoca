import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosModule } from './usuarios/usuarios.module';
import { TimesModule } from './resources/times/times.module';
import { Usuario } from './database/core/usuario.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AtletaTime } from './database/core/atleta_time.entity';
import { Time } from './database/core/time.entity';
import { PartidasModule } from './resources/partidas/partidas.module';
import { DesafiosModule } from './resources/desafios/desafios.module';
import { TimesService } from './resources/times/times.service';
import { EsporteModule } from './resources/esportes/espote.module';
import { HistAtletaTimeModule } from './resources/hist_atleta_time/hist_atleta_time.module';
import { ConvitesModule } from './resources/convites/convites.module';
import { UsuariosController } from './usuarios/usuarios.controller';
import { QueryBuilder } from 'typeorm';
import { CommandBus, CqrsModule, QueryBus } from '@nestjs/cqrs';
import { JWTUtil } from 'utils/jwt-util';
import { QueryHandlers } from './usuarios/queries';

@Module({
  imports: [
    CqrsModule.forRoot(),
    ConfigModule.forRoot({ envFilePath: '.env' }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: 'postgresql://e0btlr:xau_tHhJ7lD4yBJBNL232SU7BZ0Y46oSPEuU0@us-east-1.sql.xata.sh/convoca:main?sslmode=require', // Use environment variable for the URL
      synchronize: false,
      autoLoadEntities: true,
      entities: [__dirname + '/database/core/**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/database/migrations/*-migration.ts'],
    }),
    UsuariosModule
  ],
  controllers: [ ],
  providers: [ ConfigService, JWTUtil, QueryBus, CommandBus],
})
export class AppModule { }
