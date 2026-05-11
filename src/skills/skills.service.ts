import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Skill, SkillCategory } from './entities/skill.entity';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';

@Injectable()
export class SkillsService {
  constructor(
    @InjectRepository(Skill)
    private skillRepository: Repository<Skill>,
  ) {}

  async create(dto: CreateSkillDto): Promise<Skill> {
    const skill = this.skillRepository.create(dto);
    return this.skillRepository.save(skill);
  }

  async findAll(category?: SkillCategory): Promise<Skill[]> {
    const query = this.skillRepository.createQueryBuilder('skill')
      .where('skill.isVisible = :isVisible', { isVisible: true })
      .orderBy('skill.category', 'ASC')
      .addOrderBy('skill.sortOrder', 'ASC');
    if (category) query.andWhere('skill.category = :category', { category });
    return query.getMany();
  }

  async findAllAdmin(): Promise<Skill[]> {
    return this.skillRepository.find({ order: { category: 'ASC', sortOrder: 'ASC' } });
  }

  async findGroupedByCategory(): Promise<Record<string, Skill[]>> {
    const skills = await this.findAll();
    return skills.reduce((acc, skill) => {
      if (!acc[skill.category]) acc[skill.category] = [];
      acc[skill.category].push(skill);
      return acc;
    }, {} as Record<string, Skill[]>);
  }

  async findOne(id: string): Promise<Skill> {
    const skill = await this.skillRepository.findOne({ where: { id } });
    if (!skill) throw new NotFoundException(`Skill #${id} not found`);
    return skill;
  }

  async update(id: string, dto: UpdateSkillDto): Promise<Skill> {
    const skill = await this.findOne(id);
    Object.assign(skill, dto);
    return this.skillRepository.save(skill);
  }

  async remove(id: string): Promise<void> {
    const skill = await this.findOne(id);
    await this.skillRepository.remove(skill);
  }
}
