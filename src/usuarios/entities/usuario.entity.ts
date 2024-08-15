import { AtletaTime } from "src/atleta_time/entities/atleta_time.entity";
import { Time } from "src/times/entities/time.entity";
import { AfterInsert, Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity('usuario', )
export class Usuario {

  @PrimaryGeneratedColumn()
  id: Number;

  @Column({nullable: false})
  nome: String;

  @Column({nullable: false})
  senha: String;

  @Column({nullable: false, unique: true})
  email: String;

  @Column({nullable: false, type: 'date'})
  data_nasc: Date;

  @Column({unique: true, nullable: true, default: null})
  cpf: String;

  @Column({ nullable: true,})
  cep: String;

  @Column({ nullable: true})
  uf: String;

  @Column({ nullable: true})
  cidade: String;

  @Column({ nullable: true})
  bairro: String;

  @Column({default: true, type: 'boolean'})
  ativo: boolean;

  /// Usuario pode ser dono de um time ou não ser
  @OneToOne(() => Time, (time) => time.Usuario, {nullable: true})
  timeDono: Time;

  // Usuário pode ser atleta de diversos times
  @OneToMany(() => AtletaTime, (AtletaTime) => AtletaTime.usuario)
  times: AtletaTime[];



}
