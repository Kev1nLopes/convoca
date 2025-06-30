import { BadRequestException, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import { User } from 'generated/prisma';
import * as jwt from "jsonwebtoken"

@Injectable()
export class UserService {

  @Inject()
  private readonly prisma: PrismaService



  createToken(user: Omit<User, "password">) {
    return jwt.sign({ email: user.email, id: user.id, name: user.name }, process.env.JWT_SECRET as string, { expiresIn: "1d" })
  }
  findAll() {
    return `This action returns all user`;
  }

  async findOne(id: string) {
    return  this.prisma.user.findUnique({ where: { id }, select: { id: true, name: true, email: true, birthdate: true }})
    
  }

  async findByEmail(email: string) {
    return  this.prisma.user.findUnique({ where: { email: email },  select: { id: true, name: true, email: true, birthdate: true } })

  }
  async update(id: string, updateUserDto: UpdateUserDto) {
    // Criar interceptor, um usuário só pode alterar o id dele mesmo
    const findUser = this.prisma.user.findUnique({ where: { id } })
    if (!findUser) throw new BadRequestException("Usuário nao encontrado")

    return this.prisma.user.update({ where: { id }, data: updateUserDto })

  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
