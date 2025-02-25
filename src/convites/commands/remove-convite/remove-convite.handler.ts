import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { removeConviteCommand } from "./remove-convite.command";
import { removeUserCommand } from "src/usuarios/commands/remove-user/remove-user.command";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { Convite, StatusConvite } from "src/database/core/convite.entity";
import { BadRequestException, NotFoundException } from "@nestjs/common";





@CommandHandler(removeConviteCommand)
export class RemoveConviteHandler implements ICommandHandler<removeUserCommand, {message: string}>{
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource

  ){

  }
  
  async execute(command: removeUserCommand): Promise<{ message: string }> {

    const convite = await this.dataSource.getRepository(Convite)
      .createQueryBuilder('convite')
      .select()
      .from(`${command.schema}.convite`, 'convite')
      .where('convite.id = :id', {id: command.id})
      .getOne() as Convite | null;

    if(!convite) throw new NotFoundException('Convocação não encontrado!')
    
    if(convite.status != StatusConvite.Pendente) throw new BadRequestException('Não é possível apagar uma convocação já respondida')

    await this.dataSource.getRepository(Convite)
    .createQueryBuilder()
    .delete()
    .from(`${command.schema}.convite`, 'convite')
    .where('convite.id = :id', {id: command.id})
    .execute()

    return { message: 'Convocação desfeita'}
  }

}