import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { removeUserCommand } from "./remove-user.command";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { Usuario } from "src/database/core/usuario.entity";
import { NotFoundError } from "rxjs";
import { NotFoundException } from "@nestjs/common";



@CommandHandler(removeUserCommand)
export class removeUserHandler implements ICommandHandler<removeUserCommand, string>{
    constructor(
        @InjectDataSource()
        private readonly dataSource: DataSource
    ){

    }
    
    async execute(command: removeUserCommand): Promise<string> {
        return this.dataSource.transaction(async (db) => {
            let usuario = await db.findOne(Usuario, {
                where: {
                    id: command.id
                }
            })

            if(!usuario || !usuario.ativo) throw new NotFoundException('Nenhum usuário encontrado!')

            usuario.ativo = false
            await db.save(usuario)
            return 'Usuário removido com sucesso'
        })
    }

}