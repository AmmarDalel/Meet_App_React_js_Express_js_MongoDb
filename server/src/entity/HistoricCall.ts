import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './User';

@Entity()
export class HistoricCall {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  callType!: string;

  @Column()
  timestamp!: Date;

  @Column()
  duration!: number;

  @ManyToOne(() => User, user => user.historicCalls)
  @JoinColumn({ name: 'userId' })
  user!: User;
}
