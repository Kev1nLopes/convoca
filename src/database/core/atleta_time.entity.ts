import { Time } from "src/database/core/time.entity";
import { Usuario } from "src/database/core/usuario.entity";
import {  Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "./base.entity";

@Entity()
export class AtletaTime extends BaseEntity {


  // Existem 3 cargos Admin, Treinador e Atleta
  @Column({nullable: false, default: 'Atleta'})
  cargo: string;

  @Column({default: false})
  principal:boolean

  @ManyToOne(() => Usuario, (usuario) => usuario.times)
  @JoinColumn({name: "usuario_id"})
  usuario: Usuario;
  
  @ManyToOne(() => Time, (time) => time.atletas)
  @JoinColumn({name: "time_id"})
  time: Time;

}
