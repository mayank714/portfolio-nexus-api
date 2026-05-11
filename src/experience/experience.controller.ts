import { Controller, Get, Post, Put, Delete, Body, Param, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ExperienceService } from './experience.service';
import { CreateWorkExperienceDto } from './dto/create-work-experience.dto';
import { UpdateWorkExperienceDto } from './dto/update-work-experience.dto';
import { Public } from '../common/decorators/public.decorator';

@ApiTags('Experience')
@Controller('experience')
export class ExperienceController {
  constructor(private readonly experienceService: ExperienceService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get all work experiences' })
  findAll() { return this.experienceService.findAll(); }

  @Get('admin/all')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get all work experiences (Admin)' })
  findAllAdmin() { return this.experienceService.findAllAdmin(); }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get work experience by ID' })
  @ApiResponse({ status: 404, description: 'Not found' })
  findOne(@Param('id', ParseUUIDPipe) id: string) { return this.experienceService.findOne(id); }

  @Post()
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Create work experience (Admin)' })
  create(@Body() dto: CreateWorkExperienceDto) { return this.experienceService.create(dto); }

  @Put(':id')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Update work experience (Admin)' })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateWorkExperienceDto) {
    return this.experienceService.update(id, dto);
  }

  @Delete(':id')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Delete work experience (Admin)' })
  remove(@Param('id', ParseUUIDPipe) id: string) { return this.experienceService.remove(id); }
}
