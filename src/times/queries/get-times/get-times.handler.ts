import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetTimesQuery } from "./get-times.query";
import { GetTimeDto } from "./get-times.dto";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { Time } from "src/database/core/time.entity";
import { plainToClass, plainToInstance } from "class-transformer";
import { query } from "express";


@QueryHandler(GetTimesQuery)
export class GetTimesHandler implements IQueryHandler<GetTimesQuery, GetTimeDto[]>{
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource
  ){

  }
  
  async execute(query: GetTimesQuery): Promise<GetTimeDto[]> {
    let times = await this.dataSource.createQueryBuilder()
      .select()
      .from(`${query.schema}.time`, 'time')
      .where('time.ativo = :ativo', {ativo: true})
      .getMany()


    return plainToInstance(GetTimeDto, times, { excludeExtraneousValues: true })
  }



}