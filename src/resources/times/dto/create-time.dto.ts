import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateTimeDto {

  @ApiProperty()
  @IsNotEmpty({message: 'Informe o nome'})
  nome: string;

  @ApiProperty()
  @IsNotEmpty({message: 'Informe o esporte'})
  esporte_id: number;

  @ApiPropertyOptional()
  @IsOptional()
  sigla?: string;

  @ApiPropertyOptional()
  @IsOptional()
  logotipo_url?: string;


  @ApiProperty({example: '2002-01-18'})
  @IsNotEmpty()
  dt_fundacao: Date;
}
