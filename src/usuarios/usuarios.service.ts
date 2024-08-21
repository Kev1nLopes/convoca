import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import { JWTUtil } from 'utils/jwt-util';
import { hash, compare } from 'bcrypt';
import {  LoginUsuarioDto } from './dto/login-usuario.dto';
import { error } from 'console';
import { Token } from 'types/Token';

@Injectable()
export class UsuariosService {

  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>
  ){}
  async create(createUsuarioDto: CreateUsuarioDto) {
    try{

      const UserEmail = await this.usuarioRepository.findOne({
        where: {
          email: createUsuarioDto.email
        }
      });

      if(UserEmail){
        throw new BadRequestException('Este e-mail já foi vinculado a um usuário', { cause: {}, description: 'Usuário ja existe'})
      }

      // Encriptar a senha
      const saltRounds = 10;
      
      let senhaEncriptada = await hash(createUsuarioDto.senha.valueOf(), saltRounds);
      createUsuarioDto.senha = senhaEncriptada
      createUsuarioDto.data_nasc = new Date(createUsuarioDto.data_nasc)

      let novoUsuario = await this.usuarioRepository.save(createUsuarioDto);

      

      let token = JWTUtil.GenerateToken(novoUsuario);

      return { status: 200, message: {message: 'Usuário criado com sucesso' ,data: { token: token}} }

      


    }catch(error){
      console.log("UsuariosService ~ create ~ error:", error)
      throw new BadRequestException('Erro ao criar o usuário', { cause: error, description: 'Não foi possível criar o usuário'})
    }

  }


  async login(authUser: LoginUsuarioDto){
    try{
      let Usuario = await this.usuarioRepository.findOne({
        where: {
          email: authUser.email
        }
      })

      if(!Usuario){
        throw new NotFoundException('E-mail ou senha incorretos', {})
      }

      let match = await compare(authUser.senha, Usuario.senha.valueOf())

      if(!match){
        throw new BadRequestException('E-mail ou senha incorretos', {})          
      }


      let token = JWTUtil.GenerateToken(Usuario)

      return { status: 200, message: { token: token }}

    }catch(error){
      throw new BadRequestException('E-mail ou senha incorretos', {})
    }
  }



  async update(updateUsuarioDto: Object, token: Token) {
    try{
      let findUsuario = await this.usuarioRepository.findOne({
        where: {
          id: token.id
        }
      })

      if(!findUsuario){
        throw new NotFoundException('Nenhum usuário encontrado', {})
      }
      
      
      for (const key of Object.keys(updateUsuarioDto)) {
        if(Object.keys(findUsuario).includes(key)){
          findUsuario[key] = updateUsuarioDto[key]
        }
        
      }

      await this.usuarioRepository.save(findUsuario);

      return { status: 200, message: 'Usuário alterado com sucesso!'}

    }catch(error){
      console.log(" ~ UsuariosService ~ update ~ error:", error)
      throw new BadRequestException('Não foi possível alterar o usuário', {})

    }
  }

  async getById(id: Number){
    try{

      const Usuario = await this.usuarioRepository.findOne({
        where: { 
          id: id,
        }
      })

      if(!Usuario) throw new NotFoundException('Nenhum usuário encontrado')

      return Usuario

    }catch(error){
      console.log(" ~ UsuariosService ~ getById ~ error:", error)
      throw new BadRequestException('Não foi possível consultar o usuário')
    }
  }


  async remove(token: Token) {
    try{
      const Usuario = await this.usuarioRepository.findOne({
        where: {
          id: token.id
        }
      })

      if(!Usuario){
        throw new NotFoundException('Nenhum usuário encontrado', {})
      }

      if(!Usuario.ativo){
        throw new BadRequestException('Usuário ja esta inativo')
      }


      Usuario.ativo = false;

      await this.usuarioRepository.save(Usuario);
      

      return { status: 200, message: 'Usuário deletado com sucesso'}

    }catch(error){
      console.log("~ UsuariosService ~ remove ~ error:", error)
      throw new BadRequestException('Não foi possível deletar o usuário', {})

    }
  }
}
