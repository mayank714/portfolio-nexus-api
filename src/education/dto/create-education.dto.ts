import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsEnum, IsOptional, IsBoolean, IsArray, IsDateString } from 'class-validator';
import { DegreeType } from '../entities/education.entity';

export class CreateEducationDto {
  @ApiProperty({ example: 'Massachusetts Institute of Technology' })
  @IsString()
  institution: string;

  @ApiPropertyOptional({ example: 'https://mit.edu/logo.png' })
  @IsOptional()
  @IsString()
  institutionLogoUrl?: string;

  @ApiPropertyOptional({ example: 'https://mit.edu' })
  @IsOptional()
  @IsString()
  institutionUrl?: string;

  @ApiProperty({ example: 'Bachelor of Science in Computer Science' })
  @IsString()
  degree: string;

  @ApiPropertyOptional({ enum: DegreeType, example: DegreeType.BACHELOR })
  @IsOptional()
  @IsEnum(DegreeType)
  degreeType?: DegreeType;

  @ApiProperty({ example: 'Computer Science' })
  @IsString()
  fieldOfStudy: string;

  @ApiPropertyOptional({ example: '3.9/4.0' })
  @IsOptional()
  @IsString()
  grade?: string;

  @ApiPropertyOptional({ example: '4.0' })
  @IsOptional()
  @IsString()
  gradeScale?: string;

  @ApiPropertyOptional({ example: 'Cambridge, MA, USA' })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiProperty({ example: '2018-09-01' })
  @IsDateString()
  startDate: string;

  @ApiPropertyOptional({ example: '2022-05-15' })
  @IsOptional()
  @IsDateString()
  endDate?: string;

  @ApiPropertyOptional({ example: false })
  @IsOptional()
  @IsBoolean()
  current?: boolean;

  @ApiPropertyOptional({ example: 'Focused on distributed systems and machine learning.' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ type: [String], example: ['IEEE Student Member', 'Robotics Club President'] })
  @IsOptional()
  @IsArray()
  activities?: string[];

  @ApiPropertyOptional({ type: [String], example: ['Algorithms', 'OS', 'Computer Vision'] })
  @IsOptional()
  @IsArray()
  subjects?: string[];

  @ApiPropertyOptional({ type: [String], example: ["Dean's List", 'Summa Cum Laude'] })
  @IsOptional()
  @IsArray()
  honors?: string[];

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  isVisible?: boolean;

  @ApiPropertyOptional({ example: 0 })
  @IsOptional()
  sortOrder?: number;
}
