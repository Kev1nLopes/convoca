import { OmitType } from "@nestjs/mapped-types";
import { Expose } from "class-transformer";
import { Usuario } from "../entities/usuario.entity";


export class UsuarioResponseDTO extends OmitType(Usuario, ['senha'] as const) {
    @Expose()
    id: Number;

    @Expose()
    nome: String;

    @Expose()
    email: String;

    @Expose()
    data_nasc: Date;

    @Expose()
    ativo: boolean;
}