import { Controller, Get, Post, Put, Body } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Public } from '../common/decorators/public.decorator';

@ApiTags('Profile')
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get profile', description: 'Get the portfolio owner profile' })
  @ApiResponse({ status: 200, description: 'Profile retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Profile not found' })
  findOne() {
    return this.profileService.findOne();
  }

  @Post()
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Create profile (Admin)', description: 'Create the portfolio profile' })
  @ApiResponse({ status: 201, description: 'Profile created successfully' })
  create(@Body() dto: CreateProfileDto) {
    return this.profileService.create(dto);
  }

  @Put()
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Update profile (Admin)', description: 'Update the portfolio profile. Creates one if it doesn\'t exist.' })
  @ApiResponse({ status: 200, description: 'Profile updated successfully' })
  update(@Body() dto: UpdateProfileDto) {
    return this.profileService.update(dto);
  }
}
