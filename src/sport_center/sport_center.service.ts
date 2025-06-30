import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSportCenterDto } from './dto/create-sport_center.dto';
import { UpdateSportCenterDto } from './dto/update-sport_center.dto';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class SportCenterService {
  @Inject()
  private readonly prismaService: PrismaService
  async create(createSportCenterDto: CreateSportCenterDto, user_id: string) {
    const owner = {
      connect: {
        id: user_id,
      },
    };
    

    const newCenter = await this.prismaService.sportCenter.create({
      data: {
        ...createSportCenterDto,
        logo_url: '',
        owner
      }
    })

    if(!newCenter) throw new BadRequestException('Não foi possível criar o centro desportivo')
    return newCenter
  }

  async findAll() {
    return this.prismaService.sportCenter.findMany()
  }

  async findOne(id: string) {
    let sportCenter = await this.prismaService.sportCenter.findFirst({ where: {id: id} })
    if(!sportCenter) throw new NotFoundException('Nenhum centro desportivo encontrado')
    return sportCenter
  }

  async update(id: string, updateSportCenterDto: UpdateSportCenterDto) {
    await this.findOne(id)

    let sportCenter = await this.prismaService.sportCenter.update({
      where: { id },
      data: updateSportCenterDto
    })
    if(!sportCenter) throw new NotFoundException('Não foi possível atualizar o centro desportivo')
    return sportCenter

  }

  // TODO: Desativar centro desportivo, desativa os campos associados
  // remove(id: number) {
  //   return `This action removes a #${id} sportCenter`;
  // }
}
