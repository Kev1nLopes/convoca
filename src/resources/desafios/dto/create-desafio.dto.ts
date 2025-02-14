import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { StatusDesafio } from "../../../database/core/desafio.entity";


export class CreateDesafioDto {

  @ApiProperty()
  @IsNotEmpty()
  datahora_desafio: Date;

  @ApiProperty()
  @IsNotEmpty()
  id_time_desafiante: number;


  @ApiProperty()
  @IsNotEmpty()
  id_time_desafiado: number;

  @ApiPropertyOptional()
  @IsOptional()
  nome_campo: string;
}
