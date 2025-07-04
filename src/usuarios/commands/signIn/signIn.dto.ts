import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, isEmail } from "class-validator";


export class signInDto{

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail({}, {message: 'E-mail inválido'})
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  senha: string;

}