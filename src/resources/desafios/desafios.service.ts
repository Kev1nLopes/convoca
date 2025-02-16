import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateDesafioDto } from './dto/create-desafio.dto';
import { UpdateDesafioDto } from './dto/update-desafio.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Desafio, StatusDesafio } from '../../database/core/desafio.entity';
import { Between, MoreThanOrEqual, Repository } from 'typeorm';
import { Time } from 'src/database/core/time.entity';
import { Token } from 'types/Token';
import { time } from 'console';
import { PartidasService } from 'src/resources/partidas/partidas.service';
import * as moment from 'moment-timezone';

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
          // id: createDesafioDto.id_time_desafiante,
          ativo: true,
        }
      })

      if(!TimeDesafiante) return {status: 404, message: 'Time Desafiante não encontrado'}

      const TimeDesafiado = await this.timeRepository.findOne({
        where: {
          // id: createDesafioDto.id_time_desafiado,
          ativo: true
        }
      })

      if(!TimeDesafiado) return { status: 404, message: 'Time Desafiado não encontrado'}


      let desafio = await this.desafioRepository.findOne({
        select: [
          'id',
          'datahora_desafio',
          'nome_campo',
          'status',
          'time_desafiante',
          'time_desafiado'
        ],
        where: [
          // {time_desafiante: { id: createDesafioDto.id_time_desafiado}, time_desafiado: {id: createDesafioDto.id_time_desafiante }, status: StatusDesafio.Pendente},
          // {time_desafiante: { id: createDesafioDto.id_time_desafiante}, time_desafiado: {id: createDesafioDto.id_time_desafiado }, status: StatusDesafio.Pendente},
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
      NovoDesafio.datahora_desafio   = createDesafioDto.datahora_desafio
      NovoDesafio.datahora_cricao_desafio = new Date()
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
      if(!Object.keys(StatusDesafio).includes(status)){
        whereStatus = {
          status: status
        }
      }
      console.log("🚀 ~ DesafiosService ~ buscarDesafios ~ whereStatus:", whereStatus)
      let whereData: any = {
        data_inicio: moment().subtract(30, "days").startOf('day').tz("America/Sao_Paulo").format("YYYY-MM-DDT00:00:00.000"),
        data_final: moment().endOf('day').tz("America/Sao_Paulo").toISOString()
      };
      
      if (data_final) {
        whereData.data_inicio = moment(data_final).subtract(30, "days").startOf('day').tz("America/Sao_Paulo").format("YYYY-MM-DDT00:00:00.000");
        whereData.data_final = moment(data_final).endOf('day').tz("America/Sao_Paulo").toISOString();
      }
      
      if (data_inicio) {
        whereData.data_inicio = moment(data_inicio).startOf('day').tz("America/Sao_Paulo").format("YYYY-MM-DDT00:00:00.000");
      }
      
      if (data_inicio && data_final) {
        whereData.data_inicio = moment(data_inicio).startOf('day').tz("America/Sao_Paulo").format("YYYY-MM-DDT00:00:00.000");
        whereData.data_final = moment(data_final).endOf('day').tz("America/Sao_Paulo").toISOString();
      }
      
      console.log("🚀 ~ DesafiosService ~ buscarDesafios ~ whereData:", whereData)
      // const Desafios = await this.desafioRepository.find({
      //   where: [
      //     {time_desafiado: {id: id_time}, ...whereStatus, ...whereData},
      //     {time_desafiante: {id: id_time} , ...whereStatus, ...whereData},
      //   ]
      // })

      const Desafios = await this.desafioRepository.createQueryBuilder("desafio")
      .leftJoin("desafio.time_desafiante", "time_desafiante")
      .leftJoin("desafio.time_desafiado", "time_desafiado")
      .where(status ? "desafio.status = :status" : "1=1", whereStatus )
      .andWhere(data_final && data_inicio 
        ? "desafio.datahora_desafio  BETWEEN :data_inicio AND :data_final"
        : "1=1", whereData
      )
      .getMany()
      
      console.log("🚀 ~ DesafiosService ~ buscarDesafios ~ Desafios:", Desafios)

      return { status: 200, message: Desafios}
      
    }catch(error){
      console.log(" ~ DesafiosService ~ buscarTodos ~ error:", error)
      throw new BadRequestException('Não foi possível consultar seus desafios')
    }
  }


  async findOne(id: string) {
    try{
      const desafio = await this.desafioRepository.findOne({
        where: {
          id: id
        },
        relations: [
          'time_desafiado',
          'time_desafiante'
        ]
      })
      
      if(!desafio) throw new HttpException('Nenhum desafio encontrado', HttpStatus.NOT_FOUND)


      return { status: 200, message: desafio}

    }catch(error){
      if(error instanceof HttpException){
        throw error
      }
      console.log(" ~ DesafiosService ~ findOne ~ error:", error)
      throw new BadRequestException('Não foi possível consultar o desafio')
    }
  }

  async update(id: string, updateDesafioDto: UpdateDesafioDto, token: Token) {
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

      if(!desafio) throw new HttpException('Nenhum desafio encontrado', HttpStatus.NOT_FOUND)

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

    
      for (const key of Object.keys(updateDesafioDto)) {
        if(Object.keys(desafio).includes(key)){
          desafio[key] = updateDesafioDto[key]
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
