import { Column, PrimaryGeneratedColumn, Entity, Unique } from 'typeorm'

@Entity({ name: 'user' })
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn("increment")
  id: string;

  @Column({ name: 'first_name' })
  firstName: string

  @Column({ name: 'last_name' })
  lastName: string

  @Column()
  email: string

  @Column()
  password: string

}