import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

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
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  position: string;

  @Column()
  company: string;

  @Column({ nullable: true })
  avatarUrl: string;

  @Column({ nullable: true })
  linkedinUrl: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'decimal', precision: 2, scale: 1, default: 5.0 })
  rating: number;

  @Column({
    type: 'enum',
    enum: RelationshipType,
    default: RelationshipType.COLLEAGUE,
  })
  relationship: RelationshipType;

  @Column({ default: false })
  approved: boolean;

  @Column({ default: false })
  featured: boolean;

  @Column({ default: true })
  isVisible: boolean;

  @Column({ default: 0 })
  sortOrder: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
