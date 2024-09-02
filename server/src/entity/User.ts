import { Entity, ObjectIdColumn, ObjectId, Column , PrimaryColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm";
import { Room } from "./Room";
//import { HistoricCall } from './Call';

@Entity()
export class User {
    
    @ObjectIdColumn()
    id!: string

    @Column({ unique: true  , nullable: false} )
    fullName!: string

    @PrimaryColumn()
    email!: string

    @Column()
    confirmationCode!: number

    @Column({ nullable: true })
    peerid!: string ;

    @Column()
    avatar!: string;

    
    @Column()
    online!: boolean;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @ManyToOne(() => Room, (room) => room.participants ) 
    room!: Room;

   /* @OneToMany(() => Conversation, conversation => conversation.user , {
        cascade: ["insert", "update"],
    })
    conversations!: Conversation[];
  
    @OneToMany(() => HistoricCall, historicCall => historicCall.users ,{
        cascade: ["insert", "update"],
    })
    historicCalls!: HistoricCall[];*/

}



