import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ObjectId, CreateDateColumn, ObjectIdColumn } from 'typeorm';

@Entity()
export class Call {
  @ObjectIdColumn()
  id!: ObjectId

  @Column()
  callType!: string;

  @Column()
  callId!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @Column()
  endTime!: Date;

  @Column()
  duration!: number;

 /* @OneToMany(()=>User , user=>user.id , {
    cascade: ["insert", "update"],
})
  users!:User[] ;
  
  @OneToMany(() => Conversation, conversation => conversation.id , {
    cascade: ["insert", "update"],
})
  conversations!: Conversation[];*/
}
