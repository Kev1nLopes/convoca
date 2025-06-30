import { PartialType } from '@nestjs/swagger';
import { CreateSportCenterDto } from './create-sport_center.dto';

export class UpdateSportCenterDto extends PartialType(CreateSportCenterDto) {}
