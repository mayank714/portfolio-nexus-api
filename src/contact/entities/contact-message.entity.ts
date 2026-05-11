import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum MessageStatus {
  UNREAD = 'Unread',
  READ = 'Read',
  REPLIED = 'Replied',
  ARCHIVED = 'Archived',
  SPAM = 'Spam',
}

@Entity('contact_messages')
export class ContactMessage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column()
  subject: string;

  @Column({ type: 'text' })
  message: string;

  @Column({ nullable: true })
  company: string;

  @Column({
    type: 'enum',
    enum: MessageStatus,
    default: MessageStatus.UNREAD,
  })
  status: MessageStatus;

  @Column({ nullable: true })
  ipAddress: string;

  @Column({ nullable: true, type: 'text' })
  adminNotes: string;

  @Column({ nullable: true })
  repliedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
