import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HistAtletaTimeService } from './hist_atleta_time.service';
import { CreateHistAtletaTimeDto } from './dto/create-hist_atleta_time.dto';
import { UpdateHistAtletaTimeDto } from './dto/update-hist_atleta_time.dto';

@Controller('hist-atleta-time')
export class HistAtletaTimeController {
  constructor(private readonly histAtletaTimeService: HistAtletaTimeService) {}

  @Post()
  create(@Body() createHistAtletaTimeDto: CreateHistAtletaTimeDto) {
    return this.histAtletaTimeService.create(createHistAtletaTimeDto);
  }

  @Get()
  findAll() {
    return this.histAtletaTimeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.histAtletaTimeService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHistAtletaTimeDto: UpdateHistAtletaTimeDto) {
    return this.histAtletaTimeService.update(id, updateHistAtletaTimeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.histAtletaTimeService.remove(id);
  }
}
