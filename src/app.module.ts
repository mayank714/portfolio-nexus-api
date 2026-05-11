import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';
import { getDatabaseConfig } from './config/database.config';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { SkillsModule } from './skills/skills.module';
import { ProjectsModule } from './projects/projects.module';
import { ExperienceModule } from './experience/experience.module';
import { EducationModule } from './education/education.module';
import { AchievementsModule } from './achievements/achievements.module';
import { CertificationsModule } from './certifications/certifications.module';
import { TestimonialsModule } from './testimonials/testimonials.module';
import { ContactModule } from './contact/contact.module';
import { SocialLinksModule } from './social-links/social-links.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getDatabaseConfig,
    }),
    AuthModule,
    ProfileModule,
    SkillsModule,
    ProjectsModule,
    ExperienceModule,
    EducationModule,
    AchievementsModule,
    CertificationsModule,
    TestimonialsModule,
    ContactModule,
    SocialLinksModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
