import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Admin } from '../admin/entities/admin.entity';
import { Profile } from '../profile/entities/profile.entity';
import { Skill } from '../skills/entities/skill.entity';
import { Project } from '../projects/entities/project.entity';
import { WorkExperience } from '../experience/entities/work-experience.entity';
import { Education } from '../education/entities/education.entity';
import { Achievement } from '../achievements/entities/achievement.entity';
import { Certification } from '../certifications/entities/certification.entity';
import { Testimonial } from '../testimonials/entities/testimonial.entity';
import { ContactMessage } from '../contact/entities/contact-message.entity';
import { SocialLink } from '../social-links/entities/social-link.entity';

export const getDatabaseConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'mysql',
  host: configService.get<string>('DB_HOST', 'localhost'),
  port: configService.get<number>('DB_PORT', 3306),
  username: configService.get<string>('DB_USERNAME', 'root'),
  password: configService.get<string>('DB_PASSWORD', ''),
  database: configService.get<string>('DB_NAME', 'portfolio_nexus'),
  entities: [
    Admin,
    Profile,
    Skill,
    Project,
    WorkExperience,
    Education,
    Achievement,
    Certification,
    Testimonial,
    ContactMessage,
    SocialLink,
  ],
  synchronize: configService.get<string>('NODE_ENV') !== 'production',
  logging: configService.get<string>('NODE_ENV') === 'development',
  charset: 'utf8mb4',
  timezone: '+00:00',
});
