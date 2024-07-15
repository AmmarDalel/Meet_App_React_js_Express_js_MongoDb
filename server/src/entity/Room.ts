import { Entity, Column, ObjectId, CreateDateColumn, ObjectIdColumn , OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from './User';
import { Call } from './Call';
import { Conversation } from './Conversation';
@Entity()
export class Room {
  @ObjectIdColumn()
  id!: ObjectId

  @CreateDateColumn()
  createdAt!: Date;

  @Column()
  type!:string ;

  @OneToOne(() => User, ({ nullable: true }))
  createdBy!: User;

  @OneToMany(() => User, (user) => user.room , ({ nullable: true }))
  participants!: User[];

  @OneToOne(() => Call , ({ nullable: true }))
  call!: Call;

  @OneToOne(() => Conversation, ({ nullable: true }))
  conversation!: Conversation;

}