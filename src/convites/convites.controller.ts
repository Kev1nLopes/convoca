import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { ConvitesService } from './convites.service';
import { plainToClass, plainToInstance } from 'class-transformer';
import { CreateConviteDto } from './commands/create-convite/create-convite.dto';
import { CreateConviteCommand } from './commands/create-convite/create-convite.command';
import { Util } from 'utils/util';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { JWTUtil } from 'utils/jwt-util';
import { GetUsuarioConvitesQuery } from './queryes/get-usuario-convites/get-usuario-convites.query';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('convites')
@ApiBearerAuth()
@ApiTags('Convites')
export class ConvitesController {
  constructor(
    private readonly util: Util,
    private readonly jwtUtil: JWTUtil,
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  @Post()
  create(@Body() createConviteDto: CreateConviteDto, @Req() req) {
    const token = this.jwtUtil.getDadosToken(req)
    const schema = this.util.getSchema(req)
    let command = plainToInstance(CreateConviteCommand, {...createConviteDto, schema: schema, creator_id: token.id}) 
    return this.commandBus.execute(command)

  }

  @Get('usuario')
  findAll(@Req() req) {
    const schema = this.util.getSchema(req)
    const token = this.jwtUtil.getDadosToken(req)
    let query = plainToClass(GetUsuarioConvitesQuery, {id: token.id, schema: schema})
    return this.queryBus.execute(query)
    
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    // return this.convitesService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateConviteDto: UpdateConviteDto) {
  //   return this.convitesService.update(+id, updateConviteDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    // return this.convitesService.remove(+id);
  }
}
