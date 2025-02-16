import { Usuario } from "src/database/core/usuario.entity";
import * as jwt from 'jsonwebtoken';
import { BadRequestException, HttpException, HttpStatus } from "@nestjs/common";
import { Token } from "types/Token";



export class JWTUtil {

  GenerateToken(Usuario: Usuario): string {

    let token = jwt.sign(
      {
        id: Usuario.id,
        nome: Usuario.nome
      }, 
      process.env.PRIVATE_KEY, {
      expiresIn: '30d'
    })

    return token
  }

  verifyToken(token: string){
    try {
      const decoded = jwt.verify(token, process.env.PRIVATE_KEY);
      return decoded;
    } catch (err)  {
      if (err.name as string === 'TokenExpiredError') {
        throw new BadRequestException(
          'Token expirado',
          { cause: err, description: 'Token expirado' }
        );
      } else {
        throw new BadRequestException(
          'Token Inválido',
          { cause: err, description: 'Erro ao verificar o token' }
        );
      }
    }
  
  }

  getDadosToken(req: Request): Token{
    if(!req.headers['authorization']) throw new HttpException('Token inválido', HttpStatus.BAD_REQUEST);
    let token = req.headers['authorization'].replace('Bearer ', '');
    const decodedToken = this.verifyToken(token);
    return decodedToken as Token;
  }
}