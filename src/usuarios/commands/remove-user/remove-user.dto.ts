import { IsNotEmpty, IsString } from "class-validator";
import { removeUserCommand } from "./remove-user.command";


export class removeUserDto{
    @IsNotEmpty()
    @IsString()
    id: string
}