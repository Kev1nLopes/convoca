import { Desafio } from "src/desafios/entities/desafio.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Partida {
  @Column()
  @PrimaryGeneratedColumn()
  id: Number;

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
