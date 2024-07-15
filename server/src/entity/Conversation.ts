import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, ObjectId, OneToMany } from 'typeorm';
import { User } from './User';
import { Message } from './Message';
//import { HistoricCall } from './Call';
@Entity()
export class Conversation {
  @PrimaryGeneratedColumn()
  id!: ObjectId;

  @Column()
  message!: string;

  @Column()
  timestamp!: Date;

  @OneToMany(() => Message, (message) => message.conversation)
  messages!: Message[];

  /*@ManyToOne(() => User, user => user.conversations , {
    cascade: ["insert", "update"],
})
  @JoinColumn({ name: 'userId' })
  user!: User;

  @ManyToOne(() => HistoricCall, HistoricCall => HistoricCall.conversations , {
    cascade: ["insert", "update"],
})
  @JoinColumn({ name: 'id' })
  call!: HistoricCall;*/

}
