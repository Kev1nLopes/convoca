import { PartialType } from '@nestjs/swagger';
import { CreateAtletaTimeDto } from './create-atleta_time.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateAtletaTimeDto extends PartialType(CreateAtletaTimeDto) {
  
  @IsNotEmpty({message: 'Informe o cargo'})
  cargo: String
}
