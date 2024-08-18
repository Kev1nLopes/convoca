import { Partida } from "src/partidas/entities/partida.entity";
import { Time } from "src/times/entities/time.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

export enum StatusDesafio  {
  Pendente = 'pendente', 
  Aceito ='aceito',
  Negado = 'negado',
  Todos = 'todos'
};

@Entity()
export class Desafio {

  @PrimaryGeneratedColumn()
  id: Number;

  @Column()
  datahora_cricao_desafio: Date;
  
  @Column({nullable: true})
  datahora_desafio: Date;

  @Column()
  usuario_id: Number

  @Column()
  id_time_desafiante: Number;

  @Column()
  id_time_desafiado: Number;

  @Column()
  status: StatusDesafio;

  @Column({nullable: true})
  nome_campo: String;

  @OneToOne(() => Time, (time) => time.desafiosFeitos)
  @JoinColumn({ name: "id_time_desafiante" })
  time_desafiante: Time;

  @OneToOne(() => Time, (time) => time.desafiosRecebidos)
  @JoinColumn({ name: "id_time_desafiado" })
  time_desafiado: Time;

  @OneToOne(() => Partida, (partida) => partida.desafio)
  partida: Partida;

  
}
