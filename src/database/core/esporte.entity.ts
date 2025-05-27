import { Time } from "src/database/core/time.entity";
import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "./base.entity";


@Entity({name: 'esportes', schema: `public`}) 
export class Esporte extends BaseEntity {


  @Column({nullable: false})
  nome: String;

  @Column()
  limite_jogadores_inicial: Number;

  @Column()
  limite_titulares: Number;

  // @OneToMany(() => Time, (time) => time.esporte)
  // time: Time


}
