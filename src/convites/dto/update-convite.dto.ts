import { PartialType } from '@nestjs/swagger';
import { CreateConviteDto } from './create-convite.dto';

export class UpdateConviteDto extends PartialType(CreateConviteDto) {}
