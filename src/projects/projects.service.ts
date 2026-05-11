import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project, ProjectCategory } from './entities/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) {}

  async create(dto: CreateProjectDto): Promise<Project> {
    const project = this.projectRepository.create(dto);
    return this.projectRepository.save(project);
  }

  async findAll(featured?: boolean, category?: ProjectCategory): Promise<Project[]> {
    const query = this.projectRepository.createQueryBuilder('project')
      .where('project.isVisible = :isVisible', { isVisible: true })
      .orderBy('project.featured', 'DESC')
      .addOrderBy('project.sortOrder', 'ASC')
      .addOrderBy('project.createdAt', 'DESC');
    if (featured !== undefined) query.andWhere('project.featured = :featured', { featured });
    if (category) query.andWhere('project.category = :category', { category });
    return query.getMany();
  }

  async findAllAdmin(): Promise<Project[]> {
    return this.projectRepository.find({
      order: { featured: 'DESC', sortOrder: 'ASC', createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Project> {
    const project = await this.projectRepository.findOne({ where: { id } });
    if (!project) throw new NotFoundException(`Project #${id} not found`);
    return project;
  }

  async update(id: string, dto: UpdateProjectDto): Promise<Project> {
    const project = await this.findOne(id);
    Object.assign(project, dto);
    return this.projectRepository.save(project);
  }

  async remove(id: string): Promise<void> {
    const project = await this.findOne(id);
    await this.projectRepository.remove(project);
  }

  async incrementLikes(id: string): Promise<Project> {
    const project = await this.findOne(id);
    project.likes += 1;
    return this.projectRepository.save(project);
  }
}
