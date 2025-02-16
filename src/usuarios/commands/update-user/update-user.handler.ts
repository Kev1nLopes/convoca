import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UpdateUserCommand } from "./update-user.command";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { Usuario } from "src/database/core/usuario.entity";
import { NotFoundException } from "@nestjs/common";


@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand, string> {
    constructor(
        @InjectDataSource()
        private readonly dataSource: DataSource
    ){

    }

    async execute(command: UpdateUserCommand): Promise<string> {
        return this.dataSource.transaction(async (db) => {
            const usuario = await db.findOne(Usuario, {
                where: {
                    id: command.id
                }
            })

            if(!usuario) throw new NotFoundException('Nenhum usuario encontrado')
            //Mescla o conteudo dentro de usuario
            db.merge(Usuario, usuario, command)
            await db.save(usuario);
            return 'Usuário alterado com sucesso'

        })
    }

}