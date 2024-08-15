import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res } from '@nestjs/common';
import { TimesService } from './times.service';
import { CreateTimeDto } from './dto/create-time.dto';
import { UpdateTimeDto } from './dto/update-time.dto';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JWTUtil } from 'utils/jwt-util';
import { AtletaTimeService } from 'src/atleta_time/atleta_time.service';
import { CreateAtletaTimeDto } from 'src/atleta_time/dto/create-atleta_time.dto';

@Controller('times')
@ApiTags('Times')
export class TimesController {
  constructor(
    private readonly timesService: TimesService,
    private readonly atletaTimeService: AtletaTimeService
    ) {}

  @Post()
  async create(@Body() createTimeDto: CreateTimeDto, @Res() res, @Req() req) {
    const token = JWTUtil.getDadosToken(req);
    const response = await this.timesService.create(createTimeDto, token);
    res.status(response.status).json(response.message)
  }

  @Post('cadastrar-atleta')
  async cadastrarAtleta(cadastrarAtleta: CreateAtletaTimeDto, @Res() res, @Req() req){
    const token = JWTUtil.getDadosToken(req);
    const response = await this.atletaTimeService.cadastrarAtleta(cadastrarAtleta, token, false);
    res.status(response.status).json(response.message)
  }

  @Get('atletas/:id')
  async buscarAtletas(@Param("id") id: string, @Res() res){
    const response = await this.atletaTimeService.buscarAtletas(+id);
    res.status(response.status).json(response.message)
  }

  @Get('todos')
  async buscarTimes(@Res() res){
    const response = await this.timesService.buscarTimes();
    res.status(response.status).json(response.message)
  }

  @Get(':id?')
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Id do atleta',
    required: false
  })
  async getAtletaTimes(@Param('id') id: Number, @Res() res, @Req() req){
    let paramId = id
    if(req.headers.Authorization){
      const token = JWTUtil.getDadosToken(req)
      if(!paramId) {
        paramId = token.id
      }
    }

    const response = await this.atletaTimeService.getAtletaTimes(paramId)
    res.status(response.status).json(response.message)
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res) {
    const response = await this.timesService.findOne(+id);
    res.status(response.status).json(response.message)
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTimeDto: UpdateTimeDto, @Res() res, @Req() req) {
    const token = JWTUtil.getDadosToken(req)
    const response = await this.timesService.update(+id, updateTimeDto, token);
    res.status(response.status).json(response.message);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res, @Req() req) {
    const token = JWTUtil.getDadosToken(req)
    const response = await this.timesService.remove(+id, token);
    res.status(response.status).json(response.message)
  }
}
