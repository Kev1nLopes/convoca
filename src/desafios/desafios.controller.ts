import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Res, Req } from '@nestjs/common';
import { DesafiosService } from './desafios.service';
import { CreateDesafioDto } from './dto/create-desafio.dto';
import { UpdateDesafioDto } from './dto/update-desafio.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { buscarPendentesQuery } from './dto/buscar-pendentes-query';
import { StatusDesafio } from './entities/desafio.entity';
import { Token } from 'types/Token';
import { JWTUtil } from 'utils/jwt-util';

@ApiTags('Desafios')
@Controller('desafios')
export class DesafiosController {
  constructor(private readonly desafiosService: DesafiosService) {}

  @Post()
  @ApiBearerAuth()
  async cadastrarDesafio(@Body() createDesafioDto: CreateDesafioDto, @Req() req, @Res() res) {
    const token = JWTUtil.getDadosToken(req)
    const response = await this.desafiosService.cadastrarDesafio(createDesafioDto, token);
    res.status(response.status).json(response.message)
  }



  @Get()
  @ApiQuery({ name: 'id_time', type: Number, required: true, description: 'TIME ID', style:'spaceDelimited'})
  @ApiQuery({ name: 'status', enum: StatusDesafio, enumName: 'StatusDesafio', required: false, description: 'STATUS DESAFIO', style:'spaceDelimited'})
  @ApiQuery({ name: 'data_inicio', type: Date, required: false})
  @ApiQuery({ name: 'data_final', type: Date, required: false})
  async buscarDesafios(@Query() query: buscarPendentesQuery, @Res() res){
    const { id_time,status, data_inicio, data_final } = query;
    const response = await this.desafiosService.buscarDesafios(id_time, status, data_inicio, data_final);
    res.status(response.status).json(response.message)
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res) {
    const response = await this.desafiosService.findOne(+id);
    res.status(response.status).message(response.message)
  }

  @Patch(':id')
  @ApiBearerAuth()
  async update(@Param('id') id: string, @Body() updateDesafioDto: UpdateDesafioDto, @Req() req, @Res() res) {
    const token = JWTUtil.getDadosToken(req)
    const response = await this.desafiosService.update(+id, updateDesafioDto, token);
    res.status(response.status).json(response.message)
  }

}
