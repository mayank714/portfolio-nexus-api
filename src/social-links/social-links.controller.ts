import { Controller, Get, Post, Put, Delete, Body, Param, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { SocialLinksService } from './social-links.service';
import { CreateSocialLinkDto } from './dto/create-social-link.dto';
import { UpdateSocialLinkDto } from './dto/update-social-link.dto';
import { Public } from '../common/decorators/public.decorator';

@ApiTags('Social Links')
@Controller('social-links')
export class SocialLinksController {
  constructor(private readonly socialLinksService: SocialLinksService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get all visible social links' })
  findAll() { return this.socialLinksService.findAll(); }

  @Get('admin/all')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get all social links (Admin)' })
  findAllAdmin() { return this.socialLinksService.findAllAdmin(); }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get social link by ID' })
  findOne(@Param('id', ParseUUIDPipe) id: string) { return this.socialLinksService.findOne(id); }

  @Post()
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Create social link (Admin)' })
  create(@Body() dto: CreateSocialLinkDto) { return this.socialLinksService.create(dto); }

  @Put(':id')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Update social link (Admin)' })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateSocialLinkDto) {
    return this.socialLinksService.update(id, dto);
  }

  @Delete(':id')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Delete social link (Admin)' })
  remove(@Param('id', ParseUUIDPipe) id: string) { return this.socialLinksService.remove(id); }
}
