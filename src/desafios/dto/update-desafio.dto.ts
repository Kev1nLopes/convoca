import { PartialType } from '@nestjs/swagger';
import { CreateDesafioDto } from './create-desafio.dto';

export class UpdateDesafioDto extends PartialType(CreateDesafioDto) {}
