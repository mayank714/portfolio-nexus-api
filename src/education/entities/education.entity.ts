import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

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
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  institution: string;

  @Column({ nullable: true })
  institutionLogoUrl: string;

  @Column({ nullable: true })
  institutionUrl: string;

  @Column()
  degree: string;

  @Column({ type: 'enum', enum: DegreeType, default: DegreeType.BACHELOR })
  degreeType: DegreeType;

  @Column()
  fieldOfStudy: string;

  @Column({ nullable: true })
  grade: string;

  @Column({ nullable: true })
  gradeScale: string;

  @Column({ nullable: true })
  location: string;

  @Column({ type: 'date' })
  startDate: Date;

  @Column({ type: 'date', nullable: true })
  endDate: Date;

  @Column({ default: false })
  current: boolean;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'simple-array', nullable: true })
  activities: string[];

  @Column({ type: 'simple-array', nullable: true })
  subjects: string[];

  @Column({ type: 'simple-array', nullable: true })
  honors: string[];

  @Column({ default: true })
  isVisible: boolean;

  @Column({ default: 0 })
  sortOrder: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
