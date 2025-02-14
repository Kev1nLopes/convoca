import { Time } from "src/database/core/time.entity";
import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "./base.entity";


@Entity()
export class Esporte extends BaseEntity {


  @Column({nullable: false})
  nome: String;

  @Column()
  limite_atletas_inicial: Number;

  @OneToMany(() => Time, (time) => time.esporte)
  time: Time


}
