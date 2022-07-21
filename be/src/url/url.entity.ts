import {
  Entity,
  Column,
  JoinColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { User } from 'src/user/user.entity';

@Entity()
export class URL {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  originURL!: string;

  @Column({
    unique: true,
  })
  shortURL!: string;

  @Column()
  called!: number;

  @ManyToOne(() => User, (user) => user.urls, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'user' })
  user: User;
}
