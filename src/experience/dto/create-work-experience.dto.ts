import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsEnum, IsOptional, IsBoolean, IsArray, IsDateString } from 'class-validator';
import { EmploymentType } from '../entities/work-experience.entity';

export class CreateWorkExperienceDto {
  @ApiProperty({ example: 'Google LLC' })
  @IsString()
  company: string;

  @ApiPropertyOptional({ example: 'https://google.com/logo.png' })
  @IsOptional()
  @IsString()
  companyLogoUrl?: string;

  @ApiPropertyOptional({ example: 'https://google.com' })
  @IsOptional()
  @IsString()
  companyUrl?: string;

  @ApiProperty({ example: 'Senior Software Engineer' })
  @IsString()
  position: string;

  @ApiProperty({ example: 'Led development of core search infrastructure...' })
  @IsString()
  description: string;

  @ApiPropertyOptional({ type: [String], example: ['Built microservices', 'Led team of 5'] })
  @IsOptional()
  @IsArray()
  responsibilities?: string[];

  @ApiPropertyOptional({ type: [String], example: ['Reduced latency by 40%', 'Shipped 3 major features'] })
  @IsOptional()
  @IsArray()
  achievements?: string[];

  @ApiPropertyOptional({ type: [String], example: ['Go', 'Kubernetes', 'GCP'] })
  @IsOptional()
  @IsArray()
  techStack?: string[];

  @ApiPropertyOptional({ enum: EmploymentType, example: EmploymentType.FULL_TIME })
  @IsOptional()
  @IsEnum(EmploymentType)
  employmentType?: EmploymentType;

  @ApiPropertyOptional({ example: 'Mountain View, CA' })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  remote?: boolean;

  @ApiProperty({ example: '2021-06-01' })
  @IsDateString()
  startDate: string;

  @ApiPropertyOptional({ example: '2024-01-01' })
  @IsOptional()
  @IsDateString()
  endDate?: string;

  @ApiPropertyOptional({ example: false })
  @IsOptional()
  @IsBoolean()
  current?: boolean;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  isVisible?: boolean;

  @ApiPropertyOptional({ example: 0 })
  @IsOptional()
  sortOrder?: number;
}
