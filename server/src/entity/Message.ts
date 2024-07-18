import { Entity, Column, CreateDateColumn, ObjectIdColumn, OneToOne } from 'typeorm';
import { Conversation } from './Conversation';

@Entity()
export class Message {

  @ObjectIdColumn()
  id!: string ;

  @Column()
  content!:string ;

  @CreateDateColumn()
  createdAt!: Date;

  @Column()
  type!:string ;

  @Column()
  conversation!: string;


}