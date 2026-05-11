import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum MessageStatus {
  UNREAD = 'Unread',
  READ = 'Read',
  REPLIED = 'Replied',
  ARCHIVED = 'Archived',
  SPAM = 'Spam',
}

@Entity('contact_messages')
export class ContactMessage {
  @ApiProperty({ example: 'uuid-v4' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'Alice Johnson' })
  @Column()
  name: string;

  @ApiProperty({ example: 'alice@company.com' })
  @Column()
  email: string;

  @ApiPropertyOptional({ example: '+1 555 000 1111' })
  @Column({ nullable: true })
  phone: string;

  @ApiProperty({ example: 'Collaboration Opportunity' })
  @Column()
  subject: string;

  @ApiProperty({ example: 'Hi, I came across your portfolio and would love to discuss a project...' })
  @Column({ type: 'text' })
  message: string;

  @ApiPropertyOptional({ example: 'Acme Corp' })
  @Column({ nullable: true })
  company: string;

  @ApiProperty({ enum: MessageStatus, example: MessageStatus.UNREAD })
  @Column({ type: 'enum', enum: MessageStatus, default: MessageStatus.UNREAD })
  status: MessageStatus;

  @ApiPropertyOptional({ example: '192.168.1.1' })
  @Column({ nullable: true })
  ipAddress: string;

  @ApiPropertyOptional({ example: 'Follow up on Thursday.' })
  @Column({ nullable: true, type: 'text' })
  adminNotes: string;

  @ApiPropertyOptional({ example: '2024-01-05T10:00:00.000Z' })
  @Column({ nullable: true })
  repliedAt: Date;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  @UpdateDateColumn()
  updatedAt: Date;
}
