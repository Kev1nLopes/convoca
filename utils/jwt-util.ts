import { Usuario } from "src/usuarios/entities/usuario.entity";
import * as jwt from 'jsonwebtoken';
import { BadRequestException } from "@nestjs/common";
import { Token } from "types/Token";



export class JWTUtil {

  static GenerateToken(Usuario: Usuario): string {

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

  static verifyToken(token: string){
    try {
      const decoded = jwt.verify(token, process.env.PRIVATE_KEY);
      return decoded;
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
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

  static getDadosToken(req: Request): Token{
    let token = req.headers['Authorization'];
    const decodedToken = this.verifyToken(token);
    return decodedToken as Token;
  }
}