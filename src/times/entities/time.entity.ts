import { AtletaTime } from "src/atleta_time/entities/atleta_time.entity";
import { Desafio } from "src/desafios/entities/desafio.entity";
import { Esporte } from "src/esportes/entities/esporte.entity";
import { Usuario } from "src/usuarios/entities/usuario.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Time {

  @PrimaryGeneratedColumn()
  id: Number;

  @Column({nullable: false})
  nome: String;

  @Column({nullable: true})
  sigla: String;

  @Column({nullable: true})
  logotipo_url: String;

  @Column({ nullable: true})
  instituicao: Number;

  
  @Column({type: 'date'})	
  dt_fundacao: Date;
  
  @Column({default: true})
  ativo: Boolean
  
  @Column({ default: () => "CURRENT_TIMESTAMP + INTERVAL '3 hours'", type: 'timestamp'})
  dt_criacao: Date;


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

}
