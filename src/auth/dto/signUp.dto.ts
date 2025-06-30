import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsEmail, IsNotEmpty, IsString } from "class-validator";
import { Prisma } from "generated/prisma";

export class signUpDto implements Omit<Prisma.UserCreateInput, "token" | 'bookings' | 'courts' | 'voleiPlayers' | 'futebolPlayers'> {

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;


  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  birthdate: Date;
}
