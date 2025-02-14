import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Req, HttpCode, HttpStatus, HttpException, NotFoundException } from '@nestjs/common';
// import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginUsuarioDto } from './dto/login-usuario.dto';
import { JWTUtil } from 'utils/jwt-util';
import { Token } from 'types/Token';
import { UsuarioResponseDTO } from './dto/response-usuario.dto';
import { plainToClass, plainToInstance } from 'class-transformer';
import { QueryBus } from '@nestjs/cqrs';
import { UsuarioDto } from './queries/get-usuario/usuario-dto';
import { GetUsuarioQuery } from './queries/get-usuario/get-usuario.query';
@Controller()
export class UsuariosController {
  constructor(
    // private readonly usuariosService: UsuariosService,
    private readonly jwtUtil: JWTUtil,
    private readonly queryBus: QueryBus // Receba consultas e passa para o handler
  ) {}

  @ApiTags('Auth')
  @Post('signUp')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUsuarioDto: CreateUsuarioDto, @Res() res) {
    console.log("🚀 ~ UsuariosController ~ create ~ createUsuarioDto:", createUsuarioDto)
    // return this.usuariosService.create(createUsuarioDto);
  }

  @ApiTags('Auth')
  @Post('signIn')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'Login bem-sucedido'})
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Credenciais invalidas'})
  async login(@Body() authUserDto: LoginUsuarioDto, ){
    // const response = await this.usuariosService.login(authUserDto)
    // if(response.status == HttpStatus.UNAUTHORIZED) throw new HttpException('Credenciais inválidas', HttpStatus.UNAUTHORIZED)
    // return response.message
    }


  @ApiTags('Usuarios')
  @Patch('usuario')
  @ApiBody({type: UpdateUsuarioDto})
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  update(@Body() updateUsuarioDto: UpdateUsuarioDto, @Req() req) {
    const token = this.jwtUtil.getDadosToken(req)
    // return this.usuariosService.update(updateUsuarioDto, token);
  }

  @ApiTags('Usuarios')
  @Get('usuario')
  @ApiBearerAuth()
  async getDadosUsuario(@Req() req){
    // const token = this.jwtUtil.getDadosToken(req)
    //const query = plainToClass( GetUsuarioQuery, {id: token.id} )
    const query = plainToClass( GetUsuarioQuery, {id: 1} )
    const usuario = await this.queryBus.execute(query);
    if(!usuario) throw new NotFoundException('Nenhum usuário encontrado')
    return usuario;
  }

  @ApiTags('Usuarios')
  @Delete('usuario')
  @ApiBearerAuth()
  remove(@Req() req) {
    const token = this.jwtUtil.getDadosToken(req)
    // return this.usuariosService.remove(token);
  }
}
