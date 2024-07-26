import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ObjectId, CreateDateColumn, ObjectIdColumn } from 'typeorm';

@Entity()
export class Call {
  @ObjectIdColumn()
  id!: string ;

  @Column()
  callType!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @Column({ type: 'timestamp', nullable: true }) // Permet la valeur NULL dans la base de données
  endTime?: Date; // endTime peut être de type Date ou undefined

  @Column()
  duration!: number;


}
