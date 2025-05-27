import { CommandHandler,  ICommandHandler } from "@nestjs/cqrs";
import { CreateConviteCommand } from "./create-convite.command";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { Esporte } from "src/database/core/esporte.entity";
import { NotFoundException } from "@nestjs/common";



@CommandHandler(CreateConviteCommand)
export class CreateConviteHandler implements ICommandHandler<CreateConviteCommand, {message: string}>{
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource
  ){

  }
  
  async execute(command: CreateConviteCommand): Promise<{ message: string, link: string }> {

    let schema = command.schema;
    delete command.schema

    const esporte = await this.dataSource.getRepository(Esporte).createQueryBuilder()
    .select()
    .from('esportes', 'esportes')
    .where('esportes.nome = :esporte', {esporte: command.schema})
    .getOne()

    if(!esporte) throw new NotFoundException('Nenhum esporte encontrado!')

    const time = await this.dataSource.createQueryBuilder()
    .select()
    .from(`${schema}.time`, 'time')
    .where('time.id = :id', {id: command.time_id})
    .getOne()

    console.log("🚀 ~ CreateConviteHandler ~ execute ~ time:", time)

    return
    

    const convite = await this.dataSource.createQueryBuilder()
      .insert()
      .into(`"${schema}"."convites"`)
      .values({...command})
      .execute()

    const conviteId = convite.identifiers[0]?.id;
      
    return { message: 'Convite criado com sucesso', link: `${process.env.SERVER}/convite/${conviteId}`}
  }
}