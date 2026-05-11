import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional, MinLength } from 'class-validator';

export class CreateContactMessageDto {
  @ApiProperty({ example: 'Alice Johnson' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'alice@company.com' })
  @IsEmail()
  email: string;

  @ApiPropertyOptional({ example: '+1 555 000 1111' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ example: 'Collaboration Opportunity' })
  @IsString()
  subject: string;

  @ApiProperty({ example: 'Hi, I came across your portfolio and would love to discuss a project...' })
  @IsString()
  @MinLength(20)
  message: string;

  @ApiPropertyOptional({ example: 'Acme Corp' })
  @IsOptional()
  @IsString()
  company?: string;
}
