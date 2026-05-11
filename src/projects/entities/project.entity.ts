import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum ProjectStatus {
  COMPLETED = 'Completed',
  IN_PROGRESS = 'In Progress',
  ARCHIVED = 'Archived',
  PLANNED = 'Planned',
}

export enum ProjectCategory {
  WEB = 'Web',
  MOBILE = 'Mobile',
  DESKTOP = 'Desktop',
  API = 'API',
  DATA_SCIENCE = 'Data Science',
  ML_AI = 'ML/AI',
  OPEN_SOURCE = 'Open Source',
  OTHER = 'Other',
}

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'text', nullable: true })
  shortDescription: string;

  @Column({ type: 'simple-array' })
  techStack: string[];

  @Column({ nullable: true })
  imageUrl: string;

  @Column({ type: 'simple-array', nullable: true })
  screenshots: string[];

  @Column({ nullable: true })
  liveUrl: string;

  @Column({ nullable: true })
  githubUrl: string;

  @Column({ nullable: true })
  demoVideoUrl: string;

  @Column({
    type: 'enum',
    enum: ProjectStatus,
    default: ProjectStatus.COMPLETED,
  })
  status: ProjectStatus;

  @Column({
    type: 'enum',
    enum: ProjectCategory,
    default: ProjectCategory.WEB,
  })
  category: ProjectCategory;

  @Column({ default: false })
  featured: boolean;

  @Column({ nullable: true, type: 'date' })
  startDate: Date;

  @Column({ nullable: true, type: 'date' })
  endDate: Date;

  @Column({ default: 0 })
  likes: number;

  @Column({ default: true })
  isVisible: boolean;

  @Column({ default: 0 })
  sortOrder: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
