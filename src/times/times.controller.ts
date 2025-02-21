import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, HttpStatus } from '@nestjs/common';
import { TimesService } from './times.service';
import { CreateTimeDto } from './dto/create-time.dto';
import { UpdateTimeDto } from './dto/update-time.dto';
import { ApiBasicAuth, ApiBearerAuth, ApiBody, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JWTUtil } from 'utils/jwt-util';
import { plainToClass } from 'class-transformer';
import { createTimeCommand } from './commands/create-time/create-time.command';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetTimeQuery } from './queries/get-time/get-time.query';
import { GetTimesQuery } from './queries/get-times/get-times.query';
import { RemoveTimeCommand } from './commands/remove-time/remove-time.command';

@Controller('time')
@ApiTags('Time')
export class TimesController {
  constructor(
    private readonly jwtUtil: JWTUtil,
    private readonly queryBus: QueryBus, // Receba consultas e passa para o handler
    private readonly commandBus: CommandBus,
  ) { }


  @Post()
  @ApiBearerAuth()
  @ApiBody({ type: CreateTimeDto })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Time criado com sucesso' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Nenhum esporte encontrado' })
  create(@Body() createTimeDto: CreateTimeDto, @Req() req) {
    console.log("🚀 ~ TimesController ~ create ~ createTimeDto:", createTimeDto)
    const token = this.jwtUtil.getDadosToken(req);
    const command = plainToClass(createTimeCommand, { ...createTimeDto, fundador_id: token.id })
    return this.commandBus.execute(command)

    // return this.timesService.create(createTimeDto, token);

  }


  @Get('/')
  async buscarTimes() {
    let query = plainToClass(GetTimesQuery, {})
    console.log("🚀 ~ TimesController ~ buscarTimes ~ query:", query)
    return this.queryBus.execute(query)
  }

  // @Get(':id?')
  // @ApiParam({
  //   name: 'id',
  //   type: Number,
  //   description: 'Id do atleta',
  //   required: false
  // })
  // async getAtletaTimes(@Param('id') id: string, @Res() res, @Req() req){
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
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Time criado com sucesso' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Nenhum Time encontrado' })
  async findOne(@Param('id') id: string) {
    let query = plainToClass(GetTimeQuery, {id: id})
    return this.queryBus.execute(query)
  }


  @Patch(':id')
  @ApiBearerAuth()
  async update(@Param('id') id: string, @Body() updateTimeDto: UpdateTimeDto, @Res() res, @Req() req) {
    const token = this.jwtUtil.getDadosToken(req);
    // const response = await this.timesService.update(id, updateTimeDto, token);
    // res.status(response.status).json(response.message);
  }

  @Delete(':id')
  @ApiBearerAuth()
  async remove(@Param('id') id: string, @Res() res, @Req() req) {
    const token = this.jwtUtil.getDadosToken(req);
    let command = plainToClass(RemoveTimeCommand, {id: id})
    this.commandBus.execute(command)
    // const response = await this.timesService.remove(id, token);
    // res.status(response.status).json(response.message)
  }
}
