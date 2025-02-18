import { CommandHandler, ICommandHandler, IQueryHandler } from "@nestjs/cqrs";
import { signUpCommand } from "./signUp.command";
import { InjectDataSource, InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { Usuario } from "src/database/core/usuario.entity";
import { hash } from "bcrypt";
import { BadRequestException } from "@nestjs/common";


@CommandHandler(signUpCommand)
export class signUpHandler implements ICommandHandler<signUpCommand, string>{
    
    /**
     *
     */
    constructor(
        @InjectDataSource()
        private readonly dataSource: DataSource,
    ) {
        
    }

    async execute(command: signUpCommand): Promise<string> {
        let alreadyExistsWithEmail = await this.dataSource.manager.findOne(Usuario, {
            where: {
                email: command.email
            }
        })
        if(alreadyExistsWithEmail) {
            throw new BadRequestException("E-mail já cadastrado.");
        }


       return await this.dataSource.transaction(async (db) => {

            const saltRounds = 10;
      
            let senhaEncriptada = await hash(command.senha, saltRounds);
            command.senha = senhaEncriptada
            command.data_nasc = new Date(command.data_nasc)

            const usuario = db.create(Usuario, {
                ...command,
                senha: senhaEncriptada
            })

            await db.save(usuario)

            return usuario.id
        })
    }

}