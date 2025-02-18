import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { InjectDataSource } from "@nestjs/typeorm";
import { plainToClass } from "class-transformer";
import { Usuario } from "src/database/core/usuario.entity";
import { DataSource } from "typeorm";
import { GetUsuarioQuery } from "./get-usuario.query";
import { UsuarioDto } from "./usuario-dto";

//Gera consulta
@QueryHandler(GetUsuarioQuery)
export class GetUsuarioHandler implements IQueryHandler<GetUsuarioQuery, UsuarioDto> {
    constructor(
        @InjectDataSource()
        private readonly dataSource: DataSource) {
    }
    async execute(query: GetUsuarioQuery): Promise<UsuarioDto> {
        const data = await this.dataSource.manager.find(Usuario, {
            where: { id: query.id },
        });


        if (!data.length) return null;
        return plainToClass(UsuarioDto, data[0]);
    }
}
