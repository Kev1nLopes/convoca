import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Time } from 'src/times/entities/time.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario, Time])],
  controllers: [UsuariosController],
  providers: [UsuariosService],
})
export class UsuariosModule {}
