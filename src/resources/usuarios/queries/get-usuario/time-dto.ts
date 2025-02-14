import { Exclude, Expose } from "class-transformer";




@Exclude()
export class TimeDto {
    @Expose()
    nome: number;
    @Expose()
    sigla: string;
    @Expose()
    logotipo_url: string;
    @Expose()
    dt_fundacao: Date;
}
