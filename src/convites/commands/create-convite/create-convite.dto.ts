import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { StatusConvite } from "src/database/core/convite.entity";



export class CreateConviteDto{
    @ApiProperty()
    @IsNotEmpty()
    usuario_id: string;
    @ApiProperty()
    @IsNotEmpty()
    time_id: string;
    @ApiProperty()
    mensagem?: string;

}