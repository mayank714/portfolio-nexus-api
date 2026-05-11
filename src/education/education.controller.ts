import { Controller, Get, Post, Put, Delete, Body, Param, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { EducationService } from './education.service';
import { CreateEducationDto } from './dto/create-education.dto';
import { UpdateEducationDto } from './dto/update-education.dto';
import { Education } from './entities/education.entity';
import { Public } from '../common/decorators/public.decorator';

@ApiTags('Education')
@Controller('education')
export class EducationController {
  constructor(private readonly educationService: EducationService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get all education records', description: 'Returns all visible education records sorted by most recent first.' })
  @ApiResponse({ status: 200, description: 'Education records retrieved', type: [Education] })
  findAll() { return this.educationService.findAll(); }

  @Get('admin/all')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get all education records (Admin)', description: 'Returns all education records including hidden ones.' })
  @ApiResponse({ status: 200, description: 'All education records', type: [Education] })
  @ApiResponse({ status: 401, description: 'Unauthorized – Bearer token required' })
  findAllAdmin() { return this.educationService.findAllAdmin(); }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get education by ID' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid', description: 'Education UUID' })
  @ApiResponse({ status: 200, description: 'Education record retrieved', type: Education })
  @ApiResponse({ status: 404, description: 'Not found' })
  findOne(@Param('id', ParseUUIDPipe) id: string) { return this.educationService.findOne(id); }

  @Post()
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Create education record (Admin)' })
  @ApiResponse({ status: 201, description: 'Education record created', type: Education })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 401, description: 'Unauthorized – Bearer token required' })
  create(@Body() dto: CreateEducationDto) { return this.educationService.create(dto); }

  @Put(':id')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Update education record (Admin)' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid', description: 'Education UUID' })
  @ApiResponse({ status: 200, description: 'Education record updated', type: Education })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 401, description: 'Unauthorized – Bearer token required' })
  @ApiResponse({ status: 404, description: 'Not found' })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateEducationDto) {
    return this.educationService.update(id, dto);
  }

  @Delete(':id')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Delete education record (Admin)' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid', description: 'Education UUID' })
  @ApiResponse({ status: 200, description: 'Education record deleted' })
  @ApiResponse({ status: 401, description: 'Unauthorized – Bearer token required' })
  @ApiResponse({ status: 404, description: 'Not found' })
  remove(@Param('id', ParseUUIDPipe) id: string) { return this.educationService.remove(id); }
}
