import { Entity, ObjectIdColumn, ObjectId, Column , OneToMany } from "typeorm";
import { Conversation } from './Conversation';
import { HistoricCall } from './HistoricCall';

@Entity()
export class User {
    @ObjectIdColumn()
    id!: ObjectId

    @Column()
    firstName!: string

    @Column()
    lastName!: string

    @Column()
    email!: string

    @Column()
    password!: string

    @Column()
    avatar!: string

    @OneToMany(() => Conversation, conversation => conversation.user)
    conversations!: Conversation[];
  
    @OneToMany(() => HistoricCall, historicCall => historicCall.user)
    historicCalls!: HistoricCall[];

}


