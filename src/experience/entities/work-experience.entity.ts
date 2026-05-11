import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

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
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  company: string;

  @Column({ nullable: true })
  companyLogoUrl: string;

  @Column({ nullable: true })
  companyUrl: string;

  @Column()
  position: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'simple-array', nullable: true })
  responsibilities: string[];

  @Column({ type: 'simple-array', nullable: true })
  achievements: string[];

  @Column({ type: 'simple-array', nullable: true })
  techStack: string[];

  @Column({
    type: 'enum',
    enum: EmploymentType,
    default: EmploymentType.FULL_TIME,
  })
  employmentType: EmploymentType;

  @Column({ nullable: true })
  location: string;

  @Column({ default: false })
  remote: boolean;

  @Column({ type: 'date' })
  startDate: Date;

  @Column({ type: 'date', nullable: true })
  endDate: Date;

  @Column({ default: false })
  current: boolean;

  @Column({ default: true })
  isVisible: boolean;

  @Column({ default: 0 })
  sortOrder: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
