import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseUUIDPipe, Patch } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectCategory } from './entities/project.entity';
import { Public } from '../common/decorators/public.decorator';

@ApiTags('Projects')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get all projects' })
  @ApiQuery({ name: 'featured', type: Boolean, required: false })
  @ApiQuery({ name: 'category', enum: ProjectCategory, required: false })
  findAll(@Query('featured') featured?: boolean, @Query('category') category?: ProjectCategory) {
    return this.projectsService.findAll(featured, category);
  }

  @Get('admin/all')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get all projects (Admin)' })
  findAllAdmin() {
    return this.projectsService.findAllAdmin();
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get project by ID' })
  @ApiResponse({ status: 404, description: 'Project not found' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.projectsService.findOne(id);
  }

  @Post()
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Create project (Admin)' })
  create(@Body() dto: CreateProjectDto) {
    return this.projectsService.create(dto);
  }

  @Put(':id')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Update project (Admin)' })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateProjectDto) {
    return this.projectsService.update(id, dto);
  }

  @Public()
  @Patch(':id/like')
  @ApiOperation({ summary: 'Like a project (increments like count)' })
  like(@Param('id', ParseUUIDPipe) id: string) {
    return this.projectsService.incrementLikes(id);
  }

  @Delete(':id')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Delete project (Admin)' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.projectsService.remove(id);
  }
}
