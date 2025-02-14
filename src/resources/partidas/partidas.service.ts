import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePartidaDto } from './dto/create-partida.dto';
import { UpdatePartidaDto } from './dto/update-partida.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Partida } from '../../database/core/partida.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PartidasService {
  constructor(
    @InjectRepository(Partida)
    private readonly partidaRepository: Repository<Partida>
  ) {
    
  }
  async create(createPartidaDto: CreatePartidaDto) {
    try{
      let partida = this.partidaRepository.create()
      partida.id_desafio = createPartidaDto.id_desafio;

      this.partidaRepository.save(partida)

      

    }catch(error){
      console.log(" ~ PartidasService ~ create ~ error:", error)
      throw new BadRequestException('Não foi possível criar a partida, contate um admin')
    }
  }

  findAll() {
    try{
      let Partidas = this.partidaRepository.find({
      })

      

    }catch(error){
      console.log(" ~ PartidasService ~ create ~ error:", error)
      throw new BadRequestException('')
    }

  }

  

  findOne(id: number) {

    try{

    }catch(error){
      console.log(" ~ PartidasService ~ create ~ error:", error)
      throw new BadRequestException('')
    }
  }

  update(id: number, updatePartidaDto: UpdatePartidaDto) {
    try{

    }catch(error){
      console.log(" ~ PartidasService ~ create ~ error:", error)
      throw new BadRequestException('')
    }
  }

  remove(id: number) {
    try{

    }catch(error){
      console.log(" ~ PartidasService ~ create ~ error:", error)
      throw new BadRequestException('')
    }
  }
}
