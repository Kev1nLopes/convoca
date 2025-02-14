import { Exclude, Expose } from "class-transformer";

@Exclude()
export class LoginDto{
    @Expose()
    token: string;
}