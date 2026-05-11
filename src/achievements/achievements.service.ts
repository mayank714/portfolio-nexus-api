import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Achievement, AchievementCategory } from './entities/achievement.entity';
import { CreateAchievementDto } from './dto/create-achievement.dto';
import { UpdateAchievementDto } from './dto/update-achievement.dto';

@Injectable()
export class AchievementsService {
  constructor(
    @InjectRepository(Achievement)
    private achievementRepository: Repository<Achievement>,
  ) {}

  async create(dto: CreateAchievementDto): Promise<Achievement> {
    const achievement = this.achievementRepository.create(dto);
    return this.achievementRepository.save(achievement);
  }

  async findAll(featured?: boolean, category?: AchievementCategory): Promise<Achievement[]> {
    const query = this.achievementRepository.createQueryBuilder('achievement')
      .where('achievement.isVisible = :isVisible', { isVisible: true })
      .orderBy('achievement.featured', 'DESC')
      .addOrderBy('achievement.date', 'DESC');
    if (featured !== undefined) query.andWhere('achievement.featured = :featured', { featured });
    if (category) query.andWhere('achievement.category = :category', { category });
    return query.getMany();
  }

  async findAllAdmin(): Promise<Achievement[]> {
    return this.achievementRepository.find({ order: { featured: 'DESC', date: 'DESC' } });
  }

  async findOne(id: string): Promise<Achievement> {
    const achievement = await this.achievementRepository.findOne({ where: { id } });
    if (!achievement) throw new NotFoundException(`Achievement #${id} not found`);
    return achievement;
  }

  async update(id: string, dto: UpdateAchievementDto): Promise<Achievement> {
    const achievement = await this.findOne(id);
    Object.assign(achievement, dto);
    return this.achievementRepository.save(achievement);
  }

  async remove(id: string): Promise<void> {
    const achievement = await this.findOne(id);
    await this.achievementRepository.remove(achievement);
  }
}
