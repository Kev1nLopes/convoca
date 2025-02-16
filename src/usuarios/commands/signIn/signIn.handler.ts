import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { signInCommand } from "./signIn.command";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { Usuario } from "src/database/core/usuario.entity";
import { NotFoundError } from "rxjs";
import { BadRequestException, NotFoundException } from "@nestjs/common";
import { compare } from "bcrypt";
import { JWTUtil } from "utils/jwt-util";


@CommandHandler(signInCommand)
export class signInHandler implements ICommandHandler<signInCommand, string>{
    constructor(
        @InjectDataSource()
        private readonly dataSource: DataSource,
        private jwtUtil: JWTUtil
    ){

    }
    
    async execute(command: signInCommand): Promise<string> {
        const usuario = await this.dataSource.manager.find(Usuario, {
            where: {
                email: command.email
            }
        })   
        if(!usuario){
            throw new NotFoundException('Nenhum usuário encontrado com este email')
        }

        let match = await compare(command.senha, usuario[0].senha)

        if(!match){
          throw new BadRequestException('E-mail ou senha incorretos', {})          
        }

        let token = this.jwtUtil.GenerateToken(usuario[0])

        return token

    }

}