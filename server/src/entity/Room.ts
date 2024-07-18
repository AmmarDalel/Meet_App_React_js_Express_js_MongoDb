import { Entity, Column, CreateDateColumn , OneToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, ObjectIdColumn, UpdateDateColumn } from 'typeorm';
import { User } from './User';

@Entity()
export class Room {
    
    @ObjectIdColumn()
    id!: string
 
    @PrimaryColumn()
    roomId!:string ;

    @Column()
    type!:string ;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @OneToOne(() => User , (user)=>user.id , ({ nullable: true , cascade:true }) )
    createdBy!: User ;
    
  
    @Column()
    participants!: String[];
  
    @Column()
    call!: string;

    @Column()
    conversation!: string;
 

}



