import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { SkillsService } from './skills.service';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { SkillCategory } from './entities/skill.entity';
import { Public } from '../common/decorators/public.decorator';

@ApiTags('Skills')
@Controller('skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get all skills', description: 'Retrieve all visible skills, optionally filtered by category' })
  @ApiQuery({ name: 'category', enum: SkillCategory, required: false })
  @ApiResponse({ status: 200, description: 'Skills retrieved successfully' })
  findAll(@Query('category') category?: SkillCategory) {
    return this.skillsService.findAll(category);
  }

  @Public()
  @Get('grouped')
  @ApiOperation({ summary: 'Get skills grouped by category' })
  @ApiResponse({ status: 200, description: 'Skills grouped by category' })
  findGrouped() {
    return this.skillsService.findGroupedByCategory();
  }

  @Get('admin/all')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get all skills (Admin)', description: 'Get all skills including hidden ones' })
  findAllAdmin() {
    return this.skillsService.findAllAdmin();
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get skill by ID' })
  @ApiResponse({ status: 200, description: 'Skill retrieved' })
  @ApiResponse({ status: 404, description: 'Skill not found' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.skillsService.findOne(id);
  }

  @Post()
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Create skill (Admin)' })
  @ApiResponse({ status: 201, description: 'Skill created' })
  create(@Body() dto: CreateSkillDto) {
    return this.skillsService.create(dto);
  }

  @Put(':id')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Update skill (Admin)' })
  @ApiResponse({ status: 200, description: 'Skill updated' })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateSkillDto) {
    return this.skillsService.update(id, dto);
  }

  @Delete(':id')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Delete skill (Admin)' })
  @ApiResponse({ status: 200, description: 'Skill deleted' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.skillsService.remove(id);
  }
}
