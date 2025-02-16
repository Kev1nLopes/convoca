import { Injectable } from '@nestjs/common';
import { CreateHistAtletaTimeDto } from './dto/create-hist_atleta_time.dto';
import { UpdateHistAtletaTimeDto } from './dto/update-hist_atleta_time.dto';

@Injectable()
export class HistAtletaTimeService {
  create(createHistAtletaTimeDto: CreateHistAtletaTimeDto) {
    return 'This action adds a new histAtletaTime';
  }

  findAll() {
    return `This action returns all histAtletaTime`;
  }

  findOne(id: string) {
    return `This action returns a #${id} histAtletaTime`;
  }

  update(id: string, updateHistAtletaTimeDto: UpdateHistAtletaTimeDto) {
    return `This action updates a #${id} histAtletaTime`;
  }

  remove(id: string) {
    return `This action removes a #${id} histAtletaTime`;
  }
}
