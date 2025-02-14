import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { PartidasService } from './partidas.service';
import { CreatePartidaDto } from './dto/create-partida.dto';
import { UpdatePartidaDto } from './dto/update-partida.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Partidas')
@Controller('partidas')
export class PartidasController {
  constructor(private readonly partidasService: PartidasService) {}

  @Get()
  findAll() {
    return this.partidasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.partidasService.findOne(+id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() updatePartidaDto: UpdatePartidaDto) {
    return this.partidasService.update(+id, updatePartidaDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.partidasService.remove(+id);
  }
}
