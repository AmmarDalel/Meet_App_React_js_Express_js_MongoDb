import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ObjectId, CreateDateColumn, ObjectIdColumn } from 'typeorm';

@Entity()
export class Call {
  @ObjectIdColumn()
  id!: string ;

  @Column()
  callType!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @Column()
  endTime!: Date;

  @Column()
  duration!: number;


}
