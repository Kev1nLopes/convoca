import { StatusConvite } from "src/database/core/convite.entity";



export class CreateConviteCommand{
  
  creator_id: string; // id do usuário que enviou o convite
  usuario_id: string; 
  time_id: string;
  mensagem: string;
  schema: string;
}