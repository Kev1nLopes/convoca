import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Req } from '@nestjs/common';
import { ConvitesService } from './convites.service';
import { CreateConviteDto } from './dto/create-convite.dto';
import { UpdateConviteDto } from './dto/update-convite.dto';
import { JWTUtil } from 'utils/jwt-util';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('convites')
export class ConvitesController {
  constructor(private readonly convitesService: ConvitesService) {}

  @Post()
  async create(@Body() createConviteDto: CreateConviteDto, @Res() res, @Req() req) {
    const token = JWTUtil.getDadosToken(req)
    const response = await this.convitesService.create(createConviteDto, token);
    res.status(response.status).json(response.message)
  }

  @Get()
  @ApiBearerAuth()
  findAll(@Req() req, @Res() res) {
    const token = JWTUtil.getDadosToken(req)
    return this.convitesService.findAll(token);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res) {
    const response = await this.convitesService.findOne(+id);
    res.status(response.status).json(response.message)
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateConviteDto: UpdateConviteDto, @Res() res) {
    const response = await this.convitesService.update(+id, updateConviteDto);
    res.status(response.status).json(response.message)
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res) {
    const response = await this.convitesService.remove(+id);
    res.status(response.status).json(response.message)
  }
}
