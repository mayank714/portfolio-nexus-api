import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkExperience } from './entities/work-experience.entity';
import { CreateWorkExperienceDto } from './dto/create-work-experience.dto';
import { UpdateWorkExperienceDto } from './dto/update-work-experience.dto';

@Injectable()
export class ExperienceService {
  constructor(
    @InjectRepository(WorkExperience)
    private experienceRepository: Repository<WorkExperience>,
  ) {}

  async create(dto: CreateWorkExperienceDto): Promise<WorkExperience> {
    const exp = this.experienceRepository.create(dto);
    return this.experienceRepository.save(exp);
  }

  async findAll(): Promise<WorkExperience[]> {
    return this.experienceRepository.find({
      where: { isVisible: true },
      order: { current: 'DESC', startDate: 'DESC' },
    });
  }

  async findAllAdmin(): Promise<WorkExperience[]> {
    return this.experienceRepository.find({ order: { current: 'DESC', startDate: 'DESC' } });
  }

  async findOne(id: string): Promise<WorkExperience> {
    const exp = await this.experienceRepository.findOne({ where: { id } });
    if (!exp) throw new NotFoundException(`Work experience #${id} not found`);
    return exp;
  }

  async update(id: string, dto: UpdateWorkExperienceDto): Promise<WorkExperience> {
    const exp = await this.findOne(id);
    Object.assign(exp, dto);
    return this.experienceRepository.save(exp);
  }

  async remove(id: string): Promise<void> {
    const exp = await this.findOne(id);
    await this.experienceRepository.remove(exp);
  }
}
