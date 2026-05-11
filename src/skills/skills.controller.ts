import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseUUIDPipe } from '@nestjs/common';
import {
  ApiTags, ApiOperation, ApiResponse, ApiBearerAuth,
  ApiQuery, ApiParam,
} from '@nestjs/swagger';
import { SkillsService } from './skills.service';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { Skill, SkillCategory } from './entities/skill.entity';
import { Public } from '../common/decorators/public.decorator';

@ApiTags('Skills')
@Controller('skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @Public()
  @Get()
  @ApiOperation({
    summary: 'Get all visible skills',
    description: 'Returns all visible skills. Optionally filter by category.',
  })
  @ApiQuery({ name: 'category', enum: SkillCategory, required: false, description: 'Filter by skill category' })
  @ApiResponse({ status: 200, description: 'Skills retrieved successfully', type: [Skill] })
  findAll(@Query('category') category?: SkillCategory) {
    return this.skillsService.findAll(category);
  }

  @Public()
  @Get('grouped')
  @ApiOperation({
    summary: 'Get skills grouped by category',
    description: 'Returns an object keyed by SkillCategory, each containing an array of Skill objects.',
  })
  @ApiResponse({ status: 200, description: 'Skills grouped by category' })
  findGrouped() {
    return this.skillsService.findGroupedByCategory();
  }

  @Get('admin/all')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Get all skills (Admin)',
    description: 'Returns all skills including hidden ones. Requires authentication.',
  })
  @ApiResponse({ status: 200, description: 'All skills including hidden', type: [Skill] })
  @ApiResponse({ status: 401, description: 'Unauthorized – Bearer token required' })
  findAllAdmin() {
    return this.skillsService.findAllAdmin();
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get skill by ID' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid', description: 'Skill UUID' })
  @ApiResponse({ status: 200, description: 'Skill retrieved', type: Skill })
  @ApiResponse({ status: 404, description: 'Skill not found' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.skillsService.findOne(id);
  }

  @Post()
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Create skill (Admin)' })
  @ApiResponse({ status: 201, description: 'Skill created successfully', type: Skill })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 401, description: 'Unauthorized – Bearer token required' })
  create(@Body() dto: CreateSkillDto) {
    return this.skillsService.create(dto);
  }

  @Put(':id')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Update skill (Admin)' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid', description: 'Skill UUID' })
  @ApiResponse({ status: 200, description: 'Skill updated', type: Skill })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 401, description: 'Unauthorized – Bearer token required' })
  @ApiResponse({ status: 404, description: 'Skill not found' })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateSkillDto) {
    return this.skillsService.update(id, dto);
  }

  @Delete(':id')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Delete skill (Admin)' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid', description: 'Skill UUID' })
  @ApiResponse({ status: 200, description: 'Skill deleted successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized – Bearer token required' })
  @ApiResponse({ status: 404, description: 'Skill not found' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.skillsService.remove(id);
  }
}
