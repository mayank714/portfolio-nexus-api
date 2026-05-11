import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

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
  @ApiProperty({ example: 'uuid-v4' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: '1st Place – National Hackathon 2023' })
  @Column()
  title: string;

  @ApiProperty({ example: 'Won first place out of 500+ teams for building an AI-powered accessibility tool.' })
  @Column({ type: 'text' })
  description: string;

  @ApiProperty({ enum: AchievementCategory, example: AchievementCategory.HACKATHON })
  @Column({ type: 'enum', enum: AchievementCategory, default: AchievementCategory.AWARD })
  category: AchievementCategory;

  @ApiPropertyOptional({ example: 'MLH / Major League Hacking' })
  @Column({ nullable: true })
  organization: string;

  @ApiPropertyOptional({ example: 'https://mlh.io/logo.png' })
  @Column({ nullable: true })
  organizationLogoUrl: string;

  @ApiProperty({ example: '2023-11-15' })
  @Column({ type: 'date' })
  date: Date;

  @ApiPropertyOptional({ example: 'https://devpost.com/project' })
  @Column({ nullable: true })
  url: string;

  @ApiPropertyOptional({ example: 'https://example.com/certificate.png' })
  @Column({ nullable: true })
  imageUrl: string;

  @ApiPropertyOptional({ example: '1st Place' })
  @Column({ nullable: true })
  rank: string;

  @ApiProperty({ example: true })
  @Column({ default: false })
  featured: boolean;

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
