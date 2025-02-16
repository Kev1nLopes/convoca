import { PartialType, OmitType } from "@nestjs/swagger";
import { SignUpUsuarioDto } from "../signUp/create-usuario.dto";
import { IsOptional, IsString } from "class-validator";
import { Exclude } from "class-transformer";


export class UpdateUsuarioDto extends OmitType(PartialType(SignUpUsuarioDto), ['senha'] as const){
    @Exclude() 
    id: string

     @IsString()
     @IsOptional()
     cpf?: string;
   
     @IsString()
     @IsOptional()
     cep?: string;
   
     @IsString()
     @IsOptional()
     uf?: string;
   
     @IsString()
     @IsOptional()
     cidade?: string;
   
     @IsString()
     @IsOptional()
     bairro?: string;
    
}