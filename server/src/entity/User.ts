import { Entity, ObjectIdColumn, ObjectId, Column , OneToMany, PrimaryColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Conversation } from './Conversation';
import { HistoricCall } from './HistoricCall';

@Entity()
export class User {
    @ObjectIdColumn()
    id!: ObjectId

    @Column()
    fullName!: string

    @PrimaryColumn()
    email!: string

    @Column()
    confirmationCode!: number

    @Column()
    avatar!: string

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @OneToMany(() => Conversation, conversation => conversation.user)
    conversations!: Conversation[];
  
    @OneToMany(() => HistoricCall, historicCall => historicCall.user)
    historicCalls!: HistoricCall[];

}



