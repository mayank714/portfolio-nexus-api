import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean, IsArray, IsDateString } from 'class-validator';

export class CreateCertificationDto {
  @ApiProperty({ example: 'AWS Solutions Architect – Associate' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Amazon Web Services' })
  @IsString()
  issuer: string;

  @ApiPropertyOptional({ example: 'https://aws.amazon.com/logo.png' })
  @IsOptional()
  @IsString()
  issuerLogoUrl?: string;

  @ApiProperty({ example: '2023-08-01' })
  @IsDateString()
  issueDate: string;

  @ApiPropertyOptional({ example: '2026-08-01' })
  @IsOptional()
  @IsDateString()
  expiryDate?: string;

  @ApiPropertyOptional({ example: false })
  @IsOptional()
  @IsBoolean()
  doesNotExpire?: boolean;

  @ApiPropertyOptional({ example: 'ABC123XYZ' })
  @IsOptional()
  @IsString()
  credentialId?: string;

  @ApiPropertyOptional({ example: 'https://aws.amazon.com/verification/ABC123' })
  @IsOptional()
  @IsString()
  credentialUrl?: string;

  @ApiPropertyOptional({ example: 'https://example.com/cert.png' })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiPropertyOptional({ type: [String], example: ['EC2', 'S3', 'Lambda', 'CloudFormation'] })
  @IsOptional()
  @IsArray()
  skills?: string[];

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
  sortOrder?: number;
}
