import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetTimeQuery } from "./get-time.query";
import { GetTimeDto } from "./get-times.dto";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { Time } from "src/database/core/time.entity";
import { plainToClass } from "class-transformer";


@QueryHandler(GetTimeQuery)
export class GetTimeHandler implements IQueryHandler<GetTimeQuery, GetTimeDto>{
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource
  ){

  }
  
  async execute(query: GetTimeQuery): Promise<GetTimeDto> {
    let time = await this.dataSource.getRepository(Time)
      .createQueryBuilder('time')
      .leftJoinAndSelect('time.fundador', 'fundador')
      .where('time.id = :id', {id: query.id})
      .from(`${query.schema}.time`, 'time')
      .getOne()

    return plainToClass(GetTimeDto, time)
  }



}