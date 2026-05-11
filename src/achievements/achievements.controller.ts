import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery, ApiParam } from '@nestjs/swagger';
import { AchievementsService } from './achievements.service';
import { CreateAchievementDto } from './dto/create-achievement.dto';
import { UpdateAchievementDto } from './dto/update-achievement.dto';
import { Achievement, AchievementCategory } from './entities/achievement.entity';
import { Public } from '../common/decorators/public.decorator';

@ApiTags('Achievements')
@Controller('achievements')
export class AchievementsController {
  constructor(private readonly achievementsService: AchievementsService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get all achievements', description: 'Returns all visible achievements. Optionally filter by featured or category.' })
  @ApiQuery({ name: 'featured', type: Boolean, required: false, description: 'Return only featured achievements' })
  @ApiQuery({ name: 'category', enum: AchievementCategory, required: false, description: 'Filter by achievement category' })
  @ApiResponse({ status: 200, description: 'Achievements retrieved', type: [Achievement] })
  findAll(@Query('featured') featured?: boolean, @Query('category') category?: AchievementCategory) {
    return this.achievementsService.findAll(featured, category);
  }

  @Get('admin/all')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get all achievements (Admin)', description: 'Returns all achievements including hidden ones.' })
  @ApiResponse({ status: 200, description: 'All achievements', type: [Achievement] })
  @ApiResponse({ status: 401, description: 'Unauthorized – Bearer token required' })
  findAllAdmin() { return this.achievementsService.findAllAdmin(); }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get achievement by ID' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid', description: 'Achievement UUID' })
  @ApiResponse({ status: 200, description: 'Achievement retrieved', type: Achievement })
  @ApiResponse({ status: 404, description: 'Not found' })
  findOne(@Param('id', ParseUUIDPipe) id: string) { return this.achievementsService.findOne(id); }

  @Post()
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Create achievement (Admin)' })
  @ApiResponse({ status: 201, description: 'Achievement created', type: Achievement })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 401, description: 'Unauthorized – Bearer token required' })
  create(@Body() dto: CreateAchievementDto) { return this.achievementsService.create(dto); }

  @Put(':id')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Update achievement (Admin)' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid', description: 'Achievement UUID' })
  @ApiResponse({ status: 200, description: 'Achievement updated', type: Achievement })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 401, description: 'Unauthorized – Bearer token required' })
  @ApiResponse({ status: 404, description: 'Not found' })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateAchievementDto) {
    return this.achievementsService.update(id, dto);
  }

  @Delete(':id')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Delete achievement (Admin)' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid', description: 'Achievement UUID' })
  @ApiResponse({ status: 200, description: 'Achievement deleted' })
  @ApiResponse({ status: 401, description: 'Unauthorized – Bearer token required' })
  @ApiResponse({ status: 404, description: 'Not found' })
  remove(@Param('id', ParseUUIDPipe) id: string) { return this.achievementsService.remove(id); }
}
