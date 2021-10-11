import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import { UserToken } from './user-token.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  username: string;

  @Column()
  taxpayer_id: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  // @Column({})
  // password: string;

  @Column()
  role: string;

  @Column({ name: 'agree_terms_of_service' })
  agreeTermsOfService: boolean;

  @OneToMany(() => UserToken, (userToken) => userToken.user)
  tokens: UserToken[];
}
