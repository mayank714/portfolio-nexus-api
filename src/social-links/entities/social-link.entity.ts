import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

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
  @ApiProperty({ example: 'uuid-v4' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ enum: SocialPlatform, example: SocialPlatform.GITHUB })
  @Column({ type: 'enum', enum: SocialPlatform, default: SocialPlatform.OTHER })
  platform: SocialPlatform;

  @ApiProperty({ example: 'https://github.com/johndoe' })
  @Column()
  url: string;

  @ApiPropertyOptional({ example: 'johndoe' })
  @Column({ nullable: true })
  displayName: string;

  @ApiPropertyOptional({ example: 'fab fa-github' })
  @Column({ nullable: true })
  iconClass: string;

  @ApiPropertyOptional({ example: '#333333' })
  @Column({ nullable: true })
  color: string;

  @ApiProperty({ example: true })
  @Column({ default: true })
  isVisible: boolean;

  @ApiProperty({ example: 0 })
  @Column({ default: 0 })
  sortOrder: number;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  @UpdateDateColumn()
  updatedAt: Date;
}
