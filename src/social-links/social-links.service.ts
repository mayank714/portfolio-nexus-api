import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SocialLink } from './entities/social-link.entity';
import { CreateSocialLinkDto } from './dto/create-social-link.dto';
import { UpdateSocialLinkDto } from './dto/update-social-link.dto';

@Injectable()
export class SocialLinksService {
  constructor(
    @InjectRepository(SocialLink)
    private socialLinkRepository: Repository<SocialLink>,
  ) {}

  async create(dto: CreateSocialLinkDto): Promise<SocialLink> {
    const link = this.socialLinkRepository.create(dto);
    return this.socialLinkRepository.save(link);
  }

  async findAll(): Promise<SocialLink[]> {
    return this.socialLinkRepository.find({
      where: { isVisible: true },
      order: { sortOrder: 'ASC' },
    });
  }

  async findAllAdmin(): Promise<SocialLink[]> {
    return this.socialLinkRepository.find({ order: { sortOrder: 'ASC' } });
  }

  async findOne(id: string): Promise<SocialLink> {
    const link = await this.socialLinkRepository.findOne({ where: { id } });
    if (!link) throw new NotFoundException(`Social link #${id} not found`);
    return link;
  }

  async update(id: string, dto: UpdateSocialLinkDto): Promise<SocialLink> {
    const link = await this.findOne(id);
    Object.assign(link, dto);
    return this.socialLinkRepository.save(link);
  }

  async remove(id: string): Promise<void> {
    const link = await this.findOne(id);
    await this.socialLinkRepository.remove(link);
  }
}
