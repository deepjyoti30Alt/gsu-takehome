import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { IsNotEmpty, IsOptional } from 'class-validator';
import { Priority } from "../../api/enums/Priority"
import { Status } from "../../api/enums/Status";
import { User } from "./User";

@Entity("tasks")
export class Task {
    @PrimaryColumn('uuid')
    public task_id: string

    @IsNotEmpty()
    @Column({ name: 'title' })
    public title: string

    @Column({ name: 'content' })
    public content: string | null

    @IsOptional()
    @Column({
        type: 'enum',
        enum: Priority,
        nullable: true,
        name: 'priority'
    })
    public priority: Priority | null;

    @IsNotEmpty()
    @Column({
        type: 'enum',
        enum: Status,
        name: 'status',
        default: Status.NOT_STARTED
    })
    public status: Status

    @IsNotEmpty()
    @Column({ name: 'user_id', type: 'uuid' })
    public user_id: string;

    @CreateDateColumn({ type: 'timestamp' })
    public createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    public updatedAt: Date;

    @Column({ name: 'due_at', type: 'timestamp' })
    public due_at: Date;

    // Define the relationship between user and tasks
    @ManyToOne(() => User, user => user.tasks)
    @JoinColumn({ name: 'user_id' })  // This specifies the foreign key column
    public user: User;
}
