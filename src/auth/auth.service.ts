import {
  Injectable,
  UnauthorizedException,
  OnModuleInit,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Admin } from '../admin/entities/admin.entity';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService implements OnModuleInit {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async onModuleInit() {
    await this.seedAdmin();
  }

  private async seedAdmin() {
    const adminEmail = this.configService.get<string>('ADMIN_EMAIL', 'admin@portfolio.com');
    const existing = await this.adminRepository.findOne({ where: { email: adminEmail } });
    if (!existing) {
      const admin = this.adminRepository.create({
        email: adminEmail,
        password: this.configService.get<string>('ADMIN_PASSWORD', 'Admin@123456'),
        name: 'Portfolio Admin',
      });
      await this.adminRepository.save(admin);
      this.logger.log(`Admin seeded: ${adminEmail}`);
    }
  }

  async login(loginDto: LoginDto) {
    const admin = await this.adminRepository.findOne({
      where: { email: loginDto.email, isActive: true },
    });

    if (!admin || !(await admin.validatePassword(loginDto.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: admin.id, email: admin.email };
    const token = this.jwtService.sign(payload);

    return {
      accessToken: token,
      expiresIn: this.configService.get<string>('JWT_EXPIRES_IN', '7d'),
      admin: { id: admin.id, email: admin.email, name: admin.name },
    };
  }

  async getProfile(adminId: string) {
    return this.adminRepository.findOne({
      where: { id: adminId },
      select: ['id', 'email', 'name', 'createdAt'],
    });
  }
}
