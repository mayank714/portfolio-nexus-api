import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseUUIDPipe, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery, ApiParam } from '@nestjs/swagger';
import { Request } from 'express';
import { ContactService } from './contact.service';
import { CreateContactMessageDto } from './dto/create-contact-message.dto';
import { UpdateContactMessageDto } from './dto/update-contact-message.dto';
import { ContactMessage, MessageStatus } from './entities/contact-message.entity';
import { Public } from '../common/decorators/public.decorator';

@ApiTags('Contact')
@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Public()
  @Post()
  @ApiOperation({
    summary: 'Submit a contact message (public)',
    description: 'Send a contact/inquiry message to the portfolio owner. This endpoint is public and does not require authentication.',
  })
  @ApiResponse({ status: 201, description: 'Message submitted successfully', type: ContactMessage })
  @ApiResponse({ status: 400, description: 'Validation error' })
  create(@Body() dto: CreateContactMessageDto, @Req() req: Request) {
    const ip = req.ip || req.connection?.remoteAddress;
    return this.contactService.create(dto, ip);
  }

  @Get()
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get all messages (Admin)', description: 'Returns all contact messages. Optionally filter by status.' })
  @ApiQuery({ name: 'status', enum: MessageStatus, required: false, description: 'Filter by message status' })
  @ApiResponse({ status: 200, description: 'Messages retrieved', type: [ContactMessage] })
  @ApiResponse({ status: 401, description: 'Unauthorized – Bearer token required' })
  findAll(@Query('status') status?: MessageStatus) { return this.contactService.findAll(status); }

  @Get('stats')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get message statistics (Admin)', description: 'Returns message counts grouped by status.' })
  @ApiResponse({ status: 200, description: 'Message statistics' })
  @ApiResponse({ status: 401, description: 'Unauthorized – Bearer token required' })
  getStats() { return this.contactService.getStats(); }

  @Get(':id')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get message by ID (Admin)' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid', description: 'ContactMessage UUID' })
  @ApiResponse({ status: 200, description: 'Message retrieved', type: ContactMessage })
  @ApiResponse({ status: 401, description: 'Unauthorized – Bearer token required' })
  @ApiResponse({ status: 404, description: 'Not found' })
  findOne(@Param('id', ParseUUIDPipe) id: string) { return this.contactService.findOne(id); }

  @Put(':id')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Update message status/notes (Admin)', description: 'Update the status or add admin notes to a contact message.' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid', description: 'ContactMessage UUID' })
  @ApiResponse({ status: 200, description: 'Message updated', type: ContactMessage })
  @ApiResponse({ status: 401, description: 'Unauthorized – Bearer token required' })
  @ApiResponse({ status: 404, description: 'Not found' })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateContactMessageDto) {
    return this.contactService.update(id, dto);
  }

  @Delete(':id')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Delete message (Admin)' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid', description: 'ContactMessage UUID' })
  @ApiResponse({ status: 200, description: 'Message deleted' })
  @ApiResponse({ status: 401, description: 'Unauthorized – Bearer token required' })
  @ApiResponse({ status: 404, description: 'Not found' })
  remove(@Param('id', ParseUUIDPipe) id: string) { return this.contactService.remove(id); }
}
