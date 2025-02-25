import { CommandHandler,  ICommandHandler } from "@nestjs/cqrs";
import { CreateConviteCommand } from "./create-convite.command";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";



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

    const convite = await this.dataSource.createQueryBuilder()
      .insert()
      .into(`"${schema}"."convites"`)
      .values({...command})
      .execute()

    const conviteId = convite.identifiers[0]?.id;
      
    return { message: 'Convite criado com sucesso', link: `${process.env.SERVER}/convite/${conviteId}`}
  }
}