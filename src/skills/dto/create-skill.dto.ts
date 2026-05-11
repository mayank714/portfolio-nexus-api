import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsEnum, IsOptional, IsNumber, IsBoolean, Min, Max } from 'class-validator';
import { SkillCategory, ProficiencyLevel } from '../entities/skill.entity';

export class CreateSkillDto {
  @ApiProperty({ example: 'TypeScript' })
  @IsString()
  name: string;

  @ApiProperty({ enum: SkillCategory, example: SkillCategory.BACKEND })
  @IsEnum(SkillCategory)
  category: SkillCategory;

  @ApiProperty({ enum: ProficiencyLevel, example: ProficiencyLevel.EXPERT })
  @IsEnum(ProficiencyLevel)
  proficiency: ProficiencyLevel;

  @ApiPropertyOptional({ example: 90, description: 'Proficiency percentage (0-100)' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  proficiencyPercent?: number;

  @ApiPropertyOptional({ example: 'https://cdn.example.com/ts.svg' })
  @IsOptional()
  @IsString()
  iconUrl?: string;

  @ApiPropertyOptional({ example: '#3178c6' })
  @IsOptional()
  @IsString()
  color?: string;

  @ApiPropertyOptional({ example: 4 })
  @IsOptional()
  @IsNumber()
  yearsOfExperience?: number;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  isVisible?: boolean;

  @ApiPropertyOptional({ example: 0 })
  @IsOptional()
  @IsNumber()
  sortOrder?: number;
}
