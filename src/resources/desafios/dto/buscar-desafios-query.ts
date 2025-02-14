import { Type } from "class-transformer";
import {  IsEnum, IsInt, IsOptional, IsString, Min } from "class-validator";
import { StatusDesafio } from "../../../database/core/desafio.entity";






export class buscarDesafios{


  @IsInt()
  @Type(() => Number)
  @Min(1)
  id_time: number;

  @IsOptional()
  @IsString()
  @Type(() => String)
  status?: StatusDesafio | null;


  //Periodo
  @IsOptional()
  data_inicio: Date;

  @IsOptional()
  data_final: Date;
  
} 
