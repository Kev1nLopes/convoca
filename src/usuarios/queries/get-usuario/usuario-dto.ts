import { Exclude, Expose, Type } from "class-transformer";
import { AtletaTimeDto } from "./atleta-time-dto";
import { TimeDto } from "./time-dto";




@Exclude()
export class UsuarioDto {

    @Expose()
    id: string;
    @Expose()
    nome: string;
    @Expose()
    email: string;
    @Expose()
    data_nasc: Date;
    @Expose()
    cpf?: string;

    @Expose()
    cep?: string;

    @Expose()
    uf?: string;

    @Expose()
    cidade?: string;

    @Expose()
    bairro?: string;


    @Expose()
    @Type(() => AtletaTimeDto)
    times: AtletaTimeDto[];

}
