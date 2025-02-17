import { Exclude, Expose, Type } from "class-transformer";




@Exclude()
export class GetTimeDto{
  @Expose()
  id: string;
  @Expose()
  nome: string;
  @Expose()
  sigla: string;
  @Expose()
  logotipo_url: string;
  @Expose()
  publico: boolean
  @Expose()
  dt_fundacao: Date;
  @Expose()
  ativo: Boolean;
}


