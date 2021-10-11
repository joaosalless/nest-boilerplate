import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('user_tokens')
export class UserToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  token: string;

  @Column({ name: 'user_id' })
  userId: number;

  @JoinColumn({ name: 'user_id' })
  @ManyToOne(() => User, (user) => user.tokens)
  user: User;
}
