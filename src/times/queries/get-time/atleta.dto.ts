import { Exclude, Expose } from "class-transformer";

//Usuario


@Exclude()
export class AtletaDto {
  @Expose()
  id: string;
  @Expose()
  nome: string;
  @Expose()
  email: string;
  @Expose()
  data_nasc: Date;
}
