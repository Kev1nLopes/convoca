import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Req } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { LoginUsuarioDto } from './dto/login-usuario.dto';
import { JWTUtil } from 'utils/jwt-util';
import { Token } from 'types/Token';
@Controller()
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @ApiTags('Auth')
  @Post('signUp')
  async create(@Body() createUsuarioDto: CreateUsuarioDto, @Res() res) {
    const response = await this.usuariosService.create(createUsuarioDto);
    res.status(response.status).json(response.message)
  }

  @ApiTags('Auth')
  @Post('signIn')
  async login(@Body() authUserDto: LoginUsuarioDto, @Res() res){
    const response = await this.usuariosService.login(authUserDto)
    res.status(response.status).json(response.message);
  }


  @ApiTags('Usuarios')
  @Patch()
  @ApiBody({type: UpdateUsuarioDto})
  update(@Body() updateUsuarioDto: Object, @Req() req) {
    const token = JWTUtil.getDadosToken(req)
    return this.usuariosService.update(updateUsuarioDto, token);
  }

  @ApiTags('Usuarios')
  remove(@Req() req) {
    const token = JWTUtil.getDadosToken(req)
    return this.usuariosService.remove(token);
  }
}
