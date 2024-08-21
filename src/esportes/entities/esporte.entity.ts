import { Time } from "src/times/entities/time.entity";
import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Esporte {

  @PrimaryGeneratedColumn()
  id: Number;

  @Column({nullable: false})
  nome: String;

  @Column()
  limite_atletas_inicial: Number;

  @OneToMany(() => Time, (time) => time.esporte)
  time: Time


}
