import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateTimeDto } from './dto/create-time.dto';
import { UpdateTimeDto } from './dto/update-time.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Time } from './entities/time.entity';
import { Repository } from 'typeorm';
import { Token } from 'types/Token';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { AtletaTimeService } from 'src/atleta_time/atleta_time.service';

@Injectable()
export class TimesService {

  /**
   *
   */
  constructor(
    @InjectRepository(Time)
    private readonly timeRepository: Repository<Time>,
    private atletaTimeService: AtletaTimeService
    ) {
    
  }
  async create(createTimeDto: CreateTimeDto, token: Token) {
    try{
      let time = this.timeRepository.create()
      
      for (const key of Object.keys(createTimeDto)) {
        if(Object.keys(time).includes(key)){
          time[key] = createTimeDto[key]
        }
      }

      time.fundador_id = token.id

      this.timeRepository.save(time);


      await this.atletaTimeService.cadastrarAtleta({time_id: time.id, usuario_id: token.id}, token, true)
      
      return { status: 200, message: 'Time criado com sucesso'}

    }catch(error){
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


  async findOne(id: number) {
    try{
      const Time = await this.timeRepository.findOne({
        where: {
          id: id
        }
      })

      if(!Time) throw new NotFoundException('Não foi possível consultar o time')


      return { status: 200, message: Time}

    }catch(error){
      console.log(" ~ TimesService ~ findOne ~ error:", error)
      throw new BadRequestException('Não foi possível consultar o time')
    }
  }

  async update(id: number, updateTimeDto: UpdateTimeDto, token: Token) {
    try{

      const Time = await this.timeRepository.findOne({
        where: {
          id: id
        }
      })
    
      if(!Time) throw new NotFoundException('Nenhum time encontrado');

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
  async remove(id: number, token: Token) {
    try{
      const Time = await this.timeRepository.findOne({
        where: {
          id: id
        }
      })

      if(!Time) throw new NotFoundException('Nenhum time encontrado')

      await this.atletaTimeService.verificarPermissaoAdmin(Time.id, token.id)

      if(!Time.ativo) throw new NotFoundException('Nenhum time encontrado')

      Time.ativo = false;

      this.timeRepository.save(Time)


      return { status: 200, message: 'Time deletado com sucesso!'}
      

    }catch(error){
      console.log(" ~ TimesService ~ remove ~ error:", error)
      throw new BadRequestException('Não foi possível deletar o time')
    }
  }
}
