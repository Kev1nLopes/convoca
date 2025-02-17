import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UpdateTimeCommand } from "./update-time.command";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { Usuario } from "src/database/core/usuario.entity";
import { NotFoundException } from "@nestjs/common";
import { Time } from "src/database/core/time.entity";

@CommandHandler(UpdateTimeCommand)
export class UpdateTimeHandler implements ICommandHandler<UpdateTimeCommand, string>{
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource
  ){

  }
  async execute(command: UpdateTimeCommand): Promise<string> {


    return this.dataSource.transaction(async (db) => {

      let time = await db.findOne(Time, {
        where: {
          id: command.id,
          ativo: true
        }
      })

      if(!time) throw new NotFoundException('Nenhum time encontrado')

      db.merge(Time, time, command)
      await db.save(time)
      return 'Time atualizado com sucesso!'
    })
  }


}