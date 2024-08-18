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

  // Fazer relacionamento 1:1 com esporte
  @Column({nullable: false})
  esporte_id: Number;

  

  @Column()
  sigla: String;

  @Column()
  logotipo_url: String;

  @Column({ nullable: true})
  instituicao: Number;

  
  @Column()
  dt_fundacao: String;
  
  @Column({default: true})
  ativo: Boolean
  
  @Column({ default: () => "CURRENT_TIMESTAMP + INTERVAL '3 hours'", type: 'timestamp'})
  dt_criacao: Date;

  @Column({ nullable: false })  
  fundador_id: Number;

  //Referencia ao usuario que fundou o time, quando haver cargos esse fundador vai receber o cardo dono/admin
  @OneToOne(() => Usuario, (usuario) => usuario.timeDono)
  @JoinColumn({name: "fundador_id"})
  Usuario: Usuario

  @ManyToOne(() => Esporte, (esporte) => esporte.time)
  esporte: Esporte

  @OneToMany(() => AtletaTime, (atletaTime) => atletaTime.time)
  atletas: AtletaTime[]

  @OneToMany(() => Desafio, (desafio) => desafio.time_desafiante)
  desafiosFeitos: Desafio[]

  @OneToMany(() => Desafio, (desafio) => desafio.time_desafiado)
  desafiosRecebidos: Desafio[]

}
