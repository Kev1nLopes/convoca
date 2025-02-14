import { Time } from "src/database/core/time.entity";
import { Usuario } from "src/database/core/usuario.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "./base.entity";

@Entity()
export class HistoricoAtletaTime extends BaseEntity {



  @ManyToOne(() => Usuario, (usuario) => usuario.historicoTimes)
  @JoinColumn({name: "atleta_id"})
  atleta: Usuario


  @ManyToOne(() => Time, (time) => time.historicoAtletas)
  @JoinColumn({name: "time_id"})
  time: Time

  @Column()
  posicao: string

  @Column({type: 'text'})
  motivo_saida: String

  @Column({ type: 'timestamptz'})
  data_inicio: Date

  @Column({type:'timestamptz'})
  data_fim: Date



}
