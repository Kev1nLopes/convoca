import { BadRequestException, HttpException, HttpStatus, Injectable,  NotFoundException,  UnauthorizedException } from '@nestjs/common';
import { CreateTimeDto } from './dto/create-time.dto';
import { UpdateTimeDto } from './dto/update-time.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Time } from '../database/core/time.entity';
import { Repository } from 'typeorm';
import { Token } from 'types/Token';
import { Usuario } from 'src/database/core/usuario.entity';
import { AtletaTimeService } from 'src/resources/atleta_time/atleta_time.service';
import { create } from 'domain';
// import { UsuariosService } from 'src/usuarios/usuarios.service';
import { Esporte } from 'src/database/core/esporte.entity';

@Injectable()
export class TimesService {

  /**
   *
   */
  constructor(
    @InjectRepository(Time)
    private readonly timeRepository: Repository<Time>,
    @InjectRepository(Esporte)
    private readonly esporteRepository: Repository<Esporte>,
    private atletaTimeService: AtletaTimeService,
    // private readonly usuarioService: UsuariosService
    ) {
    
  }
  async create(createTimeDto: CreateTimeDto, token: Token) {
    try{
      // let Usuario = await this.usuarioService.getById(token.id);
      let esporte = await this.esporteRepository.findOne({where : { id: createTimeDto.esporte_id}})
      if(!esporte) throw new HttpException('Nenhum esporte encontrado', HttpStatus.NOT_FOUND)
      let time = this.timeRepository.create()
      
      
      time.dt_fundacao = createTimeDto.dt_fundacao;
      time.nome = createTimeDto.nome
      time.sigla = createTimeDto.sigla
      // time.Usuario = Usuario;
      // time.esporte = esporte;

      let novoTime = await this.timeRepository.save(time);


      // await this.atletaTimeService.cadastrarAtletaAdmin(novoTime, Usuario)
      
      return 'Time criado com sucesso'

    }catch(error){
      if (error instanceof HttpException) {
        throw error;
      }
      throw new BadRequestException('Não foi possível criar um time')
    }
  }


  async buscarTimes() {
    try{
      let times = await this.timeRepository.find();

      return { status: 200, message: times}
    }catch(error){
      throw new BadRequestException('Não foi possível buscar os times')
    }
  }


  async findOne(id: string) {
    try{
      let Time = await this.findTime(id);

      if(!Time) throw new HttpException('Nenhum time encontrado', HttpStatus.NOT_FOUND)

      return { status: 200, message: Time}

    }catch(error){
      console.log(" ~ TimesService ~ findOne ~ error:", error)
      if(error instanceof HttpException){
        throw error
      }
      throw new BadRequestException('Não foi possível consultar o time')
    }
  }

  async update(id: string, updateTimeDto: UpdateTimeDto, token: Token) {
    try{

      let Time = await this.findTime(id);

      await this.atletaTimeService.verificarPermissaoAdmin(Time.id, token.id)

      for (const key of Object.keys(updateTimeDto)) {
        if(Object.keys(Time).includes(key)){
          Time[key] = updateTimeDto[key]
        }
      }

      this.timeRepository.save(Time);

      return {status: 200, message: 'Time atualizado com sucesso!'}

    }catch(error){
      console.log("~ TimesService ~ update ~ error:", error)
      throw new BadRequestException('Não foi possível atualizar o time')
      

    }
  }
  async remove(id: string, token: Token) {
    try{
      const Time = await this.timeRepository.findOne({
        where: {
          id: id
        }
      })

      if(!Time || !Time.ativo) return { status: 404, message: 'Nenhum time encontrado'}

      await this.atletaTimeService.verificarPermissaoAdmin(Time.id, token.id)

      Time.ativo = false;

      this.timeRepository.save(Time)


      return { status: 200, message: 'Time deletado com sucesso!'}
      

    }catch(error){
      console.log(" ~ TimesService ~ remove ~ error:", error)
      throw new BadRequestException('Não foi possível deletar o time')
    }
  }


  // Com atletas
  async findTime(id: string){
    try{
      // const Time = await this.timeRepository.findOne({
      //   where: {
      //     id: id
      //   },
      //   relations: ['atletas', 'atletas.usuario']
      // })
      const Time = await this.timeRepository
      .createQueryBuilder('time')
      .leftJoinAndSelect('time.atletas', 'atletas')
      .leftJoinAndSelect('atletas.usuario', 'usuario')
      .where('time.id = :id', {id: id})
      .select([
        'time.id',
        'time.nome',
        'usuario.id',
        'usuario.nome',
        'usuario.data_nasc',
        'atletas.cargo',
      ]).getOne();

      

      if(!Time) throw new HttpException('Nenhum time encontrado', HttpStatus.NOT_FOUND);

      return Time
    }catch(error){
      console.log(" ~ TimesService ~ findTime ~ error:", error instanceof HttpException)
      if (error instanceof HttpException) {
        throw error;
      }else{
        throw new BadRequestException('Não foi possível consultar o time')
      }
    }
  }
}
