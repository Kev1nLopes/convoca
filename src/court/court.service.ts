import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCourtDto } from './dto/create-court.dto';
import { UpdateCourtDto } from './dto/update-court.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CourtService {

  @Inject()
  private readonly prisma: PrismaService
  async create(createCourtDto: CreateCourtDto) {
    const newCourt = await this.prisma.court.create({
      data: {
        ...createCourtDto,
        active: true
      }
    })
    if(!newCourt) {
      throw new BadRequestException("Nao foi possivel criar o campo")
    }
    return newCourt
  }

  // findAll() {
  //   return `This action returns all court`;
  // }

  async findAllBySportCenter(id: string){
    return this.prisma.court.findMany({where: {sportCenterId: id}})
  }

  async findOne(id: string) {
    const court = await this.prisma.court.findFirst({where: {id}})
    if(!court) throw new NotFoundException("Nenhum campo encontrado")
    return court
  }

  async update(id: string, updateCourtDto: UpdateCourtDto) {
    // Verifica se existe
    await this.findOne(id)

    const updatedCourt = await this.prisma.court.update({ where: { id }, data: updateCourtDto })
    if(!updatedCourt) throw new BadRequestException("Nao foi possivel atualizar o campo")
    return updatedCourt
  }

  async disable(id: string) {
    await this.findOne(id)
    const deletedCourt = await this.prisma.court.update({ where: { id }, data: { active: false } })
    if(!deletedCourt) throw new BadRequestException("Nao foi possivel desativar o campo")
    return deletedCourt
  }
}
