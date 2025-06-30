import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CourtService } from './court.service';
import { CreateCourtDto } from './dto/create-court.dto';
import { UpdateCourtDto } from './dto/update-court.dto';
import { ResponseDto } from 'src/global-dto/response.dto';
import { ApiBearerAuth, ApiBody, ApiSecurity } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guard/jwt.guard';

@Controller('court')
export class CourtController {
  constructor(private readonly courtService: CourtService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiBody({ type: CreateCourtDto })
  create(@Body() createCourtDto: CreateCourtDto) {
    const response =  this.courtService.create(createCourtDto);
    return new ResponseDto(201, "Campo criado com sucesso!", response)
  }


  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    const court = this.courtService.findOne(id);
    return new ResponseDto(200, "Campo encontrado com sucesso!", court)
  }

  @Get('sport_center/:id')
  @UseGuards(JwtAuthGuard)
  async findAll(@Param('id') id: string) {
    const courts = await this.courtService.findAllBySportCenter(id);
    return new ResponseDto(200, "Campos consultados!", courts)

  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: UpdateCourtDto })
  update(@Param('id') id: string, @Body() updateCourtDto: UpdateCourtDto) {
    const updatedCourt = this.courtService.update(id, updateCourtDto);
    return new ResponseDto(200, "Campo atualizado com sucesso!", updatedCourt)

  }

  @Post(':id')
  @UseGuards(JwtAuthGuard)
  async disable(@Param('id') id: string) {
    const updatedCourt = this.courtService.disable(id);
    return new ResponseDto(201, "Campo desativado com sucesso!", updatedCourt)
  }
}
