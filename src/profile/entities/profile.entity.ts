import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('profile')
export class Profile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  title: string;

  @Column({ type: 'text' })
  bio: string;

  @Column({ type: 'text', nullable: true })
  shortBio: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  location: string;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true })
  avatarUrl: string;

  @Column({ nullable: true })
  resumeUrl: string;

  @Column({ nullable: true })
  yearsOfExperience: number;

  @Column({ nullable: true })
  openToWork: boolean;

  @Column({ type: 'simple-array', nullable: true })
  languages: string[];

  @Column({ type: 'simple-array', nullable: true })
  interests: string[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
