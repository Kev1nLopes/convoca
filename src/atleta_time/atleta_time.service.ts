import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateAtletaTimeDto } from './dto/create-atleta_time.dto';
import { UpdateAtletaTimeDto } from './dto/update-atleta_time.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AtletaTime } from './entities/atleta_time.entity';
import { Time } from 'src/times/entities/time.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { Token } from 'types/Token';

@Injectable()
export class AtletaTimeService {


  /**
   *
   */
  constructor(
    @InjectRepository(AtletaTime)
    private readonly atletaTimeRepository: Repository<AtletaTime>,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    @InjectRepository(Time)
    private readonly timeRepository: Repository<Time>,
  ) {
    
    
  }
  async cadastrarAtleta(createAtletaTimeDto: CreateAtletaTimeDto, token: Token, isAdmin: boolean){
    try{

      let time = await this.timeRepository.findOne({
        where: {
          id: createAtletaTimeDto.time_id
        },
      }) 

      if(!time) throw new NotFoundException('Nenhum time encontrado');
      
      await this.verificarPermissaoAdmin(time.id, token.id)

      let Atleta = await this.usuarioRepository.findOne({
        where: {
          id:  createAtletaTimeDto.usuario_id
        }
      })

      if(!Atleta) throw new NotFoundException('Nenhum atleta encontrado');



      let jaFazParteDoTime = await this.atletaTimeRepository.findOne({
        where: {
          time_id: time.id,
          usuario_id: Atleta.id
        }
      })

      if(jaFazParteDoTime) throw new BadRequestException('Esse atleta ja faz parte do time');

      let atletaTime = this.atletaTimeRepository.create()

      atletaTime.cargo = isAdmin ? 'Admin' : 'Atleta';
      atletaTime.time = time;
      atletaTime.usuario = Atleta;
      
      await this.atletaTimeRepository.save(atletaTime);

      return { status: 200, message: 'Atleta adicionado com sucesso'}

    }catch(error){
      console.log(" ~ AtletaTimeService ~ cadastrarAtleta ~ error:", error)
      throw new BadRequestException('Não foi possível adicionar o usuário')
    }
  }

  async buscarAtletas(timeId: Number) {
    try{

      let Atletas = await this.atletaTimeRepository.find({
        where: {
          time_id: timeId
        },
        relations: [
          'usuario'
        ]
      })

      return { status: 200, message: Atletas}
    }catch(error){
      console.log(" ~ AtletaTimeService ~ findAll ~ error:", error)
      throw new BadRequestException('Não foi possível consultar os atletas do time')
    }
  }

  async update(updateAtletaTimeDto: UpdateAtletaTimeDto, token: Token) {
    try{
      await this.verificarPermissaoAdmin(updateAtletaTimeDto.time_id, token.id)

      let atleta = await this.atletaTimeRepository.findOne({
        where:{
          time_id: updateAtletaTimeDto.time_id,
          usuario_id: updateAtletaTimeDto.usuario_id
        }
      })

      if(!atleta) throw new NotFoundException('Nenhuma atleta encontrado')

      atleta.cargo = updateAtletaTimeDto.cargo;

      await this.atletaTimeRepository.save(atleta)

      return { status: 200, message: 'Atleta atualizado com sucesso'}
      

    }catch(error){
      console.log("~ AtletaTimeService ~ update ~ error:", error)
      throw new BadRequestException('Não foi possível atualizar o cargo do atleta')
    }

  }

  remove(id: number) {
    return `This action removes a #${id} atletaTime`;
  }

  /**
   * * Verifica se o usuário possui permissão de administrador do time
   * @param time_id 
   * @param user_id 
   * @returns 
   */
  async verificarPermissaoAdmin(time_id, user_id){
    let usuario = await this.atletaTimeRepository.findOne({
      where: {
        time_id: time_id,
        usuario_id: user_id
      }
    })
    // Se o usuário não pertencer ao time ou não ter cargo Admin
    if(!usuario || usuario.cargo != 'Admin') throw new UnauthorizedException('Você não pode realizar está ação');
    
    return
  }


  async getAtletaTimes(usuario_id: Number){
    try{
      let Atleta = await this.atletaTimeRepository.find({
        where: {
          usuario_id: usuario_id
        },
        relations: [
          'time'
        ]
      })


      if(!Atleta) throw new NotFoundException('Nenhum atleta encontrado');

      const Times = Atleta.map(atleta => atleta.time)

      return { status: 200, message: Times}

    }catch(error){
      throw new BadRequestException('Não foi possível consultar os times do atleta')
    }
  }


}
