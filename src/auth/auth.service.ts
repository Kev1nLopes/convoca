import { BadRequestException, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { User } from 'generated/prisma';
import * as jwt from 'jsonwebtoken'
import { PrismaService } from 'src/prisma.service';
import { compare, hash } from 'bcrypt';
import { signUpDto } from './dto/signUp.dto';
import { UserService } from 'src/user/user.service';
import { signInDto } from './dto/signIn.dto';
import { TokenPayload } from 'src/guard/jwt.guard';

@Injectable()
export class AuthService {

    @Inject() private readonly prisma: PrismaService;
    @Inject() private readonly userService: UserService;
    
    async signUp(signUpDto: signUpDto) {
  
      const findByEmail = await this.userService.findByEmail(signUpDto.email)
      if (findByEmail) throw new BadRequestException("Email já cadastrado")
  
      const password = await hash(signUpDto.password, 5)

      const token = this.createToken({
        email: signUpDto.email,
        name: signUpDto.name
      })

      const newUser = await this.prisma.user.create({
        data: {
          ...signUpDto,
          token: token,
          password: password,
        }
      })
      if (!newUser) throw new InternalServerErrorException("Não foi possível criar o usuário, entre em contato com o suporte!")

      const refreshToken = this.createRefreshToken(newUser.id)
  
      return {user: newUser, token: token, refreshToken: refreshToken};
    }
  

    async signIn(userDto: signInDto) {
      const user = await this.prisma.user.findUnique({ where: { email: userDto.email } })
      if (!user) throw new NotFoundException("Usuário nao encontrado")
  
      const passwordMatch = await compare(userDto.password, user.password)
      if (!passwordMatch) throw new BadRequestException("Senha incorreta")
  
      const token = this.createToken(user)
      const refreshToken = this.createRefreshToken(user.id)
      return { token: token, refreshToken: refreshToken }
    }

    async refreshToken(refreshToken: string){
      const tokenPayload = this.decodeRefreshToken(refreshToken)
      if(!tokenPayload || !tokenPayload.id) throw new BadRequestException("Token inválido")

      const user = await this.userService.findOne(tokenPayload.id)
      if(!user) throw new BadRequestException("Token inválido")

      const token = this.createToken(user)
      const newRefreshToken = this.createRefreshToken(user.id)

      return { token: token, refreshToken: newRefreshToken }
    }

    async logout(id: string){
      try{
        await this.prisma.user.update({ where: { id }, data: { token: '' } })
        return { message: "Deslogado com sucesso!" }
      }catch(error){
        throw new BadRequestException('Erro ao deslogar')
      }
    }
  
    createToken(user: Omit<User, "password" | "id" | "token" | "birthdate">) {
      return jwt.sign({ email: user.email, name: user.name }, process.env.JWT_SECRET as string, { expiresIn: "1d" })
    }

    createRefreshToken(id: string) {
      return jwt.sign({ id }, process.env.JWT_REFRESH_TOKEN as string, { expiresIn: "30d" })
    }

    decodeToken(token: string){
      jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded: TokenPayload) => {
        if(err) throw new BadRequestException("Token inválido")
        return decoded
      })
    }

    decodeRefreshToken(token: string): any{
      jwt.verify(token, process.env.JWT_REFRESH_TOKEN as string, (err, decoded: {id: string}) => {
        if(err) throw new BadRequestException("Token inválido")
        return decoded
      })

    }

    // async function refreshToken(refreshToken: string) {
    //   const tokenPayload = this.decodeToken(refreshToken)
    //   const validAccessToken = this.validad
    // }

}
