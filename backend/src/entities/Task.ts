import { Column, PrimaryGeneratedColumn, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './User';

@Entity({ name: 'task' })
export class Task {
    @PrimaryGeneratedColumn("increment")
    id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column({ name: 'due_date', default: () => 'CURRENT_TIMESTAMP' })
    duedate: string;

    @Column({ default: 'DefaultCategory' }) // Set the default value for the category
    category: string;

    @ManyToOne(() => User) // Many tasks can belong to one user
    @JoinColumn({ name: 'user_id' }) // Foreign key column in the 'post' table
    userId: string;
}
