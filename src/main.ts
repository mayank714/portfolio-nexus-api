import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import * as compression from 'compression';
import * as morgan from 'morgan';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const port = configService.get<number>('PORT', 3001);
  const apiPrefix = configService.get<string>('API_PREFIX', 'api/v1');
  const corsOrigin = configService.get<string>('CORS_ORIGIN', 'http://localhost:3000');

  app.setGlobalPrefix(apiPrefix);

  app.use(helmet());
  app.use(compression());
  app.use(morgan('combined'));

  app.enableCors({
    origin: corsOrigin,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new TransformInterceptor());

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Portfolio Nexus API')
    .setDescription(
      `
## Portfolio Nexus — REST API

A fully dynamic portfolio/resume API built with **NestJS**, **TypeORM**, and **MySQL**.

### Features
- 🔐 **JWT Authentication** — Secure admin-only endpoints
- 👤 **Profile** — Personal info, bio, and contact details
- 🛠 **Skills** — Technical skills grouped by category with proficiency levels
- 🚀 **Projects** — Portfolio projects with tech stack, links, and screenshots
- 💼 **Work Experience** — Professional history with timeline support
- 🎓 **Education** — Academic qualifications and degrees
- 🏆 **Achievements** — Awards, recognitions, and milestones
- 📜 **Certifications** — Professional certifications with credential IDs
- 💬 **Testimonials** — Recommendations and endorsements
- 📬 **Contact** — Contact form message management
- 🔗 **Social Links** — Social media and professional profile links

### Authentication
Most \`GET\` endpoints are public. \`POST\`, \`PUT\`, \`PATCH\`, and \`DELETE\` endpoints require a **Bearer token**.

Use \`POST /auth/login\` to obtain a token.
      `,
    )
    .setVersion('1.0.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT', in: 'header' },
      'JWT-auth',
    )
    .addTag('Auth', 'Authentication endpoints')
    .addTag('Profile', 'Personal profile and bio management')
    .addTag('Skills', 'Technical skills management')
    .addTag('Projects', 'Portfolio projects management')
    .addTag('Experience', 'Work experience management')
    .addTag('Education', 'Academic qualifications management')
    .addTag('Achievements', 'Awards and achievements management')
    .addTag('Certifications', 'Professional certifications management')
    .addTag('Testimonials', 'Testimonials and recommendations management')
    .addTag('Contact', 'Contact form and messages management')
    .addTag('Social Links', 'Social media links management')
    .setContact('Portfolio Admin', '', 'admin@portfolio.com')
    .setLicense('MIT', 'https://opensource.org/licenses/MIT')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      docExpansion: 'none',
      filter: true,
      showRequestDuration: true,
    },
    customSiteTitle: 'Portfolio Nexus API Docs',
    customCss: `
      .swagger-ui .topbar { background-color: #1a1a2e; }
      .swagger-ui .topbar-wrapper img { display: none; }
      .swagger-ui .topbar-wrapper::after { content: '⚡ Portfolio Nexus API'; color: white; font-size: 20px; font-weight: bold; }
    `,
  });

  await app.listen(port);
  logger.log(`🚀 Portfolio Nexus API running on: http://localhost:${port}/${apiPrefix}`);
  logger.log(`📚 Swagger docs available at: http://localhost:${port}/api/docs`);
}

bootstrap();
