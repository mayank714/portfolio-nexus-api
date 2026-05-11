import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsEnum, IsOptional, IsBoolean, IsDateString, IsNumber } from 'class-validator';
import { AchievementCategory } from '../entities/achievement.entity';

export class CreateAchievementDto {
  @ApiProperty({ example: '1st Place - National Hackathon 2023' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'Won first place out of 500+ teams for building an AI-powered accessibility tool.' })
  @IsString()
  description: string;

  @ApiPropertyOptional({ enum: AchievementCategory, example: AchievementCategory.HACKATHON })
  @IsOptional()
  @IsEnum(AchievementCategory)
  category?: AchievementCategory;

  @ApiPropertyOptional({ example: 'MLH / Major League Hacking' })
  @IsOptional()
  @IsString()
  organization?: string;

  @ApiPropertyOptional({ example: 'https://mlh.io/logo.png' })
  @IsOptional()
  @IsString()
  organizationLogoUrl?: string;

  @ApiProperty({ example: '2023-11-15' })
  @IsDateString()
  date: string;

  @ApiPropertyOptional({ example: 'https://devpost.com/project' })
  @IsOptional()
  @IsString()
  url?: string;

  @ApiPropertyOptional({ example: 'https://example.com/certificate.png' })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiPropertyOptional({ example: '1st Place' })
  @IsOptional()
  @IsString()
  rank?: string;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  featured?: boolean;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  isVisible?: boolean;

  @ApiPropertyOptional({ example: 0 })
  @IsOptional()
  @IsNumber()
  sortOrder?: number;
}
