import { Exclude, Expose, Type } from "class-transformer";
import { AtletaTimeDto } from "./atleta-time-dto";




@Exclude()
export class UsuarioDto {

    @Expose()
    id: number;
    @Expose()
    nome: string;
    @Expose()
    email: string;
    @Expose()
    data_nasc: Date;

    @Type(() => AtletaTimeDto)
    @Expose()
    atleta_time: AtletaTimeDto[];

}
