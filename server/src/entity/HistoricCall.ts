import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from './User';
import { Conversation } from './Conversation';
@Entity()
export class HistoricCall {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  callType!: string;

  @Column()
  callCode!: string;

  @Column()
  callUrl!: string;

  @Column()
  timestamp!: Date;

  @Column()
  endTime!: Date;

  @Column()
  duration!: number;

  @ManyToOne(() => User, user => user.historicCalls)
  @JoinColumn({ name: 'userId' })
  user!: User;

  
  @OneToMany(() => Conversation, conversation => conversation.id)
  conversations!: Conversation[];
}
