import { Injectable } from '@nestjs/common';


@Injectable()
export class ConvitesService {
  // create(createConviteDto: CreateConviteDto) {
  //   return 'This action adds a new convite';
  // }

  findAll() {
    return `This action returns all convites`;
  }

  findOne(id: number) {
    return `This action returns a #${id} convite`;
  }

  // update(id: number, updateConviteDto: UpdateConviteDto) {
  //   return `This action updates a #${id} convite`;
  // }

  remove(id: number) {
    return `This action removes a #${id} convite`;
  }
}
