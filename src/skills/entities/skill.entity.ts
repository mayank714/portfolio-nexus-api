import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum SkillCategory {
  FRONTEND = 'Frontend',
  BACKEND = 'Backend',
  DATABASE = 'Database',
  DEVOPS = 'DevOps',
  MOBILE = 'Mobile',
  CLOUD = 'Cloud',
  TOOLS = 'Tools',
  LANGUAGES = 'Languages',
  FRAMEWORKS = 'Frameworks',
  TESTING = 'Testing',
  OTHER = 'Other',
}

export enum ProficiencyLevel {
  BEGINNER = 'Beginner',
  INTERMEDIATE = 'Intermediate',
  ADVANCED = 'Advanced',
  EXPERT = 'Expert',
}

@Entity('skills')
export class Skill {
  @ApiProperty({ example: 'uuid-v4' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'TypeScript' })
  @Column()
  name: string;

  @ApiProperty({ enum: SkillCategory, example: SkillCategory.BACKEND })
  @Column({ type: 'enum', enum: SkillCategory, default: SkillCategory.OTHER })
  category: SkillCategory;

  @ApiProperty({ enum: ProficiencyLevel, example: ProficiencyLevel.EXPERT })
  @Column({ type: 'enum', enum: ProficiencyLevel, default: ProficiencyLevel.INTERMEDIATE })
  proficiency: ProficiencyLevel;

  @ApiPropertyOptional({ example: 90, description: 'Override percentage (0–100)' })
  @Column({ nullable: true })
  proficiencyPercent: number;

  @ApiPropertyOptional({ example: 'https://cdn.example.com/ts.svg' })
  @Column({ nullable: true })
  iconUrl: string;

  @ApiPropertyOptional({ example: '#3178c6' })
  @Column({ nullable: true })
  color: string;

  @ApiProperty({ example: 4 })
  @Column({ default: 0 })
  yearsOfExperience: number;

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
