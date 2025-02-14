import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosModule } from './resources/usuarios/usuarios.module';
import { TimesModule } from './resources/times/times.module';
import { Usuario } from './database/core/usuario.entity';
import { ConfigModule } from '@nestjs/config';
import { AtletaTime } from './database/core/atleta_time.entity';
import { Time } from './database/core/time.entity';
import { PartidasModule } from './resources/partidas/partidas.module';
import { DesafiosModule } from './resources/desafios/desafios.module';
import { TimesService } from './resources/times/times.service';
import { EsporteModule } from './resources/esportes/espote.module';
import { HistAtletaTimeModule } from './resources/hist_atleta_time/hist_atleta_time.module';
import { ConvitesModule } from './resources/convites/convites.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.XATA_URL, // Use environment variable for the URL
      synchronize: false,
      autoLoadEntities: false,
      entities: [__dirname + '/database/core/**/*.entity{.ts,.js}'],
      migrations: ['src/database/migrations/*-migration.ts'],
      migrationsRun: false,
      logging: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
