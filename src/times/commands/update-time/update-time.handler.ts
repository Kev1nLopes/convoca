import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UpdateTimeCommand } from "./update-time.command";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { Usuario } from "src/database/core/usuario.entity";
import { NotFoundException } from "@nestjs/common";
import { Time } from "src/database/core/time.entity";

@CommandHandler(UpdateTimeCommand)
export class UpdateTimeHandler implements ICommandHandler<UpdateTimeCommand, {message: string}>{
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource
  ){

  }
  async execute(command: UpdateTimeCommand): Promise<{message: string}> {


    return this.dataSource.transaction(async (db) => {


      let time = await db.createQueryBuilder()
        .select()
        .from(`${command.schema}.time`, 'time')
        .where('time.id = :id', {id: command.id})
        .getOne()

      if(!time) throw new NotFoundException('Nenhum time encontrado')


      db.createQueryBuilder()
        .update(`${command.schema}.time`)
        .set({...command})
        .where(`id = :id`, {id: command.id})
        .execute()


      return { message: 'Time atualizado com sucesso!'}
    })
  }


}