import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './User';

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
}
