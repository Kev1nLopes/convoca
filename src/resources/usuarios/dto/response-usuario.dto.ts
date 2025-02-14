import { OmitType } from "@nestjs/mapped-types";
import { Expose } from "class-transformer";
import { Usuario } from "../../../database/core/usuario.entity";


export class UsuarioResponseDTO extends OmitType(Usuario, ['senha'] as const) {
    @Expose()
    id: number;

    @Expose()
    nome: string;

    @Expose()
    email: string;

    @Expose()
    data_nasc: Date;

    @Expose()
    ativo: boolean;
}