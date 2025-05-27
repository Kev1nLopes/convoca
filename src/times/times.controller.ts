import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, HttpStatus, Query } from '@nestjs/common';
import { TimesService } from './times.service';
import { ApiBasicAuth, ApiBearerAuth, ApiBody, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JWTUtil } from 'utils/jwt-util';
import { plainToClass } from 'class-transformer';
import { createTimeCommand } from './commands/create-time/create-time.command';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetTimeQuery } from './queries/get-time/get-time.query';
import { GetTimesQuery } from './queries/get-times/get-times.query';
import { RemoveTimeCommand } from './commands/remove-time/remove-time.command';
import { Util } from 'utils/util';
import { UpdateTimeCommand } from './commands/update-time/update-time.command';
import { CreateTimeDto } from './commands/create-time/create-time.dto';
import { UpdateTimeDto } from './commands/update-time/update-time.dto';

@Controller('time')
@ApiTags('Time')
export class TimesController {
  constructor(
    private readonly jwtUtil: JWTUtil,
    private readonly util: Util,
    private readonly queryBus: QueryBus, // Receba consultas e passa para o handler
    private readonly commandBus: CommandBus,
  ) { }


  @Post()
  @ApiBearerAuth()
  @ApiBody({ type: CreateTimeDto })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Time criado com sucesso' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Nenhum esporte encontrado' })
  create(@Body() createTimeDto: CreateTimeDto, @Req() req) {
    const token = this.jwtUtil.getDadosToken(req);
    console.log("🚀 ~ TimesController ~ create ~ token:", token)
    const command = plainToClass(createTimeCommand, { ...createTimeDto, fundador_id: token.id })
    return this.commandBus.execute(command)

    // return this.timesService.create(createTimeDto, token);

  }


  @Get('/')
  async buscarTimes() {
    let query = plainToClass(GetTimesQuery, {})
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
  async findOne(@Param('id') id: string, @Req() req) {
    const schema = this.util.getSchema(req)
    let query = plainToClass(GetTimeQuery, {id: id, schema: schema})

    return this.queryBus.execute(query)
  }


  @Patch(':id')
  @ApiBearerAuth()
  async update(@Param('id') id: string, @Body() updateTimeDto: UpdateTimeDto, @Res() res, @Req() req) {
    const token = this.jwtUtil.getDadosToken(req);
    const schema = this.util.getSchema(req)
    let command = plainToClass(UpdateTimeCommand, {...updateTimeDto, schema: schema })
    const response = await this.commandBus.execute(command)
    // res.status(response.status).json(response.message);
  }

  @Delete(':id')
  @ApiBearerAuth()
  async remove(@Param('id') id: string, @Req() req) {
    const token = this.jwtUtil.getDadosToken(req);
    const schema = this.util.getSchema(req)
    let command = plainToClass(RemoveTimeCommand, {id: id})
    this.commandBus.execute(command)
    // const response = await this.timesService.remove(id, token);
    // res.status(response.status).json(response.message)
  }
}
