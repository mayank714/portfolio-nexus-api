import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum DegreeType {
  HIGH_SCHOOL = 'High School',
  DIPLOMA = 'Diploma',
  ASSOCIATE = "Associate's",
  BACHELOR = "Bachelor's",
  MASTER = "Master's",
  PHD = 'PhD',
  POSTDOC = 'Post-Doctoral',
  CERTIFICATION_COURSE = 'Certification Course',
  BOOTCAMP = 'Bootcamp',
  ONLINE_COURSE = 'Online Course',
  OTHER = 'Other',
}

@Entity('education')
export class Education {
  @ApiProperty({ example: 'uuid-v4' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'Massachusetts Institute of Technology' })
  @Column()
  institution: string;

  @ApiPropertyOptional({ example: 'https://mit.edu/logo.png' })
  @Column({ nullable: true })
  institutionLogoUrl: string;

  @ApiPropertyOptional({ example: 'https://mit.edu' })
  @Column({ nullable: true })
  institutionUrl: string;

  @ApiProperty({ example: 'Bachelor of Science in Computer Science' })
  @Column()
  degree: string;

  @ApiProperty({ enum: DegreeType, example: DegreeType.BACHELOR })
  @Column({ type: 'enum', enum: DegreeType, default: DegreeType.BACHELOR })
  degreeType: DegreeType;

  @ApiProperty({ example: 'Computer Science' })
  @Column()
  fieldOfStudy: string;

  @ApiPropertyOptional({ example: '3.9/4.0' })
  @Column({ nullable: true })
  grade: string;

  @ApiPropertyOptional({ example: '4.0' })
  @Column({ nullable: true })
  gradeScale: string;

  @ApiPropertyOptional({ example: 'Cambridge, MA' })
  @Column({ nullable: true })
  location: string;

  @ApiProperty({ example: '2018-09-01' })
  @Column({ type: 'date' })
  startDate: Date;

  @ApiPropertyOptional({ example: '2022-05-15' })
  @Column({ type: 'date', nullable: true })
  endDate: Date;

  @ApiProperty({ example: false })
  @Column({ default: false })
  current: boolean;

  @ApiPropertyOptional({ example: 'Focused on distributed systems and ML.' })
  @Column({ type: 'text', nullable: true })
  description: string;

  @ApiPropertyOptional({ example: ['Robotics Club President'], type: [String] })
  @Column({ type: 'simple-array', nullable: true })
  activities: string[];

  @ApiPropertyOptional({ example: ['Algorithms', 'OS', 'Computer Vision'], type: [String] })
  @Column({ type: 'simple-array', nullable: true })
  subjects: string[];

  @ApiPropertyOptional({ example: ["Dean's List", 'Summa Cum Laude'], type: [String] })
  @Column({ type: 'simple-array', nullable: true })
  honors: string[];

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
