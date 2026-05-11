import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsEnum, IsOptional, IsBoolean, IsNumber } from 'class-validator';
import { SocialPlatform } from '../entities/social-link.entity';

export class CreateSocialLinkDto {
  @ApiProperty({ enum: SocialPlatform, example: SocialPlatform.GITHUB })
  @IsEnum(SocialPlatform)
  platform: SocialPlatform;

  @ApiProperty({ example: 'https://github.com/johndoe' })
  @IsString()
  url: string;

  @ApiPropertyOptional({ example: 'johndoe' })
  @IsOptional()
  @IsString()
  displayName?: string;

  @ApiPropertyOptional({ example: 'fab fa-github' })
  @IsOptional()
  @IsString()
  iconClass?: string;

  @ApiPropertyOptional({ example: '#333333' })
  @IsOptional()
  @IsString()
  color?: string;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  isVisible?: boolean;

  @ApiPropertyOptional({ example: 0 })
  @IsOptional()
  @IsNumber()
  sortOrder?: number;
}
