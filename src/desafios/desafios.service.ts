import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateDesafioDto } from './dto/create-desafio.dto';
import { UpdateDesafioDto } from './dto/update-desafio.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Desafio, StatusDesafio } from './entities/desafio.entity';
import { Between, MoreThanOrEqual, Repository } from 'typeorm';
import { Time } from 'src/times/entities/time.entity';
import { Token } from 'types/Token';
import { time } from 'console';
import { PartidasService } from 'src/partidas/partidas.service';

@Injectable()
export class DesafiosService {
  /**
   *
   */
  constructor(
    @InjectRepository(Desafio)
    private readonly desafioRepository: Repository<Desafio>,
    @InjectRepository(Time)
    private readonly timeRepository: Repository<Time>,
    private readonly partidasService: PartidasService
  ) {}
  
  async cadastrarDesafio(createDesafioDto: CreateDesafioDto, token) {
    try{
      const TimeDesafiante = await this.timeRepository.findOne({
        where: {
          id: createDesafioDto.id_time_desafiante
        }
      })

      if(!TimeDesafiante) throw new NotFoundException('Time Desafiante não encontrado')

      const TimeDesafiado = await this.timeRepository.findOne({
        where: {
          id: createDesafioDto.id_time_desafiado
        }
      })

      if(!TimeDesafiado) throw new BadRequestException('Time Desafiado não encontrado')


      let desafio = await this.desafioRepository.findOne({
        select: [
          'datahora_desafio',
          'nome_campo',
          'status',
          'time_desafiante',
          'time_desafiado'
        ],
        where: [
          {time_desafiante: { id: createDesafioDto.id_time_desafiado}, time_desafiado: {id: createDesafioDto.id_time_desafiante }, status: StatusDesafio.Pendente},
          {time_desafiante: { id: createDesafioDto.id_time_desafiante}, time_desafiado: {id: createDesafioDto.id_time_desafiado }, status: StatusDesafio.Pendente},
        ],
        relations: [
          'time_desafiante',
          'time_desafiado'
        ]
      })

      if(desafio){
        return { status: 200, message: { message: 'As duas equipes ja possuem um desafio pendente', desafio: desafio}}
      }

      const NovoDesafio = await this.desafioRepository.create()
      NovoDesafio.time_desafiado     = TimeDesafiado
      NovoDesafio.time_desafiante    = TimeDesafiante
      NovoDesafio.nome_campo         = createDesafioDto.nome_campo
      NovoDesafio.status             = StatusDesafio.Pendente
      NovoDesafio.usuario_id         = token.id



      this.desafioRepository.save(NovoDesafio);


      return { status: 201, message: 'Desafio criado com sucesso!'}
      
    }catch(error){
      console.log(" ~ DesafiosService ~ desafiar ~ error:", error)
      throw new BadRequestException('Não foi possível criar um desafio')
    }

  }

  async buscarDesafios(id_time: number, status: string, data_inicio: Date, data_final: Date) {
    try{
      let whereStatus = {}
      if(status !== StatusDesafio.Todos || !status){
        whereStatus = {
          status: status
        }
      }


      let whereData = {}
      if(data_inicio && data_final){
        whereData = {
          datahora_desafio: Between(data_inicio, data_final)
        }
      }
      if(data_inicio && !data_final){
        whereData = {
          datahora_desafio: MoreThanOrEqual(data_inicio)
        }
      }



      const Desafios = await this.desafioRepository.find({
        where: [
          {time_desafiado: {id: id_time}, ...whereStatus, ...whereData},
          {time_desafiante: {id: id_time} , ...whereStatus, ...whereData},
        ]
      })


      return { status: 200, message: Desafios}
      
    }catch(error){
      console.log(" ~ DesafiosService ~ buscarTodos ~ error:", error)
      throw new BadRequestException('Não foi possível consultar seus desafios')
    }
  }


  async findOne(id: number) {
    try{
      const desafio = await this.desafioRepository.findOne({
        where: {
          id: id
        }
      })
      
      if(!desafio) throw new NotFoundException('Nenhum desafio encontrado')


      return { status: 200, message: desafio}

    }catch(error){
      console.log(" ~ DesafiosService ~ findOne ~ error:", error)
      throw new BadRequestException('Não foi possível consultar o desafio')
    }
  }

  async update(id: number, updateDesafioDto: UpdateDesafioDto, token: Token) {
    try{

      let desafio = await this.desafioRepository.findOne({
        where: {
          id: id,
        },
        relations: [
          'time_desafiado',
          'time_desafiante'
        ]
      })

      if(!desafio) throw new NotFoundException('Nenhum desafio encontrado')

      let TimeDesafiado = await this.timeRepository.findOne({
        where: {
          id: desafio.time_desafiado.id
        },
        relations: [
          'atletas'	
        ]
      })

      let TimeDesafiante = await this.timeRepository.findOne({
        where: {
          id: desafio.time_desafiante.id
        },
        relations: [
          'atletas'	
        ]
      })

      let findUserCargo = null;

      findUserCargo = TimeDesafiado.atletas.find(atleta => atleta.id === token.id && atleta.cargo === 'Admin')

      if(!findUserCargo){
        findUserCargo = TimeDesafiante.atletas.find(atleta => atleta.id === token.id && atleta.cargo === 'Admin')
        if(!findUserCargo){
          throw new NotFoundException('Voce não possui permissão para realizar esta tarefa')
        }
      }      

    
      for (const key of Object.keys(UpdateDesafioDto)) {
        if(Object.keys(desafio).includes(key)){
          desafio[key] = UpdateDesafioDto[key]
        }
      }

      let novoDesafio = await this.desafioRepository.save(desafio);
      if(desafio.status === StatusDesafio.Aceito) {
        await this.partidasService.create({
         id_desafio: novoDesafio.id 
        })
        return { status: 200, message: 'Partida criada com sucesso!'}
      }


      return { status: 200, message: 'Desafio atualizado com sucesso!'}
      
    }catch(error){
      console.log(" ~ DesafiosService ~ update ~ error:", error)
      throw new BadRequestException('Não foi possível atualizar os dados do desafio')
    }
  }



}
