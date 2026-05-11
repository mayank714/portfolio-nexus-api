import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum EmploymentType {
  FULL_TIME = 'Full-time',
  PART_TIME = 'Part-time',
  CONTRACT = 'Contract',
  FREELANCE = 'Freelance',
  INTERNSHIP = 'Internship',
  APPRENTICESHIP = 'Apprenticeship',
  SELF_EMPLOYED = 'Self-employed',
}

@Entity('work_experiences')
export class WorkExperience {
  @ApiProperty({ example: 'uuid-v4' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'Google LLC' })
  @Column()
  company: string;

  @ApiPropertyOptional({ example: 'https://google.com/logo.png' })
  @Column({ nullable: true })
  companyLogoUrl: string;

  @ApiPropertyOptional({ example: 'https://google.com' })
  @Column({ nullable: true })
  companyUrl: string;

  @ApiProperty({ example: 'Senior Software Engineer' })
  @Column()
  position: string;

  @ApiProperty({ example: 'Led development of core search infrastructure...' })
  @Column({ type: 'text' })
  description: string;

  @ApiPropertyOptional({ example: ['Built microservices', 'Led team of 5'], type: [String] })
  @Column({ type: 'simple-array', nullable: true })
  responsibilities: string[];

  @ApiPropertyOptional({ example: ['Reduced latency by 40%'], type: [String] })
  @Column({ type: 'simple-array', nullable: true })
  achievements: string[];

  @ApiPropertyOptional({ example: ['Go', 'Kubernetes', 'GCP'], type: [String] })
  @Column({ type: 'simple-array', nullable: true })
  techStack: string[];

  @ApiProperty({ enum: EmploymentType, example: EmploymentType.FULL_TIME })
  @Column({ type: 'enum', enum: EmploymentType, default: EmploymentType.FULL_TIME })
  employmentType: EmploymentType;

  @ApiPropertyOptional({ example: 'Mountain View, CA' })
  @Column({ nullable: true })
  location: string;

  @ApiProperty({ example: false })
  @Column({ default: false })
  remote: boolean;

  @ApiProperty({ example: '2021-06-01' })
  @Column({ type: 'date' })
  startDate: Date;

  @ApiPropertyOptional({ example: '2024-01-01' })
  @Column({ type: 'date', nullable: true })
  endDate: Date;

  @ApiProperty({ example: false })
  @Column({ default: false })
  current: boolean;

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
