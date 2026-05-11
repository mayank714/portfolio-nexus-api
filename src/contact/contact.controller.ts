import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseUUIDPipe, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { Request } from 'express';
import { ContactService } from './contact.service';
import { CreateContactMessageDto } from './dto/create-contact-message.dto';
import { UpdateContactMessageDto } from './dto/update-contact-message.dto';
import { MessageStatus } from './entities/contact-message.entity';
import { Public } from '../common/decorators/public.decorator';

@ApiTags('Contact')
@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Public()
  @Post()
  @ApiOperation({ summary: 'Submit a contact message (public)', description: 'Send a contact/inquiry message to the portfolio owner' })
  create(@Body() dto: CreateContactMessageDto, @Req() req: Request) {
    const ip = req.ip || req.connection?.remoteAddress;
    return this.contactService.create(dto, ip);
  }

  @Get()
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get all messages (Admin)' })
  @ApiQuery({ name: 'status', enum: MessageStatus, required: false })
  findAll(@Query('status') status?: MessageStatus) { return this.contactService.findAll(status); }

  @Get('stats')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get message statistics (Admin)' })
  getStats() { return this.contactService.getStats(); }

  @Get(':id')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get message by ID (Admin)' })
  findOne(@Param('id', ParseUUIDPipe) id: string) { return this.contactService.findOne(id); }

  @Put(':id')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Update message status/notes (Admin)' })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateContactMessageDto) {
    return this.contactService.update(id, dto);
  }

  @Delete(':id')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Delete message (Admin)' })
  remove(@Param('id', ParseUUIDPipe) id: string) { return this.contactService.remove(id); }
}
