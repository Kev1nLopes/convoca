import { Get } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { extname } from "path";
import { GetUsuarioConvitesQuery } from "./get-usuario-convites.query";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";






@QueryHandler(GetUsuarioConvitesQuery)
export class GetUsarioConvitesHandler implements IQueryHandler<GetUsuarioConvitesQuery, string>{
  
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource
  ){}
  
  async execute(query: GetUsuarioConvitesQuery): Promise<string> {
    let convites = await this.dataSource.createQueryBuilder()
    .select('convites.id')
    .from(`${query.schema}.convites`, 'convites') 
    .leftJoinAndSelect(`${query.schema}.convites.time`, 'time', 'time.ativo = :ativo', {ativo: true})
    .leftJoinAndSelect(`${query.schema}.convites.usuario`, 'usuario')
    .where('convites."userId" = :userId', {userId: query.id})
    .getRawMany()

    console.log("🚀 ~ GetUsarioConvitesHandler ~ execute ~ convites:", convites)
    return 'teste'
  }



}