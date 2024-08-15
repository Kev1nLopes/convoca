import { IsNotEmpty } from "class-validator";

export class CreateAtletaTimeDto {

  @IsNotEmpty({message: 'Informe um usuario'})
  usuario_id: Number;

  @IsNotEmpty({message: 'Informe um time'})
  time_id: Number;
}
