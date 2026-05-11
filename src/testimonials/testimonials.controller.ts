import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery, ApiParam } from '@nestjs/swagger';
import { TestimonialsService } from './testimonials.service';
import { CreateTestimonialDto } from './dto/create-testimonial.dto';
import { UpdateTestimonialDto } from './dto/update-testimonial.dto';
import { Testimonial } from './entities/testimonial.entity';
import { Public } from '../common/decorators/public.decorator';

@ApiTags('Testimonials')
@Controller('testimonials')
export class TestimonialsController {
  constructor(private readonly testimonialsService: TestimonialsService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get all approved testimonials', description: 'Returns all approved & visible testimonials. Optionally filter by featured.' })
  @ApiQuery({ name: 'featured', type: Boolean, required: false, description: 'Return only featured testimonials' })
  @ApiResponse({ status: 200, description: 'Testimonials retrieved', type: [Testimonial] })
  findAll(@Query('featured') featured?: boolean) { return this.testimonialsService.findAll(featured); }

  @Get('admin/all')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get all testimonials (Admin)', description: 'Returns all testimonials including unapproved and hidden ones.' })
  @ApiResponse({ status: 200, description: 'All testimonials', type: [Testimonial] })
  @ApiResponse({ status: 401, description: 'Unauthorized – Bearer token required' })
  findAllAdmin() { return this.testimonialsService.findAllAdmin(); }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get testimonial by ID' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid', description: 'Testimonial UUID' })
  @ApiResponse({ status: 200, description: 'Testimonial retrieved', type: Testimonial })
  @ApiResponse({ status: 404, description: 'Not found' })
  findOne(@Param('id', ParseUUIDPipe) id: string) { return this.testimonialsService.findOne(id); }

  @Post()
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Create testimonial (Admin)' })
  @ApiResponse({ status: 201, description: 'Testimonial created', type: Testimonial })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 401, description: 'Unauthorized – Bearer token required' })
  create(@Body() dto: CreateTestimonialDto) { return this.testimonialsService.create(dto); }

  @Put(':id')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Update testimonial (Admin)' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid', description: 'Testimonial UUID' })
  @ApiResponse({ status: 200, description: 'Testimonial updated', type: Testimonial })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 401, description: 'Unauthorized – Bearer token required' })
  @ApiResponse({ status: 404, description: 'Not found' })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateTestimonialDto) {
    return this.testimonialsService.update(id, dto);
  }

  @Delete(':id')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Delete testimonial (Admin)' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid', description: 'Testimonial UUID' })
  @ApiResponse({ status: 200, description: 'Testimonial deleted' })
  @ApiResponse({ status: 401, description: 'Unauthorized – Bearer token required' })
  @ApiResponse({ status: 404, description: 'Not found' })
  remove(@Param('id', ParseUUIDPipe) id: string) { return this.testimonialsService.remove(id); }
}
