import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseUUIDPipe, Patch } from '@nestjs/common';
import {
  ApiTags, ApiOperation, ApiResponse, ApiBearerAuth,
  ApiQuery, ApiParam,
} from '@nestjs/swagger';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project, ProjectCategory } from './entities/project.entity';
import { Public } from '../common/decorators/public.decorator';

@ApiTags('Projects')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Public()
  @Get()
  @ApiOperation({
    summary: 'Get all visible projects',
    description: 'Returns all visible projects. Optionally filter by featured status or category.',
  })
  @ApiQuery({ name: 'featured', type: Boolean, required: false, description: 'Return only featured projects' })
  @ApiQuery({ name: 'category', enum: ProjectCategory, required: false, description: 'Filter by project category' })
  @ApiResponse({ status: 200, description: 'Projects retrieved successfully', type: [Project] })
  findAll(@Query('featured') featured?: boolean, @Query('category') category?: ProjectCategory) {
    return this.projectsService.findAll(featured, category);
  }

  @Get('admin/all')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Get all projects (Admin)',
    description: 'Returns all projects including hidden ones. Requires authentication.',
  })
  @ApiResponse({ status: 200, description: 'All projects including hidden', type: [Project] })
  @ApiResponse({ status: 401, description: 'Unauthorized – Bearer token required' })
  findAllAdmin() {
    return this.projectsService.findAllAdmin();
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get project by ID' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid', description: 'Project UUID' })
  @ApiResponse({ status: 200, description: 'Project retrieved', type: Project })
  @ApiResponse({ status: 404, description: 'Project not found' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.projectsService.findOne(id);
  }

  @Post()
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Create project (Admin)' })
  @ApiResponse({ status: 201, description: 'Project created successfully', type: Project })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 401, description: 'Unauthorized – Bearer token required' })
  create(@Body() dto: CreateProjectDto) {
    return this.projectsService.create(dto);
  }

  @Put(':id')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Update project (Admin)' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid', description: 'Project UUID' })
  @ApiResponse({ status: 200, description: 'Project updated', type: Project })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 401, description: 'Unauthorized – Bearer token required' })
  @ApiResponse({ status: 404, description: 'Project not found' })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateProjectDto) {
    return this.projectsService.update(id, dto);
  }

  @Public()
  @Patch(':id/like')
  @ApiOperation({
    summary: 'Like a project',
    description: 'Increments the like counter for a project by 1. This endpoint is public.',
  })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid', description: 'Project UUID' })
  @ApiResponse({ status: 200, description: 'Like count incremented', type: Project })
  @ApiResponse({ status: 404, description: 'Project not found' })
  like(@Param('id', ParseUUIDPipe) id: string) {
    return this.projectsService.incrementLikes(id);
  }

  @Delete(':id')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Delete project (Admin)' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid', description: 'Project UUID' })
  @ApiResponse({ status: 200, description: 'Project deleted successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized – Bearer token required' })
  @ApiResponse({ status: 404, description: 'Project not found' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.projectsService.remove(id);
  }
}
