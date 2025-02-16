import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class SignUpUsuarioDto {


  @ApiProperty()
  @IsNotEmpty({message: 'Informe um nome'})
  @MinLength(3, { message: 'Informe um nome válido'})
  @IsString()
  nome: string;

  @ApiProperty()
  @IsNotEmpty({message: 'Informe uma senha'})
  @MinLength(8, {message: 'Sua senha deve ter no minimo 8 caracteres'})
  senha: string;

  @ApiProperty()
  @IsNotEmpty({message: 'Informe um e-mail'})
  @IsEmail({}, {message: 'Informe um e-mail valido'})
  email: string;

  @ApiProperty({example: '2002-01-18'})
  @IsNotEmpty({message: 'Informe a data de nascimento'})
  data_nasc: Date;
}
