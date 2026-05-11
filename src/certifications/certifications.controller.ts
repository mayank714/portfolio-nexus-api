import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { CertificationsService } from './certifications.service';
import { CreateCertificationDto } from './dto/create-certification.dto';
import { UpdateCertificationDto } from './dto/update-certification.dto';
import { Public } from '../common/decorators/public.decorator';

@ApiTags('Certifications')
@Controller('certifications')
export class CertificationsController {
  constructor(private readonly certificationsService: CertificationsService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get all certifications' })
  @ApiQuery({ name: 'featured', type: Boolean, required: false })
  findAll(@Query('featured') featured?: boolean) { return this.certificationsService.findAll(featured); }

  @Get('admin/all')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get all certifications (Admin)' })
  findAllAdmin() { return this.certificationsService.findAllAdmin(); }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get certification by ID' })
  findOne(@Param('id', ParseUUIDPipe) id: string) { return this.certificationsService.findOne(id); }

  @Post()
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Create certification (Admin)' })
  create(@Body() dto: CreateCertificationDto) { return this.certificationsService.create(dto); }

  @Put(':id')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Update certification (Admin)' })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateCertificationDto) {
    return this.certificationsService.update(id, dto);
  }

  @Delete(':id')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Delete certification (Admin)' })
  remove(@Param('id', ParseUUIDPipe) id: string) { return this.certificationsService.remove(id); }
}
