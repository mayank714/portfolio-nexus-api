import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsOptional,
  IsBoolean,
  IsNumber,
  IsArray,
  MinLength,
} from 'class-validator';

export class CreateProfileDto {
  @ApiProperty({ example: 'John', description: 'First name' })
  @IsString()
  @MinLength(1)
  firstName: string;

  @ApiProperty({ example: 'Doe', description: 'Last name' })
  @IsString()
  lastName: string;

  @ApiProperty({ example: 'Full Stack Developer', description: 'Professional title' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'Passionate developer with 5+ years of experience...', description: 'Full biography' })
  @IsString()
  bio: string;

  @ApiPropertyOptional({ example: 'Building scalable web apps.', description: 'Short bio for hero section' })
  @IsOptional()
  @IsString()
  shortBio?: string;

  @ApiPropertyOptional({ example: 'john@example.com' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ example: '+1 234 567 8900' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({ example: 'San Francisco, CA' })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiPropertyOptional({ example: 'United States' })
  @IsOptional()
  @IsString()
  country?: string;

  @ApiPropertyOptional({ example: 'https://example.com/avatar.jpg' })
  @IsOptional()
  @IsString()
  avatarUrl?: string;

  @ApiPropertyOptional({ example: 'https://example.com/resume.pdf' })
  @IsOptional()
  @IsString()
  resumeUrl?: string;

  @ApiPropertyOptional({ example: 5 })
  @IsOptional()
  @IsNumber()
  yearsOfExperience?: number;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  openToWork?: boolean;

  @ApiPropertyOptional({ example: ['English', 'Spanish'], type: [String] })
  @IsOptional()
  @IsArray()
  languages?: string[];

  @ApiPropertyOptional({ example: ['Reading', 'Hiking', 'Open Source'], type: [String] })
  @IsOptional()
  @IsArray()
  interests?: string[];
}
