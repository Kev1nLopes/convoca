import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateAtletaTimeDto {

  @ApiProperty()
  @IsNotEmpty({message: 'Informe um usuario'})
  usuario_id: number;

  @ApiProperty()
  @IsNotEmpty({message: 'Informe um time'})
  time_id: number;
}
