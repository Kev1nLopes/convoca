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

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env'}),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '91928830',
      database: 'convoca',
      synchronize: true,
      autoLoadEntities: true,
    }), 
    UsuariosModule, TimesModule

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
