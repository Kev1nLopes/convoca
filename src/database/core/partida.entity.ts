import { Desafio } from "src/database/core/desafio.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "./base.entity";

@Entity()
export class Partida extends BaseEntity{

  @Column()
  data_criacao: Date;

  @Column({nullable: false})
  id_desafio: Number;

  @Column({nullable: true})
  placar_time_desafiado: Number;

  @Column({nullable: true})
  placar_time_desafiante: Number;

  @OneToOne(() => Desafio, (desafio) => desafio.partida)
  desafio: Desafio

}
