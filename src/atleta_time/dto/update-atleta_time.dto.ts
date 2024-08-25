import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateAtletaTimeDto } from './create-atleta_time.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateAtletaTimeDto extends PartialType(CreateAtletaTimeDto) {
  

  cargo: String

  @ApiProperty({description: 'Aceitou o convite de participar da equipe'})
  aceitou: Boolean


  
}
