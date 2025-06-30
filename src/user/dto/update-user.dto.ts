import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsDateString, IsNotEmpty, IsString } from 'class-validator';
import { Prisma } from 'generated/prisma';

export class UpdateUserDto implements Omit<Prisma.UserCreateInput, 'id' | 'password' | 'token' | 'bookings' | 'courts' | 'voleiPlayers' | 'futebolPlayers'> {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  birthdate: Date;
}
