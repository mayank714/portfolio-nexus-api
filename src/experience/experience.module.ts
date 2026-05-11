import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExperienceController } from './experience.controller';
import { ExperienceService } from './experience.service';
import { WorkExperience } from './entities/work-experience.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WorkExperience])],
  controllers: [ExperienceController],
  providers: [ExperienceService],
})
export class ExperienceModule {}
