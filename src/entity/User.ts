import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
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
  @Column({ type: 'varchar', length: 13, nullable: false })
  phone: string;

  @Column({ type: 'date', nullable: false })
  date_birthday: string;

  @Column({ type: 'nvarchar', length: 500, nullable: true })
  description: string;
}
