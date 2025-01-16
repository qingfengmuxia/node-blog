import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { User } from './user.entity.js';

@Entity({ name: 'posts' })
export class Post {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ type: 'text', unique: true })
  title: string;

  @Column('text')
  content: string;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;
}
