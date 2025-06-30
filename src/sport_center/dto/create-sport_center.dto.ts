import { IsDateString, IsNotEmpty, IsString } from "class-validator";


export class CreateSportCenterDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsString()
  @IsNotEmpty()
  contact: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsDateString()
  open_hour: Date
  
  @IsNotEmpty()
  @IsDateString()
  end_hour: Date
}
