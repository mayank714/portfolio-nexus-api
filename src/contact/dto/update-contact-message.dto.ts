import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { MessageStatus } from '../entities/contact-message.entity';

export class UpdateContactMessageDto {
  @ApiPropertyOptional({ enum: MessageStatus })
  @IsOptional()
  @IsEnum(MessageStatus)
  status?: MessageStatus;

  @ApiPropertyOptional({ example: 'Replied via email on 2024-01-15' })
  @IsOptional()
  @IsString()
  adminNotes?: string;
}
