import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Education } from './entities/education.entity';
import { CreateEducationDto } from './dto/create-education.dto';
import { UpdateEducationDto } from './dto/update-education.dto';

@Injectable()
export class EducationService {
  constructor(
    @InjectRepository(Education)
    private educationRepository: Repository<Education>,
  ) {}

  async create(dto: CreateEducationDto): Promise<Education> {
    const edu = this.educationRepository.create(dto);
    return this.educationRepository.save(edu);
  }

  async findAll(): Promise<Education[]> {
    return this.educationRepository.find({
      where: { isVisible: true },
      order: { current: 'DESC', startDate: 'DESC' },
    });
  }

  async findAllAdmin(): Promise<Education[]> {
    return this.educationRepository.find({ order: { current: 'DESC', startDate: 'DESC' } });
  }

  async findOne(id: string): Promise<Education> {
    const edu = await this.educationRepository.findOne({ where: { id } });
    if (!edu) throw new NotFoundException(`Education #${id} not found`);
    return edu;
  }

  async update(id: string, dto: UpdateEducationDto): Promise<Education> {
    const edu = await this.findOne(id);
    Object.assign(edu, dto);
    return this.educationRepository.save(edu);
  }

  async remove(id: string): Promise<void> {
    const edu = await this.findOne(id);
    await this.educationRepository.remove(edu);
  }
}
