import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUsuarioDto } from './create-usuario.dto';

export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {


  @ApiProperty()
  cpf: String;

  @ApiProperty()
  cep: String;

  @ApiProperty()
  uf: String;

  @ApiProperty()
  cidade: String;

  @ApiProperty()
  bairro: String;



}
