import { Entity, Column, ObjectId, CreateDateColumn, ObjectIdColumn, OneToOne } from 'typeorm';
import { Conversation } from './Conversation';

@Entity()
export class Message {

  @ObjectIdColumn()
  id!: ObjectId

  @Column()
  content!:string ;

  @CreateDateColumn()
  createdAt!: Date;

  @Column()
  type!:string ;

  @OneToOne(() => Conversation, (conversation) => conversation.messages , ({ nullable: true }))
  conversation!: Conversation;


}