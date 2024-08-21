import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateTimeDto } from './dto/create-time.dto';
import { UpdateTimeDto } from './dto/update-time.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Time } from './entities/time.entity';
import { Repository } from 'typeorm';
import { Token } from 'types/Token';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { AtletaTimeService } from 'src/atleta_time/atleta_time.service';
import { create } from 'domain';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { Esporte } from 'src/esportes/entities/esporte.entity';

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
    private readonly usuarioService: UsuariosService
    ) {
    
  }
  async create(createTimeDto: CreateTimeDto, token: Token) {
    try{
      let Usuario = await this.usuarioService.getById(token.id);
      let esporte = await this.esporteRepository.findOne({where : { id: createTimeDto.esporte_id}})
      let time = this.timeRepository.create()
      
      time.dt_fundacao = createTimeDto.dt_fundacao;
      time.nome = createTimeDto.nome
      time.sigla = createTimeDto.sigla
      time.Usuario = Usuario;
      time.esporte = esporte;

      let novoTime = await this.timeRepository.save(time);


      await this.atletaTimeService.cadastrarAtletaAdmin(novoTime, Usuario)
      
      return { status: 200, message: 'Time criado com sucesso'}

    }catch(error){
      console.log("🚀 ~ TimesService ~ create ~ error:", error)
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
      let Time = await this.findTime(id);

      return { status: 200, message: Time}

    }catch(error){
      console.log(" ~ TimesService ~ findOne ~ error:", error)
      throw new BadRequestException('Não foi possível consultar o time')
    }
  }

  async update(id: number, updateTimeDto: UpdateTimeDto, token: Token) {
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



  async findTime(id: Number){
    try{
      const Time = await this.timeRepository.findOne({
        where: {
          id: id
        }
      })
    
      if(!Time) throw new NotFoundException('Nenhum time encontrado');

      return Time
    }catch(error){
      console.log(" ~ TimesService ~ findTime ~ error:", error)
      throw new BadRequestException('Não foi possível consultar o time')
    }
  }
}
