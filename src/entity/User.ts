import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  VersionColumn,
  BeforeUpdate,
} from 'typeorm';
import { validateOrReject } from 'class-validator';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', length: 150 })
  name: string;
  @Column({ type: 'varchar', length: 150 })
  lastname: string;
  @Column({ type: 'varchar', length: 150 })
  email: string;
  @Column({ type: 'varchar', length: 14, nullable: false })
  phone: string;
  @Column({ type: 'date', nullable: false })
  date_birthday: string;
  @Column({ type: 'nvarchar', length: 500, nullable: true })
  description: string;
}
