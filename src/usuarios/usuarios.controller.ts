import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Req, HttpCode, HttpStatus, HttpException, NotFoundException } from '@nestjs/common';
// import { UsuariosService } from './usuarios.service';
import { SignUpUsuarioDto } from './commands/signUp/create-usuario.dto';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import {  signInDto } from './commands/signIn/signIn.dto';
import { JWTUtil } from 'utils/jwt-util';
import { Token } from 'types/Token';
import { plainToClass, plainToInstance } from 'class-transformer';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UsuarioDto } from './queries/get-usuario/usuario-dto';
import { GetUsuarioQuery } from './queries/get-usuario/get-usuario.query';
import { signUpCommand } from './commands/signUp/signUp.command';
import { signInCommand } from './commands/signIn/signIn.command';
import { UpdateUsuarioDto } from './commands/update-user/update-user.dto';
import { UpdateUserCommand } from './commands/update-user/update-user.command';
import { removeUserCommand } from './commands/remove-user/remove-user.command';
@Controller()
export class UsuariosController {
  constructor(
    // private readonly usuariosService: UsuariosService,
    private readonly jwtUtil: JWTUtil,
    private readonly queryBus: QueryBus, // Receba consultas e passa para o handler
    private readonly commandBus: CommandBus
  ) {}

  @ApiTags('Auth')
  @Post('signUp')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUsuarioDto: SignUpUsuarioDto) {
    const command = plainToClass(signUpCommand, createUsuarioDto);
    const id = await this.commandBus.execute(command);
    const query = plainToClass(GetUsuarioQuery, {id });
    return this.queryBus.execute(query);

  }

  @ApiTags('Auth')
  @Post('signIn')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'Login bem-sucedido'})
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Credenciais invalidas'})
  async login(@Body() authUserDto: signInDto ){
    const command = plainToClass(signInCommand, authUserDto)
    const token = await this.commandBus.execute(command)
    return token
    }


  @ApiTags('Usuarios')
  @Patch('usuario')
  // @ApiBody({type: UpdateUsuarioDto})
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  async update(@Body() updateUsuarioDto: UpdateUsuarioDto, @Req() req) {
    const token = this.jwtUtil.getDadosToken(req)
    updateUsuarioDto.id = token.id
    const command = plainToClass(UpdateUserCommand, updateUsuarioDto)
    return await this.commandBus.execute(command)
    // return this.usuariosService.update(updateUsuarioDto, token);
  }

  @ApiTags('Usuarios')
  @Get('usuario')
  @ApiBearerAuth()
  async getDadosUsuario(@Req() req){
    const query = plainToClass(GetUsuarioQuery, {id: '413a5733-abea-4d71-b92f-6bfc25f0b562'} )
    const usuario = await this.queryBus.execute(query);
    if(!usuario) throw new NotFoundException('Nenhum usuário encontrado')
    return usuario;
  }

  @ApiTags('Usuarios')
  @Delete('usuario')
  @ApiBearerAuth()
  remove(@Req() req) {
    const token = this.jwtUtil.getDadosToken(req)
    const command = plainToClass(removeUserCommand, {id: token.id})
    return this.commandBus.execute(command)

  }
}
