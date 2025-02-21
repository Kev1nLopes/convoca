import { ICommandHandler } from "@nestjs/cqrs";
import { RemoveTimeCommand } from "./remove-time.command";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { Time } from "src/database/core/time.entity";
import { NotFoundException } from "@nestjs/common";




export class RemoveTimeHandler implements ICommandHandler<RemoveTimeCommand, string>{
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource
  ){
    
  }
  
  async execute(command: RemoveTimeCommand): Promise<string> {


    let time = await this.dataSource.getRepository(Time)
    .createQueryBuilder('time')
    .select()
    .from(`${command.schema}.time`, 'time')
    .where('time.id = :id', {id: command.id})
    .getOne()
    
    if(!time) throw new NotFoundException('Nenhum time encontrado!')
      
      
    console.log("🚀 ~ RemoveTimeHandler ~ execute ~ time:", time)

    return 'teste'
    
  }

}