import { Entity, Column , ObjectId , ObjectIdColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Conversation {

  @ObjectIdColumn()
  id!: string;

  @CreateDateColumn()
  timestamp!: Date;

  @Column()
  messages!: String[];

}


