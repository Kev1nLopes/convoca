import { BadRequestException, Req } from "@nestjs/common";



export class Util {


  getSchema(@Req() req){
    const schema = req.headers['x-schema']
    if(!schema) throw new BadRequestException('esporte não informado!')
    return schema;
    
  }
}