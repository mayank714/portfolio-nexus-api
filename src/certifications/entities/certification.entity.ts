import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Entity('certifications')
export class Certification {
  @ApiProperty({ example: 'uuid-v4' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'AWS Solutions Architect – Associate' })
  @Column()
  name: string;

  @ApiProperty({ example: 'Amazon Web Services' })
  @Column()
  issuer: string;

  @ApiPropertyOptional({ example: 'https://aws.amazon.com/logo.png' })
  @Column({ nullable: true })
  issuerLogoUrl: string;

  @ApiProperty({ example: '2023-08-01' })
  @Column({ type: 'date' })
  issueDate: Date;

  @ApiPropertyOptional({ example: '2026-08-01' })
  @Column({ type: 'date', nullable: true })
  expiryDate: Date;

  @ApiProperty({ example: false })
  @Column({ default: false })
  doesNotExpire: boolean;

  @ApiPropertyOptional({ example: 'ABC123XYZ' })
  @Column({ nullable: true })
  credentialId: string;

  @ApiPropertyOptional({ example: 'https://aws.amazon.com/verification/ABC123' })
  @Column({ nullable: true })
  credentialUrl: string;

  @ApiPropertyOptional({ example: 'https://example.com/cert.png' })
  @Column({ nullable: true })
  imageUrl: string;

  @ApiPropertyOptional({ example: ['EC2', 'S3', 'Lambda'], type: [String] })
  @Column({ type: 'simple-array', nullable: true })
  skills: string[];

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
