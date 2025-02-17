import { Exclude, Expose, Type } from "class-transformer";
import { AtletaDto } from "./atleta.dto";


@Exclude()
export class AtletaTimeDto {
  @Exclude()
  id: string;
  @Expose()
  cargo: string;
  @Expose()
  data_ingresso: Date;
  @Expose()
  principal: boolean;

  @Expose()
  @Type(() => AtletaDto)
  usuario: AtletaDto;

}
