import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'admin@portfolio.com', description: 'Admin email address' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Admin@123456', description: 'Admin password' })
  @IsString()
  @MinLength(6)
  password: string;
}
