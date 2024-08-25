import { StatusDesafio } from "src/desafios/entities/desafio.entity";
import { Time } from "src/times/entities/time.entity";
import { Usuario } from "src/usuarios/entities/usuario.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";


export enum TipoConvite{
  Time = 'time',
  Atleta = 'atleta'
}

export enum StatusConvite{
  Pendente = 'pendente',
  Aceito = 'aceito',
  Negado = 'negado'
}

@Entity()
export class Convite {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Time, (time) => time.convites)
  @JoinColumn({name: "time_id"})
  time: Time

  @ManyToOne(() => Usuario, (usuario) => usuario.convites)
  @JoinColumn({name: "usuario_id"})
  usuario:  Usuario

  // Quem fez o convite, se foi a equipe ou o atleta
  @Column({type: 'enum', enum: TipoConvite,nullable: false})
  tipo_convite: TipoConvite

  @Column({type: 'enum', enum: StatusConvite, nullable: false})
  status: StatusConvite
  
  @Column({type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
  data_envio: Date

  @Column({type: 'timestamp', nullable: true})
  data_resposta: Date

  @Column({nullable: true, type: 'text'})
  mensagem: string;

  
}
