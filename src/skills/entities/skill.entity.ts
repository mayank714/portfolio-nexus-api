import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum SkillCategory {
  FRONTEND = 'Frontend',
  BACKEND = 'Backend',
  DATABASE = 'Database',
  DEVOPS = 'DevOps',
  MOBILE = 'Mobile',
  CLOUD = 'Cloud',
  TOOLS = 'Tools',
  LANGUAGES = 'Languages',
  FRAMEWORKS = 'Frameworks',
  TESTING = 'Testing',
  OTHER = 'Other',
}

export enum ProficiencyLevel {
  BEGINNER = 'Beginner',
  INTERMEDIATE = 'Intermediate',
  ADVANCED = 'Advanced',
  EXPERT = 'Expert',
}

@Entity('skills')
export class Skill {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: SkillCategory, default: SkillCategory.OTHER })
  category: SkillCategory;

  @Column({
    type: 'enum',
    enum: ProficiencyLevel,
    default: ProficiencyLevel.INTERMEDIATE,
  })
  proficiency: ProficiencyLevel;

  @Column({ nullable: true })
  proficiencyPercent: number;

  @Column({ nullable: true })
  iconUrl: string;

  @Column({ nullable: true })
  color: string;

  @Column({ default: 0 })
  yearsOfExperience: number;

  @Column({ default: true })
  isVisible: boolean;

  @Column({ default: 0 })
  sortOrder: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
