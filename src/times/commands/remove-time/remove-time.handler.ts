import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { RemoveTimeCommand } from "./remove-time.command";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { Time } from "src/database/core/time.entity";
import { NotFoundException } from "@nestjs/common";



@CommandHandler(RemoveTimeCommand)
export class RemoveTimeHandler implements ICommandHandler<RemoveTimeCommand, {message: string}>{
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource
  ){
    
  }
  
  async execute(command: RemoveTimeCommand): Promise<{message: string}> {


    let time = await this.dataSource.getRepository(Time)
      .createQueryBuilder('time')
      .select()
      .from(`${command.schema}.time`, 'time')
      .where('time.id = :id', {id: command.id})
      .getOne()
    
    if(!time) throw new NotFoundException('Nenhum time encontrado!')
    
    await this.dataSource.getRepository(Time)
      .createQueryBuilder('time')
      .update(`${command.schema}.time`)
      .set({ativo: false})
      .where('time.id = :id', {id: command.id})
      .execute()
      
      
    return { message: 'Time removido com sucesso!'}
    
  }

}