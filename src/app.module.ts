import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosModule } from './usuarios/usuarios.module';
import { TimesModule } from './times/times.module';
import { Usuario } from './database/core/usuario.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Time } from './database/core/time.entity';
import { TimesService } from './times/times.service';
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
      host: process.env.DB_HOST,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      synchronize: false,
      autoLoadEntities: true,
      entities: [__dirname + '/database/core/**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/database/migrations/{.ts,*.js}'],
      migrationsRun: true,
    }),
    UsuariosModule, TimesModule
  ],
  controllers: [ ],
  providers: [ ConfigService, JWTUtil, QueryBus, CommandBus],
})
export class AppModule { }
