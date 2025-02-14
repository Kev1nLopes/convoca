import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateConviteDto } from './dto/create-convite.dto';
import { UpdateConviteDto } from './dto/update-convite.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Convite, StatusConvite, TipoConvite } from '../../database/core/convite.entity';
import { Repository } from 'typeorm';
import { Token } from 'types/Token';
import { AtletaTimeService } from 'src/resources/atleta_time/atleta_time.service';
import { isThisWeek } from 'date-fns';

@Injectable()
export class ConvitesService {

  constructor(
    @InjectRepository(Convite)
    private readonly conviteRepository: Repository<Convite>,
    private readonly AtletaTimeService: AtletaTimeService
  ) {

    
  }
  async create(createConviteDto: CreateConviteDto, token: Token) {
    try{

      if(createConviteDto.tipo_convite == TipoConvite.Time){
        this.AtletaTimeService.verificarPermissaoAdmin(createConviteDto.time_id, token.id)
        // Verificar se ele não está enviando convite para ele mesmo
        if(createConviteDto.usuario_id == token.id){
          throw new BadRequestException('Você não pode se convidar para o time')
        }
      }

      this.AtletaTimeService.verificarParticipacaoTime(createConviteDto.usuario_id, createConviteDto.time_id);

      const novoConvite = this.conviteRepository.create();

      for (const key of Object.keys(createConviteDto)) {
        if(Object.keys(novoConvite).includes(key)){
          novoConvite[key] = createConviteDto[key];
        }
      }

      novoConvite.status = StatusConvite.Pendente

      await this.conviteRepository.save(novoConvite);

      return { status: 200, message: 'Convite enviado com sucesso'}

    }catch(error){
      console.log(" ~ ConvitesService ~ create ~ error:", error)
      throw new BadRequestException('Não foi possível enviar o convite');
    }
  }

  async findAll(token: Token) {
    try{

      const Convites = await this.conviteRepository.find({
        where: {
          usuario: {
            id: token.id
          }
        }
      })
      
      return { status: 200, Convites }


    }catch(error){
      console.log(" ~ ConvitesService ~ findAll ~ error:", error)
      throw new BadRequestException('Não foi possível consultar os convites')
    }
  }

  async findOne(id: number) {
    try{
      
      let Convite = await this.findConvite(id)

      return { status: 200, message: Convite}
    }catch(error){
      console.log("🚀 ~ ConvitesService ~ findOne ~ error:", error)
      throw new BadRequestException('Não foi possível consultar o convite')
      
    }
  }

  async update(id: number, updateConviteDto: UpdateConviteDto) {
    try{

      const Convite = await this.findConvite(id);


      for (const key of Object.keys(updateConviteDto)) {
        if(Object.keys(Convite).includes(key)){
          Convite[key] = updateConviteDto[key];
        }
      }

      if(Convite.status = StatusConvite.Aceito){
        // let { time } =await this.AtletaTimeService.cadastrarAtleta({time_id: Convite.time.id, usuario_id: Convite.usuario.id})
        // return { status: 200, message: `Agora você é o novo integrante do ${time.nome}`}
      }

      return { status: 200, message: 'Convite atualizado com sucesso'}

    }catch(error){
      console.log(" ~ ConvitesService ~ update ~ error:", error)
      throw new BadRequestException('Não foi possível atualizar o convite')
    }
  }

  async remove(id: number) {
    try{

      const Convite = await this.findConvite(id);

      Convite.status = StatusConvite.Negado;

      await this.conviteRepository.save(Convite);

      return { status: 200, message: 'Convite negado com sucesso'}
      
    }catch(error){
      console.log(" ~ ConvitesService ~ remove ~ error:", error)
      throw new BadRequestException('Não foi possível remover o convite')
    }
  }


  async findConvite(id: number){

    const Convite = await this.conviteRepository.findOne({
      where: {
        id: id
      }
    })


    if(!Convite) throw new BadRequestException('Nenhum convite encontrado')

    return Convite;
  }
}
