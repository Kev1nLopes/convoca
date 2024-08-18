import { Type } from "class-transformer";
import {  IsEnum, IsInt, IsOptional, IsString, Min } from "class-validator";
import { StatusDesafio } from "../entities/desafio.entity";






export class buscarPendentesQuery{


  @IsInt()
  @Type(() => Number)
  @Min(1)
  id_time: number;


  @IsString()
  @Type(() => String)
  status: StatusDesafio;


  //Periodo
  @IsOptional()
  data_inicio: Date;

  @IsOptional()
  data_final: Date;
  
} 
