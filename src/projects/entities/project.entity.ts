import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum ProjectStatus {
  COMPLETED = 'Completed',
  IN_PROGRESS = 'In Progress',
  ARCHIVED = 'Archived',
  PLANNED = 'Planned',
}

export enum ProjectCategory {
  WEB = 'Web',
  MOBILE = 'Mobile',
  DESKTOP = 'Desktop',
  API = 'API',
  DATA_SCIENCE = 'Data Science',
  ML_AI = 'ML/AI',
  OPEN_SOURCE = 'Open Source',
  OTHER = 'Other',
}

@Entity('projects')
export class Project {
  @ApiProperty({ example: 'uuid-v4' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'E-Commerce Platform' })
  @Column()
  title: string;

  @ApiProperty({ example: 'A full-featured e-commerce platform...' })
  @Column({ type: 'text' })
  description: string;

  @ApiPropertyOptional({ example: 'Full-stack e-commerce solution' })
  @Column({ type: 'text', nullable: true })
  shortDescription: string;

  @ApiProperty({ example: ['React', 'Node.js', 'PostgreSQL'], type: [String] })
  @Column({ type: 'simple-array' })
  techStack: string[];

  @ApiPropertyOptional({ example: 'https://example.com/project.png' })
  @Column({ nullable: true })
  imageUrl: string;

  @ApiPropertyOptional({ example: ['https://example.com/ss1.png'], type: [String] })
  @Column({ type: 'simple-array', nullable: true })
  screenshots: string[];

  @ApiPropertyOptional({ example: 'https://my-project.com' })
  @Column({ nullable: true })
  liveUrl: string;

  @ApiPropertyOptional({ example: 'https://github.com/user/project' })
  @Column({ nullable: true })
  githubUrl: string;

  @ApiPropertyOptional({ example: 'https://youtube.com/watch?v=...' })
  @Column({ nullable: true })
  demoVideoUrl: string;

  @ApiProperty({ enum: ProjectStatus, example: ProjectStatus.COMPLETED })
  @Column({ type: 'enum', enum: ProjectStatus, default: ProjectStatus.COMPLETED })
  status: ProjectStatus;

  @ApiProperty({ enum: ProjectCategory, example: ProjectCategory.WEB })
  @Column({ type: 'enum', enum: ProjectCategory, default: ProjectCategory.WEB })
  category: ProjectCategory;

  @ApiProperty({ example: false })
  @Column({ default: false })
  featured: boolean;

  @ApiPropertyOptional({ example: '2023-01-01' })
  @Column({ nullable: true, type: 'date' })
  startDate: Date;

  @ApiPropertyOptional({ example: '2023-06-01' })
  @Column({ nullable: true, type: 'date' })
  endDate: Date;

  @ApiProperty({ example: 0 })
  @Column({ default: 0 })
  likes: number;

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
