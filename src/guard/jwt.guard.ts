import { BadRequestException, CanActivate, ExecutionContext, Inject } from "@nestjs/common";
import { Observable } from "rxjs";
import { Request } from 'express';
import * as jwt from 'jsonwebtoken'
import { UserService } from "src/user/user.service";
import { User } from "generated/prisma";


export interface CustomRequest extends Request {
  user: {id: string};
}

export type TokenPayload = {
  email: string
  name: string
}

export class JwtAuthGuard implements CanActivate{

  @Inject()
  private readonly UserService: UserService
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
      const request = context.switchToHttp().getRequest<CustomRequest>();
      const authHeader = request.headers.authorization;

      if(!authHeader || authHeader.split(' ')[1] !== 'Bearer'){
        throw new BadRequestException("Token ausente ou inválido")
      }

      const token = authHeader.split(' ')[1];
     
      jwt.verify(token, process.env.JWT_SECRET as string, async (error, decoded: TokenPayload) => {
        let user = await this.UserService.findByEmail(decoded.email);
        if(!user) throw new BadRequestException("Token inválido")
        request.user = {id: user.id};

      });




      return true


  }
}