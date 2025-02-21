import { BaseEntity, Column, Entity, ManyToMany, ManyToOne } from "typeorm";
import { Time } from "./time.entity";
import { Usuario } from "./usuario.entity";



@Entity('atleta_time')
export class AtletaTime extends BaseEntity{

  @Column({nullable: false, default: 'Atleta'})
  cargo: string

  @ManyToOne(() => Time, (time) => time.atletas)
  time: Time

  @ManyToOne(() => Usuario, (usuario) => usuario.times)
  usuario: Usuario
}