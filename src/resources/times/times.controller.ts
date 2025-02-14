import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, HttpStatus } from '@nestjs/common';
import { TimesService } from './times.service';
import { CreateTimeDto } from './dto/create-time.dto';
import { UpdateTimeDto } from './dto/update-time.dto';
import { ApiBasicAuth, ApiBearerAuth, ApiBody, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JWTUtil } from 'utils/jwt-util';
import { AtletaTimeService } from 'src/resources/atleta_time/atleta_time.service';
import { CreateAtletaTimeDto } from 'src/resources/atleta_time/dto/create-atleta_time.dto';

@Controller('time')
@ApiTags('Time')
export class TimesController {
  constructor(
    private readonly timesService: TimesService,
    private readonly atletaTimeService: AtletaTimeService,
    private readonly jwtUtil: JWTUtil
    ) {}

  
  @Post()
  @ApiBearerAuth()
  @ApiBody({type: CreateTimeDto})
  @ApiResponse({status: HttpStatus.CREATED, description: 'Time criado com sucesso'})
  @ApiResponse({status: HttpStatus.NOT_FOUND, description: 'Nenhum esporte encontrado'})
  async create(@Body() createTimeDto: CreateTimeDto, @Req() req) {
    console.log("🚀 ~ TimesController ~ create ~ createTimeDto:", createTimeDto)
    const token = this.jwtUtil.getDadosToken(req);
    return this.timesService.create(createTimeDto, token);
    
  }
  
  @Get('atletas/:id')
  async buscarAtletas(@Param("id") id: string, @Res() res){
    const response = await this.atletaTimeService.buscarAtletas(+id);
    res.status(response.status).json(response.message)
  }
  
  @Get('/')
  async buscarTimes(@Res() res){
    const response = await this.timesService.buscarTimes();
    res.status(response.status).json(response.message)
  }

  // @Get(':id?')
  // @ApiParam({
  //   name: 'id',
  //   type: Number,
  //   description: 'Id do atleta',
  //   required: false
  // })
  // async getAtletaTimes(@Param('id') id: Number, @Res() res, @Req() req){
  //   let paramId = id
  //   if(req.headers.Authorization){
  //     const token = JWTUtil.getDadosToken(req)
  //     if(!paramId) {
  //       paramId = token.id
  //     }
  //   }

  //   const response = await this.atletaTimeService.getAtletaTimes(paramId)
  //   res.status(response.status).json(response.message)
  // }

  @Get(':id')
  @ApiResponse({status: HttpStatus.CREATED, description: 'Time criado com sucesso'})
  @ApiResponse({status: HttpStatus.NOT_FOUND, description: 'Nenhum Time encontrado'})
  async findOne(@Param('id') id: Number) {
    return this.timesService.findOne(+id);
  }
  
  
  @Patch(':id')
  @ApiBearerAuth()
  async update(@Param('id') id: string, @Body() updateTimeDto: UpdateTimeDto, @Res() res, @Req() req) {
    const token = this.jwtUtil.getDadosToken(req);
    const response = await this.timesService.update(+id, updateTimeDto, token);
    res.status(response.status).json(response.message);
  }

  @Delete(':id')
  @ApiBearerAuth()
  async remove(@Param('id') id: string, @Res() res, @Req() req) {
    const token = this.jwtUtil.getDadosToken(req);
    const response = await this.timesService.remove(+id, token);
    res.status(response.status).json(response.message)
  }
}
