import { IsIn, IsInt, isNotEmpty, IsNotEmpty, IsString } from "class-validator";

export class CreateCourtDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsInt()
  sportCenterId: string;

  @IsInt()
  @IsNotEmpty()
  price: number;

}

