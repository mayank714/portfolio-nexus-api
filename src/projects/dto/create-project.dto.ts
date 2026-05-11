import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsEnum, IsOptional, IsBoolean, IsArray, IsNumber, IsDateString } from 'class-validator';
import { ProjectStatus, ProjectCategory } from '../entities/project.entity';

export class CreateProjectDto {
  @ApiProperty({ example: 'E-Commerce Platform' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'A full-featured e-commerce platform built with React and Node.js...' })
  @IsString()
  description: string;

  @ApiPropertyOptional({ example: 'Full-stack e-commerce solution' })
  @IsOptional()
  @IsString()
  shortDescription?: string;

  @ApiProperty({ example: ['React', 'Node.js', 'PostgreSQL', 'Redis'], type: [String] })
  @IsArray()
  techStack: string[];

  @ApiPropertyOptional({ example: 'https://example.com/project.png' })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiPropertyOptional({ example: ['https://example.com/ss1.png'], type: [String] })
  @IsOptional()
  @IsArray()
  screenshots?: string[];

  @ApiPropertyOptional({ example: 'https://my-project.com' })
  @IsOptional()
  @IsString()
  liveUrl?: string;

  @ApiPropertyOptional({ example: 'https://github.com/user/project' })
  @IsOptional()
  @IsString()
  githubUrl?: string;

  @ApiPropertyOptional({ example: 'https://youtube.com/watch?v=...' })
  @IsOptional()
  @IsString()
  demoVideoUrl?: string;

  @ApiPropertyOptional({ enum: ProjectStatus, example: ProjectStatus.COMPLETED })
  @IsOptional()
  @IsEnum(ProjectStatus)
  status?: ProjectStatus;

  @ApiPropertyOptional({ enum: ProjectCategory, example: ProjectCategory.WEB })
  @IsOptional()
  @IsEnum(ProjectCategory)
  category?: ProjectCategory;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  featured?: boolean;

  @ApiPropertyOptional({ example: '2023-01-01' })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiPropertyOptional({ example: '2023-06-01' })
  @IsOptional()
  @IsDateString()
  endDate?: string;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  isVisible?: boolean;

  @ApiPropertyOptional({ example: 0 })
  @IsOptional()
  @IsNumber()
  sortOrder?: number;
}
