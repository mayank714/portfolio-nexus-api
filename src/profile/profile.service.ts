import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from './entities/profile.entity';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
  ) {}

  async create(dto: CreateProfileDto): Promise<Profile> {
    const profile = this.profileRepository.create(dto);
    return this.profileRepository.save(profile);
  }

  async findOne(): Promise<Profile> {
    const profile = await this.profileRepository.findOne({ where: {} });
    if (!profile) throw new NotFoundException('Profile not found');
    return profile;
  }

  async update(dto: UpdateProfileDto): Promise<Profile> {
    let profile = await this.profileRepository.findOne({ where: {} });
    if (!profile) {
      profile = this.profileRepository.create(dto as CreateProfileDto);
    } else {
      Object.assign(profile, dto);
    }
    return this.profileRepository.save(profile);
  }
}
