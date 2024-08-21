import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateTimeDto {

  @ApiProperty()
  @IsNotEmpty({message: 'Informe o nome'})
  nome: String;

  @ApiProperty()
  @IsNotEmpty({message: 'Informe o esporte'})
  esporte_id: Number;

  @ApiProperty()
  sigla: String;

  @ApiProperty()
  logotipo_url: String;

  @ApiProperty()
  instituicao: Number;

  @ApiProperty({example: '2002-01-18'})
  @IsNotEmpty()
  dt_fundacao: Date;
}
