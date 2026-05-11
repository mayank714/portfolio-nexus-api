import { Controller, Get, Post, Put, Delete, Body, Param, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { EducationService } from './education.service';
import { CreateEducationDto } from './dto/create-education.dto';
import { UpdateEducationDto } from './dto/update-education.dto';
import { Public } from '../common/decorators/public.decorator';

@ApiTags('Education')
@Controller('education')
export class EducationController {
  constructor(private readonly educationService: EducationService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get all education records' })
  findAll() { return this.educationService.findAll(); }

  @Get('admin/all')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get all education records (Admin)' })
  findAllAdmin() { return this.educationService.findAllAdmin(); }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get education by ID' })
  @ApiResponse({ status: 404, description: 'Not found' })
  findOne(@Param('id', ParseUUIDPipe) id: string) { return this.educationService.findOne(id); }

  @Post()
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Create education record (Admin)' })
  create(@Body() dto: CreateEducationDto) { return this.educationService.create(dto); }

  @Put(':id')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Update education record (Admin)' })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateEducationDto) {
    return this.educationService.update(id, dto);
  }

  @Delete(':id')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Delete education record (Admin)' })
  remove(@Param('id', ParseUUIDPipe) id: string) { return this.educationService.remove(id); }
}
