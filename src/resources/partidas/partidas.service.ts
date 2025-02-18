import { BadRequestException, Injectable } from '@nestjs/common';
// import { CreatePartidaDto } from './dto/create-partida.dto';
// import { UpdatePartidaDto } from './dto/update-partida.dto';
import { InjectRepository } from '@nestjs/typeorm';
// import { Partida } from '../../database/core/partida.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PartidasService {
  constructor(
    // @InjectRepository(Partida)
    // private readonly partidaRepository: Repository<Partida>
  ) {
    
  }




  

  findOne(id: string) {

    try{

    }catch(error){
      console.log(" ~ PartidasService ~ create ~ error:", error)
      throw new BadRequestException('')
    }
  }

  update(id: string, updatePartidaDto: any) {
    try{

    }catch(error){
      console.log(" ~ PartidasService ~ create ~ error:", error)
      throw new BadRequestException('')
    }
  }

  remove(id: string) {
    try{

    }catch(error){
      console.log(" ~ PartidasService ~ create ~ error:", error)
      throw new BadRequestException('')
    }
  }
}
