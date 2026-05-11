import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum AchievementCategory {
  AWARD = 'Award',
  HACKATHON = 'Hackathon',
  COMPETITION = 'Competition',
  SCHOLARSHIP = 'Scholarship',
  RECOGNITION = 'Recognition',
  PUBLICATION = 'Publication',
  SPEAKING = 'Speaking',
  OPEN_SOURCE = 'Open Source',
  COMMUNITY = 'Community',
  MILESTONE = 'Milestone',
  OTHER = 'Other',
}

@Entity('achievements')
export class Achievement {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({
    type: 'enum',
    enum: AchievementCategory,
    default: AchievementCategory.AWARD,
  })
  category: AchievementCategory;

  @Column({ nullable: true })
  organization: string;

  @Column({ nullable: true })
  organizationLogoUrl: string;

  @Column({ type: 'date' })
  date: Date;

  @Column({ nullable: true })
  url: string;

  @Column({ nullable: true })
  imageUrl: string;

  @Column({ nullable: true })
  rank: string;

  @Column({ default: false })
  featured: boolean;

  @Column({ default: true })
  isVisible: boolean;

  @Column({ default: 0 })
  sortOrder: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
