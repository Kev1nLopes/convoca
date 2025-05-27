import { Module } from '@nestjs/common';
import { ConvitesService } from './convites.service';
import { ConvitesController } from './convites.controller';
import { Usuario } from 'src/database/core/usuario.entity';
import { Time } from 'src/database/core/time.entity';
import { Convite } from 'src/database/core/convite.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JWTUtil } from 'utils/jwt-util';
import { Util } from 'utils/util';
import { ConviteQueryHandlers } from './queryes';

@Module({
  imports: [TypeOrmModule.forFeature([Time, Usuario, Convite])],
  controllers: [ConvitesController],
  providers: [JWTUtil, Util, ...ConviteQueryHandlers],
})
export class ConvitesModule {}
