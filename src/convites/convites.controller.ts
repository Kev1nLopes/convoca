import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ConvitesService } from './convites.service';

@Controller('convites')
export class ConvitesController {
  constructor(private readonly convitesService: ConvitesService) {}

  @Post()
  create(@Body() createConviteDto: CreateConviteDto) {
    return this.convitesService.create(createConviteDto);
  }

  @Get()
  findAll() {
    return this.convitesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.convitesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateConviteDto: UpdateConviteDto) {
    return this.convitesService.update(+id, updateConviteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.convitesService.remove(+id);
  }
}
