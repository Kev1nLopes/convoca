import { Time } from "src/times/entities/time.entity";
import { Usuario } from "src/usuarios/entities/usuario.entity";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AtletaTime {

  
  @PrimaryGeneratedColumn()
  id: Number;

  @Column({nullable: false})
  usuario_id: Number;

  @Column({nullable: false})
  time_id: Number;

  // Existem 3 cargos Admin, Treinador e Atleta
  @Column({nullable: false, default: 'Atleta'})
  cargo: String;

  @OneToMany(() => Usuario, (usuario) => usuario.times)
  @JoinColumn({name: "usuario_id"})
  usuario: Usuario;
  
  @OneToMany(() => Time, (time) => time.atletas)
  @JoinColumn({name: "time_id"})
  time: Time;
}
