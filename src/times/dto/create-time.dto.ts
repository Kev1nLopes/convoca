import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateTimeDto {

  @ApiProperty()
  @IsNotEmpty()
  nome: String;

  @ApiProperty()
  @IsNotEmpty()
  esporte_id: Number;

  @ApiProperty()
  @IsNotEmpty()
  sigla: String;

  @ApiProperty()
  @IsNotEmpty()
  logotipo_url: String;

  @ApiProperty()
  @IsNotEmpty()
  instituicao: Number;

  @ApiProperty()
  @IsNotEmpty()
  dt_fundacao: String;
}
