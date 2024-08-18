import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty } from "class-validator";
import { StatusDesafio } from "../entities/desafio.entity";


export class CreateDesafioDto {

  @ApiProperty()
  datahora_desafio: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(StatusDesafio)
  id_time_desafiante: Number;


  @ApiProperty()
  @IsNotEmpty()
  id_time_desafiado: Number;

  @ApiProperty()
  nome_campo: String;
}
