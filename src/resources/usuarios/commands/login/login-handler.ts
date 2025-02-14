import { IQueryHandler } from "@nestjs/cqrs";
import { LoginQuery } from "./login-query";
import { LoginDto } from "./login-dto";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { Usuario } from "src/database/core/usuario.entity";
import { compare } from "bcrypt";
import { JWTUtil } from "utils/jwt-util";



export class LoginHandler implements IQueryHandler<LoginQuery, LoginDto>{
    constructor(
        @InjectDataSource()
        private readonly dataSource: DataSource,
        private readonly jwtUtil: JWTUtil
    ){}
    
    async execute(query: LoginQuery): Promise<LoginDto> {
        const data = await this.dataSource.manager.find(Usuario, {
            where: {
                email: query.email
            }
        })

        if(!data.length) return null

        let match = await compare(query.senha, data[0].senha.valueOf())

        if(!match) return null

        let token = this.jwtUtil.GenerateToken(data[0])

    }
    

}