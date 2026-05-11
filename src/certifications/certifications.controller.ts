import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery, ApiParam } from '@nestjs/swagger';
import { CertificationsService } from './certifications.service';
import { CreateCertificationDto } from './dto/create-certification.dto';
import { UpdateCertificationDto } from './dto/update-certification.dto';
import { Certification } from './entities/certification.entity';
import { Public } from '../common/decorators/public.decorator';

@ApiTags('Certifications')
@Controller('certifications')
export class CertificationsController {
  constructor(private readonly certificationsService: CertificationsService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get all certifications', description: 'Returns all visible certifications. Optionally filter by featured.' })
  @ApiQuery({ name: 'featured', type: Boolean, required: false, description: 'Return only featured certifications' })
  @ApiResponse({ status: 200, description: 'Certifications retrieved', type: [Certification] })
  findAll(@Query('featured') featured?: boolean) { return this.certificationsService.findAll(featured); }

  @Get('admin/all')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get all certifications (Admin)', description: 'Returns all certifications including hidden ones.' })
  @ApiResponse({ status: 200, description: 'All certifications', type: [Certification] })
  @ApiResponse({ status: 401, description: 'Unauthorized – Bearer token required' })
  findAllAdmin() { return this.certificationsService.findAllAdmin(); }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get certification by ID' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid', description: 'Certification UUID' })
  @ApiResponse({ status: 200, description: 'Certification retrieved', type: Certification })
  @ApiResponse({ status: 404, description: 'Not found' })
  findOne(@Param('id', ParseUUIDPipe) id: string) { return this.certificationsService.findOne(id); }

  @Post()
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Create certification (Admin)' })
  @ApiResponse({ status: 201, description: 'Certification created', type: Certification })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 401, description: 'Unauthorized – Bearer token required' })
  create(@Body() dto: CreateCertificationDto) { return this.certificationsService.create(dto); }

  @Put(':id')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Update certification (Admin)' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid', description: 'Certification UUID' })
  @ApiResponse({ status: 200, description: 'Certification updated', type: Certification })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 401, description: 'Unauthorized – Bearer token required' })
  @ApiResponse({ status: 404, description: 'Not found' })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateCertificationDto) {
    return this.certificationsService.update(id, dto);
  }

  @Delete(':id')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Delete certification (Admin)' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid', description: 'Certification UUID' })
  @ApiResponse({ status: 200, description: 'Certification deleted' })
  @ApiResponse({ status: 401, description: 'Unauthorized – Bearer token required' })
  @ApiResponse({ status: 404, description: 'Not found' })
  remove(@Param('id', ParseUUIDPipe) id: string) { return this.certificationsService.remove(id); }
}
