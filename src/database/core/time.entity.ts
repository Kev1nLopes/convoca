import { AtletaTime } from "src/database/core/atleta_time.entity";
import { Convite } from "src/database/core/convite.entity";
import { Desafio } from "src/database/core/desafio.entity";
import { Esporte } from "src/database/core/esporte.entity";
import { HistoricoAtletaTime } from "src/database/core/hist_atleta_time.entity";
import { Usuario } from "src/database/core/usuario.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "./base.entity";

@Entity()
export class Time extends BaseEntity{

  @Column({nullable: false})
  nome: string;

  @Column({nullable: false})
  sigla: string;

  @Column({nullable: true})
  logotipo_url: string;

  @Column({nullable: true, default: false})
  publico: boolean

  @Column({type: 'date'})	
  dt_fundacao: Date;
  
  @Column({default: true})
  ativo: Boolean
  
  @Column({ default: () => "CURRENT_TIMESTAMP + INTERVAL '3 hours'", type: 'timestamp'})
  dt_criacao: Date;

  
  @OneToMany(() => Convite, (convite) => convite.time)
  convites: Convite[]

  //Referencia ao usuario que fundou o time, quando haver cargos esse fundador vai receber o cardo dono/admin
  @ManyToOne(() => Usuario, (usuario) => usuario.timeDono)
  @JoinColumn({name: "fundador_id"})
  Usuario: Usuario

  @ManyToOne(() => Esporte, (esporte) => esporte.time)
  @JoinColumn({name: "esporte_id"})
  esporte: Esporte


  @OneToMany(() => AtletaTime, (atletaTime) => atletaTime.time)
  atletas: AtletaTime[]

  @OneToMany(() => Desafio, (desafio) => desafio.time_desafiante)
  desafiosFeitos: Desafio[]

  @OneToMany(() => Desafio, (desafio) => desafio.time_desafiado)
  desafiosRecebidos: Desafio[]

  @OneToMany(() => HistoricoAtletaTime, (historicoAtletaTime) => historicoAtletaTime.time)
  historicoAtletas: HistoricoAtletaTime[]

}
