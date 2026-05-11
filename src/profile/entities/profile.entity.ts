import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Entity('profile')
export class Profile {
  @ApiProperty({ example: 'uuid-v4', description: 'Unique identifier' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'John' })
  @Column()
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  @Column()
  lastName: string;

  @ApiProperty({ example: 'Full Stack Developer' })
  @Column()
  title: string;

  @ApiProperty({ example: 'Passionate developer with 5+ years of experience building scalable web applications.' })
  @Column({ type: 'text' })
  bio: string;

  @ApiPropertyOptional({ example: 'Building things that matter.' })
  @Column({ type: 'text', nullable: true })
  shortBio: string;

  @ApiPropertyOptional({ example: 'john@example.com' })
  @Column({ nullable: true })
  email: string;

  @ApiPropertyOptional({ example: '+1 234 567 8900' })
  @Column({ nullable: true })
  phone: string;

  @ApiPropertyOptional({ example: 'San Francisco, CA' })
  @Column({ nullable: true })
  location: string;

  @ApiPropertyOptional({ example: 'United States' })
  @Column({ nullable: true })
  country: string;

  @ApiPropertyOptional({ example: 'https://example.com/avatar.jpg' })
  @Column({ nullable: true })
  avatarUrl: string;

  @ApiPropertyOptional({ example: 'https://example.com/resume.pdf' })
  @Column({ nullable: true })
  resumeUrl: string;

  @ApiPropertyOptional({ example: 5 })
  @Column({ nullable: true })
  yearsOfExperience: number;

  @ApiPropertyOptional({ example: true })
  @Column({ nullable: true })
  openToWork: boolean;

  @ApiPropertyOptional({ example: ['English', 'Spanish'], type: [String] })
  @Column({ type: 'simple-array', nullable: true })
  languages: string[];

  @ApiPropertyOptional({ example: ['Open Source', 'Hiking', 'Reading'], type: [String] })
  @Column({ type: 'simple-array', nullable: true })
  interests: string[];

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  @UpdateDateColumn()
  updatedAt: Date;
}
