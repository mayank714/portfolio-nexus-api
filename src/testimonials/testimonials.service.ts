import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Testimonial } from './entities/testimonial.entity';
import { CreateTestimonialDto } from './dto/create-testimonial.dto';
import { UpdateTestimonialDto } from './dto/update-testimonial.dto';

@Injectable()
export class TestimonialsService {
  constructor(
    @InjectRepository(Testimonial)
    private testimonialRepository: Repository<Testimonial>,
  ) {}

  async create(dto: CreateTestimonialDto): Promise<Testimonial> {
    const testimonial = this.testimonialRepository.create(dto);
    return this.testimonialRepository.save(testimonial);
  }

  async findAll(featured?: boolean): Promise<Testimonial[]> {
    const query = this.testimonialRepository.createQueryBuilder('t')
      .where('t.isVisible = :isVisible AND t.approved = :approved', { isVisible: true, approved: true })
      .orderBy('t.featured', 'DESC')
      .addOrderBy('t.sortOrder', 'ASC');
    if (featured !== undefined) query.andWhere('t.featured = :featured', { featured });
    return query.getMany();
  }

  async findAllAdmin(): Promise<Testimonial[]> {
    return this.testimonialRepository.find({ order: { approved: 'DESC', featured: 'DESC', sortOrder: 'ASC' } });
  }

  async findOne(id: string): Promise<Testimonial> {
    const testimonial = await this.testimonialRepository.findOne({ where: { id } });
    if (!testimonial) throw new NotFoundException(`Testimonial #${id} not found`);
    return testimonial;
  }

  async update(id: string, dto: UpdateTestimonialDto): Promise<Testimonial> {
    const testimonial = await this.findOne(id);
    Object.assign(testimonial, dto);
    return this.testimonialRepository.save(testimonial);
  }

  async remove(id: string): Promise<void> {
    const testimonial = await this.findOne(id);
    await this.testimonialRepository.remove(testimonial);
  }
}
