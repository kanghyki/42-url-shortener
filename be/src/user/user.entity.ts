import {
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { URL } from 'src/url/url.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  intraUniqueID: number;

  @Column({
    unique: true,
  })
  userID: string;

  @Column()
  password: string;

  @Column()
  intraID: string;

  @Column()
  email: string;

  @Column({
    nullable: true,
  })
  token: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @OneToMany(() => URL, (url) => url.user)
  urls!: URL[];
}
