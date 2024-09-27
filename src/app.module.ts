import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosModule } from './usuarios/usuarios.module';
import { TimesModule } from './times/times.module';
import { Usuario } from './usuarios/entities/usuario.entity';
import { ConfigModule } from '@nestjs/config';
import { AtletaTime } from './atleta_time/entities/atleta_time.entity';
import { Time } from './times/entities/time.entity';
import { PartidasModule } from './partidas/partidas.module';
import { DesafiosModule } from './desafios/desafios.module';
import { TimesService } from './times/times.service';
import { EsporteModule } from './esportes/espote.module';
import { HistAtletaTimeModule } from './hist_atleta_time/hist_atleta_time.module';
import { ConvitesModule } from './convites/convites.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env'}),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'hellpis',
      database: 'convoca',
      synchronize: true,
      autoLoadEntities: true,
    }), 
    UsuariosModule, TimesModule, PartidasModule, DesafiosModule, EsporteModule, HistAtletaTimeModule, ConvitesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
