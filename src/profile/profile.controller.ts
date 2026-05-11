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
import { Profile } from './entities/profile.entity';
import { Public } from '../common/decorators/public.decorator';

@ApiTags('Profile')
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Public()
  @Get()
  @ApiOperation({
    summary: 'Get profile',
    description: 'Returns the portfolio owner\'s full profile. This endpoint is public.',
  })
  @ApiResponse({ status: 200, description: 'Profile retrieved successfully', type: Profile })
  @ApiResponse({ status: 404, description: 'Profile not found' })
  findOne() {
    return this.profileService.findOne();
  }

  @Post()
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Create profile (Admin)',
    description: 'Creates the portfolio profile. Only one profile is allowed.',
  })
  @ApiResponse({ status: 201, description: 'Profile created successfully', type: Profile })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 401, description: 'Unauthorized – Bearer token required' })
  create(@Body() dto: CreateProfileDto) {
    return this.profileService.create(dto);
  }

  @Put()
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Update profile (Admin)',
    description: 'Updates the existing profile, or creates one if it does not exist (upsert).',
  })
  @ApiResponse({ status: 200, description: 'Profile updated successfully', type: Profile })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 401, description: 'Unauthorized – Bearer token required' })
  update(@Body() dto: UpdateProfileDto) {
    return this.profileService.update(dto);
  }
}
