import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { createTimeCommand } from "./create-time.command";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { Esporte } from "src/database/core/esporte.entity";
import { NotFoundException } from "@nestjs/common";
import { Time } from "src/database/core/time.entity";
import { Usuario } from "src/database/core/usuario.entity";


@CommandHandler(createTimeCommand)
export class CreateTimeHandler implements ICommandHandler<createTimeCommand, { message: string, uri: string}> {
    constructor(
        @InjectDataSource()
        private readonly dataSource: DataSource
    ) {

    }
    async execute(command: createTimeCommand): Promise<{ message: string, uri: string}> {
        let esporte = await this.dataSource.manager.findOne(Esporte, {
            where: {
                id: command.esporte_id
            }
        })

        if (!esporte) throw new NotFoundException('Nenhum esporte encontrado!')

        let usuario = await this.dataSource.manager.findOne(Usuario, {
            where: {
                id: command.fundador_id,
                ativo: true
            }
        })
        if (!usuario) throw new NotFoundException('Nenhum usuário encontrado, entre em contato com o suporte!')


        return this.dataSource.transaction(async (db) => {

            let time = await db.createQueryBuilder()
                .insert()
                .into(`${esporte}.time`)
                .values({...command, fundador: usuario })
                .execute();
            
            let timeId = time.identifiers[0]?.id;

            return { message: 'Time criado com sucesso', uri: `${process.env.SERVER}/time/${timeId}`}

        })
    }



}