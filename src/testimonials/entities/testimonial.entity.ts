import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum RelationshipType {
  COLLEAGUE = 'Colleague',
  MANAGER = 'Manager',
  DIRECT_REPORT = 'Direct Report',
  CLIENT = 'Client',
  MENTOR = 'Mentor',
  MENTEE = 'Mentee',
  PROFESSOR = 'Professor',
  CLASSMATE = 'Classmate',
  OTHER = 'Other',
}

@Entity('testimonials')
export class Testimonial {
  @ApiProperty({ example: 'uuid-v4' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'Jane Smith' })
  @Column()
  name: string;

  @ApiProperty({ example: 'Engineering Manager' })
  @Column()
  position: string;

  @ApiProperty({ example: 'Meta' })
  @Column()
  company: string;

  @ApiPropertyOptional({ example: 'https://example.com/jane.jpg' })
  @Column({ nullable: true })
  avatarUrl: string;

  @ApiPropertyOptional({ example: 'https://linkedin.com/in/janesmith' })
  @Column({ nullable: true })
  linkedinUrl: string;

  @ApiProperty({ example: 'John is an exceptional engineer who consistently delivered outstanding results...' })
  @Column({ type: 'text' })
  content: string;

  @ApiProperty({ example: 5.0, description: 'Rating 1–5' })
  @Column({ type: 'decimal', precision: 2, scale: 1, default: 5.0 })
  rating: number;

  @ApiProperty({ enum: RelationshipType, example: RelationshipType.MANAGER })
  @Column({ type: 'enum', enum: RelationshipType, default: RelationshipType.COLLEAGUE })
  relationship: RelationshipType;

  @ApiProperty({ example: true })
  @Column({ default: false })
  approved: boolean;

  @ApiProperty({ example: false })
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
