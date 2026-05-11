import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsEnum, IsOptional, IsBoolean, IsNumber, Min, Max } from 'class-validator';
import { RelationshipType } from '../entities/testimonial.entity';

export class CreateTestimonialDto {
  @ApiProperty({ example: 'Jane Smith' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Engineering Manager' })
  @IsString()
  position: string;

  @ApiProperty({ example: 'Meta' })
  @IsString()
  company: string;

  @ApiPropertyOptional({ example: 'https://example.com/jane.jpg' })
  @IsOptional()
  @IsString()
  avatarUrl?: string;

  @ApiPropertyOptional({ example: 'https://linkedin.com/in/janesmith' })
  @IsOptional()
  @IsString()
  linkedinUrl?: string;

  @ApiProperty({ example: 'John is an exceptional engineer who delivered outstanding results...' })
  @IsString()
  content: string;

  @ApiPropertyOptional({ example: 5, minimum: 1, maximum: 5 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(5)
  rating?: number;

  @ApiPropertyOptional({ enum: RelationshipType, example: RelationshipType.MANAGER })
  @IsOptional()
  @IsEnum(RelationshipType)
  relationship?: RelationshipType;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  approved?: boolean;

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
