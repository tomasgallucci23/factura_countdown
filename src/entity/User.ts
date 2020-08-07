import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', length: 150, nullable: true })
  name: string;
  @Column({ type: 'varchar', length: 150, nullable: true })
  lastname: string;
  @Column({ type: 'varchar', length: 150, nullable: true })
  email: string;
  @Column({ type: 'varchar', length: 14, nullable: false })
  phone: string;

  @Column({ type: 'date', nullable: false })
  date_birthday: string;

  @Column({ type: 'nvarchar', length: 500, nullable: true })
  description: string;
}
