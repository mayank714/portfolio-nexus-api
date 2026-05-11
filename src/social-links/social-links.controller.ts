import { Controller, Get, Post, Put, Delete, Body, Param, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { SocialLinksService } from './social-links.service';
import { CreateSocialLinkDto } from './dto/create-social-link.dto';
import { UpdateSocialLinkDto } from './dto/update-social-link.dto';
import { SocialLink } from './entities/social-link.entity';
import { Public } from '../common/decorators/public.decorator';

@ApiTags('Social Links')
@Controller('social-links')
export class SocialLinksController {
  constructor(private readonly socialLinksService: SocialLinksService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get all visible social links', description: 'Returns all social links marked as visible, sorted by sortOrder.' })
  @ApiResponse({ status: 200, description: 'Social links retrieved', type: [SocialLink] })
  findAll() { return this.socialLinksService.findAll(); }

  @Get('admin/all')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get all social links (Admin)', description: 'Returns all social links including hidden ones.' })
  @ApiResponse({ status: 200, description: 'All social links', type: [SocialLink] })
  @ApiResponse({ status: 401, description: 'Unauthorized – Bearer token required' })
  findAllAdmin() { return this.socialLinksService.findAllAdmin(); }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get social link by ID' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid', description: 'SocialLink UUID' })
  @ApiResponse({ status: 200, description: 'Social link retrieved', type: SocialLink })
  @ApiResponse({ status: 404, description: 'Not found' })
  findOne(@Param('id', ParseUUIDPipe) id: string) { return this.socialLinksService.findOne(id); }

  @Post()
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Create social link (Admin)' })
  @ApiResponse({ status: 201, description: 'Social link created', type: SocialLink })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 401, description: 'Unauthorized – Bearer token required' })
  create(@Body() dto: CreateSocialLinkDto) { return this.socialLinksService.create(dto); }

  @Put(':id')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Update social link (Admin)' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid', description: 'SocialLink UUID' })
  @ApiResponse({ status: 200, description: 'Social link updated', type: SocialLink })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 401, description: 'Unauthorized – Bearer token required' })
  @ApiResponse({ status: 404, description: 'Not found' })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateSocialLinkDto) {
    return this.socialLinksService.update(id, dto);
  }

  @Delete(':id')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Delete social link (Admin)' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid', description: 'SocialLink UUID' })
  @ApiResponse({ status: 200, description: 'Social link deleted' })
  @ApiResponse({ status: 401, description: 'Unauthorized – Bearer token required' })
  @ApiResponse({ status: 404, description: 'Not found' })
  remove(@Param('id', ParseUUIDPipe) id: string) { return this.socialLinksService.remove(id); }
}
