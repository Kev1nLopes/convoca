import { StatusConvite } from "src/database/core/convite.entity";
import { Time } from "src/database/core/time.entity";
import { Usuario } from "src/database/core/usuario.entity";



export class CreateConviteCommand{
  
  usuario: Usuario;
  time: Time;
  mensagem: string;
  schema: string;
}