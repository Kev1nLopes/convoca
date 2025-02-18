
import { Usuario } from "src/database/core/usuario.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "./base.entity";

@Entity('time')
export class Time extends BaseEntity{

  @Column({nullable: false})
  nome: string;

  @Column({nullable: false, unique: true})
  sigla: string;

  @Column({nullable: true})
  logotipo_url: string;

  @Column({nullable: true, default: false})
  publico: boolean

  @Column({type: 'date'})	
  dt_fundacao: Date;
  
  @Column({default: true})
  ativo: Boolean
  
  // @OneToMany(() => Convite, (convite) => convite.time)
  // convites: Convite[]

  //Referencia ao usuario que fundou o time, quando haver cargos esse fundador vai receber o cardo dono/admin
  @ManyToOne(() => Usuario, (usuario) => usuario.timeDono, {nullable: false})
  @JoinColumn({name: "fundador_id"})
  fundador: Usuario

  // @OneToMany(() => AtletaTime, (atletaTime) => atletaTime.time)
  // atletas: AtletaTime[]

  // @OneToMany(() => Desafio, (desafio) => desafio.time_desafiante)
  // desafiosFeitos: Desafio[]

  // @OneToMany(() => Desafio, (desafio) => desafio.time_desafiado)
  // desafiosRecebidos: Desafio[]

  // @OneToMany(() => HistoricoAtletaTime, (historicoAtletaTime) => historicoAtletaTime.time)
  // historicoAtletas: HistoricoAtletaTime[]

}
