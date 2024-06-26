import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './User';
import { HistoricCall } from './HistoricCall';
@Entity()
export class Conversation {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  message!: string;

  @Column()
  timestamp!: Date;

  @ManyToOne(() => User, user => user.conversations)
  @JoinColumn({ name: 'userId' })
  user!: User;

  @ManyToOne(() => HistoricCall, HistoricCall => HistoricCall.conversations)
  @JoinColumn({ name: 'id' })
  call!: HistoricCall;
}
