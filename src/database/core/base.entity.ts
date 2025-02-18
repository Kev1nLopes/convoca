import {
    CreateDateColumn,
    DeleteDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  export class BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;
  
    @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
    readonly createdAt!: Date;

  }