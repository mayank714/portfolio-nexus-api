import { Controller, Get, Post, Put, Delete, Body, Param, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { ExperienceService } from './experience.service';
import { CreateWorkExperienceDto } from './dto/create-work-experience.dto';
import { UpdateWorkExperienceDto } from './dto/update-work-experience.dto';
import { WorkExperience } from './entities/work-experience.entity';
import { Public } from '../common/decorators/public.decorator';

@ApiTags('Experience')
@Controller('experience')
export class ExperienceController {
  constructor(private readonly experienceService: ExperienceService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get all work experiences', description: 'Returns all visible work experiences sorted by most recent first.' })
  @ApiResponse({ status: 200, description: 'Work experiences retrieved', type: [WorkExperience] })
  findAll() { return this.experienceService.findAll(); }

  @Get('admin/all')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get all work experiences (Admin)', description: 'Returns all work experiences including hidden ones.' })
  @ApiResponse({ status: 200, description: 'All work experiences', type: [WorkExperience] })
  @ApiResponse({ status: 401, description: 'Unauthorized – Bearer token required' })
  findAllAdmin() { return this.experienceService.findAllAdmin(); }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get work experience by ID' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid', description: 'WorkExperience UUID' })
  @ApiResponse({ status: 200, description: 'Work experience retrieved', type: WorkExperience })
  @ApiResponse({ status: 404, description: 'Not found' })
  findOne(@Param('id', ParseUUIDPipe) id: string) { return this.experienceService.findOne(id); }

  @Post()
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Create work experience (Admin)' })
  @ApiResponse({ status: 201, description: 'Work experience created', type: WorkExperience })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 401, description: 'Unauthorized – Bearer token required' })
  create(@Body() dto: CreateWorkExperienceDto) { return this.experienceService.create(dto); }

  @Put(':id')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Update work experience (Admin)' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid', description: 'WorkExperience UUID' })
  @ApiResponse({ status: 200, description: 'Work experience updated', type: WorkExperience })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 401, description: 'Unauthorized – Bearer token required' })
  @ApiResponse({ status: 404, description: 'Not found' })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateWorkExperienceDto) {
    return this.experienceService.update(id, dto);
  }

  @Delete(':id')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Delete work experience (Admin)' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid', description: 'WorkExperience UUID' })
  @ApiResponse({ status: 200, description: 'Work experience deleted' })
  @ApiResponse({ status: 401, description: 'Unauthorized – Bearer token required' })
  @ApiResponse({ status: 404, description: 'Not found' })
  remove(@Param('id', ParseUUIDPipe) id: string) { return this.experienceService.remove(id); }
}
