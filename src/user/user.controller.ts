import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBody } from '@nestjs/swagger';
import { ResponseDto } from 'src/global-dto/response.dto';
import { CustomRequest, JwtAuthGuard } from 'src/guard/jwt.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}


  @Get('my')
  @UseGuards(JwtAuthGuard)
  //Consultar o perfil completo do usuário e seus times!
  async getMyProfile(@Req() req: CustomRequest) {
    const id = req.user.id
    const user = await this.userService.findOne(id);
    if(!user) throw new NotFoundException("Nenhum usuário encontrado");
    return new ResponseDto(200, "Usuário encontrado com sucesso!", user)
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  //Consultar o perfil completo do usuário e seus times!
  async findOne(@Param('id') id: string) {
    const user = await this.userService.findOne(id);
    if(!user) throw new NotFoundException("Nenhum usuário encontrado");
    return new ResponseDto(200, "Usuário encontrado com sucesso!", user)
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  @ApiBody({type: UpdateUserDto})
  update(@Body() updateUserDto: UpdateUserDto, @Req() req: CustomRequest) {
    const id = req.user.id
    return this.userService.update(id, updateUserDto);
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  remove(@Req() req: CustomRequest) {
    const id = req.user.id
    return this.userService.remove(id);
  }
}
