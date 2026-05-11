import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactMessage, MessageStatus } from './entities/contact-message.entity';
import { CreateContactMessageDto } from './dto/create-contact-message.dto';
import { UpdateContactMessageDto } from './dto/update-contact-message.dto';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(ContactMessage)
    private messageRepository: Repository<ContactMessage>,
  ) {}

  async create(dto: CreateContactMessageDto, ip?: string): Promise<ContactMessage> {
    const message = this.messageRepository.create({ ...dto, ipAddress: ip });
    return this.messageRepository.save(message);
  }

  async findAll(status?: MessageStatus): Promise<ContactMessage[]> {
    const where = status ? { status } : {};
    return this.messageRepository.find({ where, order: { createdAt: 'DESC' } });
  }

  async findOne(id: string): Promise<ContactMessage> {
    const message = await this.messageRepository.findOne({ where: { id } });
    if (!message) throw new NotFoundException(`Message #${id} not found`);
    return message;
  }

  async update(id: string, dto: UpdateContactMessageDto): Promise<ContactMessage> {
    const message = await this.findOne(id);
    if (dto.status === MessageStatus.REPLIED && !message.repliedAt) {
      message.repliedAt = new Date();
    }
    Object.assign(message, dto);
    return this.messageRepository.save(message);
  }

  async remove(id: string): Promise<void> {
    const message = await this.findOne(id);
    await this.messageRepository.remove(message);
  }

  async getStats() {
    const total = await this.messageRepository.count();
    const unread = await this.messageRepository.count({ where: { status: MessageStatus.UNREAD } });
    const replied = await this.messageRepository.count({ where: { status: MessageStatus.REPLIED } });
    return { total, unread, replied };
  }
}
