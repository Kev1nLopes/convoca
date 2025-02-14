import { Exclude } from "class-transformer";
import { AtletaTime } from "src/database/core/atleta_time.entity";
import { Convite } from "src/database/core/convite.entity";
import { Desafio } from "src/database/core/desafio.entity";
import { HistoricoAtletaTime } from "src/database/core/hist_atleta_time.entity";
import { Time } from "src/database/core/time.entity";
import { AfterInsert, Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "./base.entity";


@Entity('usuario')
export class Usuario extends BaseEntity {

  @Column({nullable: false})
  nome: string;

  @Exclude()
  @Column({nullable: false})
  senha: string;

  @Column({nullable: false, unique: true})
  email: string;

  @Column({nullable: false, type: 'date'})
  data_nasc: Date;

  @Column({unique: true, nullable: true, default: null})
  cpf: string;

  @Column({ nullable: true,})
  cep: string;

  @Column({ nullable: true})
  uf: string;

  @Column({ nullable: true})
  cidade: string;

  @Column({ nullable: true})
  bairro: string;

  @Column({default: true, type: 'boolean'})
  ativo: boolean;

  @OneToMany(() => Convite, (convite) => convite.usuario)
  convites?: Convite[];
  
  /// Usuario pode ser dono de um time ou não ser
  @OneToMany(() => Time, (time) => time.Usuario, {nullable: true})
  timeDono?: Time;

  // Usuário pode ser atleta de diversos times
  @OneToMany(() => AtletaTime, (AtletaTime) => AtletaTime.usuario)
  times?: AtletaTime[];

  @OneToMany(() => HistoricoAtletaTime, (historicoAtletaTime) => historicoAtletaTime.atleta)
  historicoTimes?: HistoricoAtletaTime[]

  @OneToMany(() => Desafio, (desafio) => desafio.author)
  desafios?: Desafio[]

}
