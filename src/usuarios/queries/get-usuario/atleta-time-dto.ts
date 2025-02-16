import { Exclude, Expose, Type } from "class-transformer";
import { TimeDto } from "./time-dto";




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

    @Type(() => TimeDto)
    @Expose()
    time: TimeDto;

}
