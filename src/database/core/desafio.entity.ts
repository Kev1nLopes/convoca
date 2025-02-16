import { Partida } from "src/database/core/partida.entity";
import { Time } from "src/database/core/time.entity";
import { Usuario } from "src/database/core/usuario.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "./base.entity";

export enum StatusDesafio  {
  Pendente = 'pendente', 
  Aceito ='aceito',
  Negado = 'negado',
};

@Entity()
export class Desafio extends BaseEntity {



  @Column({ type: 'timestamptz' }) 
  datahora_cricao_desafio: Date;
  
  @Column({ type: 'timestamptz' }) 
  datahora_desafio: Date;

  @Column()
  usuario_id: string

  @Column({type: 'enum', enum: StatusDesafio, nullable: false})
  status: StatusDesafio;

  @Column()
  nome_campo: String;

  @ManyToOne(() => Time, (time) => time.desafiosFeitos)
  @JoinColumn({ name: "id_time_desafiante" })
  time_desafiante: Time;

  @ManyToOne(() => Time, (time) => time.desafiosRecebidos)
  @JoinColumn({ name: "id_time_desafiado" })
  time_desafiado: Time;

  @OneToOne(() => Partida, (partida) => partida.desafio)
  partida: Partida;

  @ManyToOne(() => Usuario, (usuario) => usuario.desafios)
  author: Usuario
  
}
