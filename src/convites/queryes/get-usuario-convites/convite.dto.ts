import { StatusConvite } from "src/database/core/convite.entity";
import { ConviteUsuarioDto } from "./convite-usuario.dto";
import { ConviteTimeDto } from "./convite-time.dto";



export class ConviteDto{
    time: ConviteTimeDto;
    usuario: ConviteUsuarioDto;
    status: StatusConvite;
    data_resposta: Date;
    mensagem: string;
}