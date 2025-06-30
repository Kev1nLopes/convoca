import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { SportCenterService } from './sport_center.service';
import { CreateSportCenterDto } from './dto/create-sport_center.dto';
import { UpdateSportCenterDto } from './dto/update-sport_center.dto';
import { CustomRequest } from 'src/guard/jwt.guard';
import { ResponseDto } from 'src/global-dto/response.dto';

@Controller('sport-center')
export class SportCenterController {
  constructor(private readonly sportCenterService: SportCenterService) {}

  @Post()
  create(@Body() createSportCenterDto: CreateSportCenterDto, @Req() req: CustomRequest) {
    const user_id = req.user.id;
    const newCenter = this.sportCenterService.create(createSportCenterDto, user_id);
    return new ResponseDto(201, "Centros desportivos encontrados com sucesso!", newCenter)
  }

  @Get()
  async findAll() {
    const sportCenters =  await this.sportCenterService.findAll();
    return new ResponseDto(200, "Centros desportivos encontrados com sucesso!", sportCenters)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const sportCenter = this.sportCenterService.findOne(id);
    return new ResponseDto(200, "Centros desportivos encontrado com sucesso!", sportCenter)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSportCenterDto: UpdateSportCenterDto) {
    return this.sportCenterService.update(id, updateSportCenterDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.sportCenterService.remove(+id);
  // }
}
