import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { AchievementsService } from './achievements.service';
import { CreateAchievementDto } from './dto/create-achievement.dto';
import { UpdateAchievementDto } from './dto/update-achievement.dto';
import { AchievementCategory } from './entities/achievement.entity';
import { Public } from '../common/decorators/public.decorator';

@ApiTags('Achievements')
@Controller('achievements')
export class AchievementsController {
  constructor(private readonly achievementsService: AchievementsService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get all achievements' })
  @ApiQuery({ name: 'featured', type: Boolean, required: false })
  @ApiQuery({ name: 'category', enum: AchievementCategory, required: false })
  findAll(@Query('featured') featured?: boolean, @Query('category') category?: AchievementCategory) {
    return this.achievementsService.findAll(featured, category);
  }

  @Get('admin/all')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get all achievements (Admin)' })
  findAllAdmin() { return this.achievementsService.findAllAdmin(); }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get achievement by ID' })
  findOne(@Param('id', ParseUUIDPipe) id: string) { return this.achievementsService.findOne(id); }

  @Post()
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Create achievement (Admin)' })
  create(@Body() dto: CreateAchievementDto) { return this.achievementsService.create(dto); }

  @Put(':id')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Update achievement (Admin)' })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateAchievementDto) {
    return this.achievementsService.update(id, dto);
  }

  @Delete(':id')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Delete achievement (Admin)' })
  remove(@Param('id', ParseUUIDPipe) id: string) { return this.achievementsService.remove(id); }
}
