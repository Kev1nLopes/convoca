import { Time } from "src/times/entities/time.entity";
import { Usuario } from "src/usuarios/entities/usuario.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class HistoricoAtletaTime {


  @PrimaryGeneratedColumn()
  id: number;

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
