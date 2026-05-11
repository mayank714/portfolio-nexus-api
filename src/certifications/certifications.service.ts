import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Certification } from './entities/certification.entity';
import { CreateCertificationDto } from './dto/create-certification.dto';
import { UpdateCertificationDto } from './dto/update-certification.dto';

@Injectable()
export class CertificationsService {
  constructor(
    @InjectRepository(Certification)
    private certificationRepository: Repository<Certification>,
  ) {}

  async create(dto: CreateCertificationDto): Promise<Certification> {
    const cert = this.certificationRepository.create(dto);
    return this.certificationRepository.save(cert);
  }

  async findAll(featured?: boolean): Promise<Certification[]> {
    const query = this.certificationRepository.createQueryBuilder('cert')
      .where('cert.isVisible = :isVisible', { isVisible: true })
      .orderBy('cert.featured', 'DESC')
      .addOrderBy('cert.issueDate', 'DESC');
    if (featured !== undefined) query.andWhere('cert.featured = :featured', { featured });
    return query.getMany();
  }

  async findAllAdmin(): Promise<Certification[]> {
    return this.certificationRepository.find({ order: { featured: 'DESC', issueDate: 'DESC' } });
  }

  async findOne(id: string): Promise<Certification> {
    const cert = await this.certificationRepository.findOne({ where: { id } });
    if (!cert) throw new NotFoundException(`Certification #${id} not found`);
    return cert;
  }

  async update(id: string, dto: UpdateCertificationDto): Promise<Certification> {
    const cert = await this.findOne(id);
    Object.assign(cert, dto);
    return this.certificationRepository.save(cert);
  }

  async remove(id: string): Promise<void> {
    const cert = await this.findOne(id);
    await this.certificationRepository.remove(cert);
  }
}
