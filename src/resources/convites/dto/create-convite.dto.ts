import { ApiProperty } from "@nestjs/swagger"
import { TipoConvite } from "../../../database/core/convite.entity";

export class CreateConviteDto {

  @ApiProperty({description: 'Id do Time'})
  time_id: string;

  @ApiProperty({description: 'Atleta id'})
  usuario_id:  string;

  @ApiProperty({description: 'Quem emitiu o convite, atleta ou time'})
  // Quem fez o convite, se foi a equipe ou o atleta
  tipo_convite: TipoConvite  

  @ApiProperty({description: 'Mensagem descritiva sobre o convite'})
  mensagem: string;
}
