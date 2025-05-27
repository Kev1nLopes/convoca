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
        console.log("🚀 ~ CreateTimeHandler ~ execute ~ esporte:", esporte)

        // const esporte = await this.dataSource.manager
        if (!esporte) throw new NotFoundException('Nenhum esporte encontrado!')
        console.log("🚀 ~ CreateTimeHandler ~ execute ~ command.fundador_id:", command.fundador_id)
            
        let usuario = await this.dataSource.manager.findOne(Usuario, {
            where: {
                id: command.fundador_id,
            }
        })
        if (!usuario) throw new NotFoundException('Nenhum usuário encontrado, entre em contato com o suporte!')
        if (!usuario.ativo) throw new NotFoundException('Usuário inativo, entre em contato com o suporte!')
        delete command.esporte_id

        let time = await this.dataSource.getRepository(Time).createQueryBuilder()
        .select()
        .from(`${esporte.nome}.time`, 'time')
        .where('time.sigla = :sigla', {sigla: command.sigla})
        .getOne()

        if(time) throw new NotFoundException('Ja existe um time com essa sigla!')

        return this.dataSource.transaction(async (db) => {

            let time = await db.createQueryBuilder()
                .insert()
                .into(`${esporte.nome}.time`)
                .values({...command, fundador_id: usuario.id })
                .execute();
            
            let timeId = time.identifiers[0]?.id;

            return { message: 'Time criado com sucesso', uri: `${process.env.server}/time/${timeId}`}

        })
    }



}