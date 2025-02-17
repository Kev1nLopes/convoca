import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetTimesQuery } from "./get-times.query";
import { GetTimeDto } from "./get-times.dto";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { Time } from "src/database/core/time.entity";
import { plainToClass, plainToInstance } from "class-transformer";


@QueryHandler(GetTimesQuery)
export class GetTimesHandler implements IQueryHandler<GetTimesQuery, GetTimeDto[]>{
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource
  ){

  }
  
  async execute(): Promise<GetTimeDto[]> {
    let times = await this.dataSource.manager.find(Time, {
      where: {
        ativo: true
      }
    })

    return plainToInstance(GetTimeDto, times, { excludeExtraneousValues: true })
  }



}