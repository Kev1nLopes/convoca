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
         @InjectRepository(Usuario)
        private readonly repository: Repository<Usuario>,
    ) {
        
    }

    async execute(query: signUpCommand): Promise<string> {
        let alreadyExistsWithEmail = await this.dataSource.manager.find(Usuario, {
            where: {
                email: query.email
            }
        })
        if(alreadyExistsWithEmail) {
            throw new BadRequestException("E-mail já cadastrado.");
        }


       return await this.dataSource.transaction(async (db) => {

            const saltRounds = 10;
      
            let senhaEncriptada = await hash(query.senha, saltRounds);
            query.senha = senhaEncriptada
            query.data_nasc = new Date(query.data_nasc)

            const usuario = db.create(Usuario, {
                ...query,
                senha: senhaEncriptada
            })

            await db.save(usuario)

            return usuario.id
        })
    }

}