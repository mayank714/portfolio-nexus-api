import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum SocialPlatform {
  GITHUB = 'GitHub',
  LINKEDIN = 'LinkedIn',
  TWITTER = 'Twitter',
  INSTAGRAM = 'Instagram',
  YOUTUBE = 'YouTube',
  MEDIUM = 'Medium',
  DEV_TO = 'Dev.to',
  HASHNODE = 'Hashnode',
  STACK_OVERFLOW = 'Stack Overflow',
  LEETCODE = 'LeetCode',
  HACKERRANK = 'HackerRank',
  CODEPEN = 'CodePen',
  DRIBBBLE = 'Dribbble',
  BEHANCE = 'Behance',
  WEBSITE = 'Website',
  EMAIL = 'Email',
  OTHER = 'Other',
}

@Entity('social_links')
export class SocialLink {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: SocialPlatform, default: SocialPlatform.OTHER })
  platform: SocialPlatform;

  @Column()
  url: string;

  @Column({ nullable: true })
  displayName: string;

  @Column({ nullable: true })
  iconClass: string;

  @Column({ nullable: true })
  color: string;

  @Column({ default: true })
  isVisible: boolean;

  @Column({ default: 0 })
  sortOrder: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
