import { PartialType } from '@nestjs/swagger';
import { CreateHistAtletaTimeDto } from './create-hist_atleta_time.dto';

export class UpdateHistAtletaTimeDto extends PartialType(CreateHistAtletaTimeDto) {}
