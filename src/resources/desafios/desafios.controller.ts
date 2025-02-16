import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Res, Req, HttpStatus } from '@nestjs/common';
import { DesafiosService } from './desafios.service';
import { CreateDesafioDto } from './dto/create-desafio.dto';
import { UpdateDesafioDto } from './dto/update-desafio.dto';
import { ApiBearerAuth, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { buscarDesafios } from './dto/buscar-desafios-query';
import { StatusDesafio } from '../../database/core/desafio.entity';
import { Token } from 'types/Token';
import { JWTUtil } from 'utils/jwt-util';

@ApiTags('Desafios')
@Controller('desafios')
export class DesafiosController {
  constructor(
    private readonly desafiosService: DesafiosService,
    private readonly jwtUtil: JWTUtil

  ) {}

  @Post()
  @ApiBearerAuth()
  async cadastrarDesafio(@Body() createDesafioDto: CreateDesafioDto, @Req() req) {
    const token = this.jwtUtil.getDadosToken(req)
    return this.desafiosService.cadastrarDesafio(createDesafioDto, token);

  }



  @Get()
  @ApiQuery({ name: 'id_time', type: Number, required: true, description: 'TIME ID', style:'spaceDelimited'})
  @ApiQuery({ name: 'status', enum: StatusDesafio, enumName: 'StatusDesafio', required: false, description: 'STATUS DESAFIO', style:'spaceDelimited'})
  @ApiQuery({ name: 'data_inicio', type: Date, required: false})
  @ApiQuery({ name: 'data_final', type: Date, required: false})
  async buscarDesafios(@Query() query: buscarDesafios, @Res() res){
    const { id_time,status, data_inicio, data_final } = query;
    const response = await this.desafiosService.buscarDesafios(id_time, status, data_inicio, data_final);
    res.status(response.status).json(response.message)
  }

  @Get(':id')
  @ApiResponse({status: HttpStatus.OK, description: 'Desafio encontrado'})
  @ApiResponse({status: HttpStatus.NOT_FOUND, description: 'Nenhum desafio encontrado'})
  async findOne(@Param('id') id: string,) {
    return this.desafiosService.findOne(id);

  }

  @Patch(':id')
  @ApiBearerAuth()
  async update(@Param('id') id: string, @Body() updateDesafioDto: UpdateDesafioDto, @Req() req, @Res() res) {
    const token = this.jwtUtil.getDadosToken(req)
    const response = await this.desafiosService.update(id, updateDesafioDto, token);
    res.status(response.status).json(response.message)
  }

}
