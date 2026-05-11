import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('certifications')
export class Certification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  issuer: string;

  @Column({ nullable: true })
  issuerLogoUrl: string;

  @Column({ type: 'date' })
  issueDate: Date;

  @Column({ type: 'date', nullable: true })
  expiryDate: Date;

  @Column({ default: false })
  doesNotExpire: boolean;

  @Column({ nullable: true })
  credentialId: string;

  @Column({ nullable: true })
  credentialUrl: string;

  @Column({ nullable: true })
  imageUrl: string;

  @Column({ type: 'simple-array', nullable: true })
  skills: string[];

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
