import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { TestimonialsService } from './testimonials.service';
import { CreateTestimonialDto } from './dto/create-testimonial.dto';
import { UpdateTestimonialDto } from './dto/update-testimonial.dto';
import { Public } from '../common/decorators/public.decorator';

@ApiTags('Testimonials')
@Controller('testimonials')
export class TestimonialsController {
  constructor(private readonly testimonialsService: TestimonialsService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get all approved testimonials' })
  @ApiQuery({ name: 'featured', type: Boolean, required: false })
  findAll(@Query('featured') featured?: boolean) { return this.testimonialsService.findAll(featured); }

  @Get('admin/all')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get all testimonials (Admin), including unapproved' })
  findAllAdmin() { return this.testimonialsService.findAllAdmin(); }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get testimonial by ID' })
  findOne(@Param('id', ParseUUIDPipe) id: string) { return this.testimonialsService.findOne(id); }

  @Post()
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Create testimonial (Admin)' })
  create(@Body() dto: CreateTestimonialDto) { return this.testimonialsService.create(dto); }

  @Put(':id')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Update testimonial (Admin)' })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateTestimonialDto) {
    return this.testimonialsService.update(id, dto);
  }

  @Delete(':id')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Delete testimonial (Admin)' })
  remove(@Param('id', ParseUUIDPipe) id: string) { return this.testimonialsService.remove(id); }
}
