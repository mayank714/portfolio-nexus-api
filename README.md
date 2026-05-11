# Portfolio Nexus API

> A production-ready, fully dynamic portfolio/resume REST API built with **NestJS**, **TypeORM**, and **MySQL**.

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Modules](#api-modules)
- [Swagger Documentation](#swagger-documentation)
- [Authentication](#authentication)
- [API Response Format](#api-response-format)
- [Database](#database)
- [Scripts](#scripts)

---

## Overview

Portfolio Nexus API powers a dynamic personal portfolio/resume site. Every section of the portfolio — profile info, skills, projects, work history, education, achievements, certifications, testimonials, and social links — is stored in MySQL and served via a fully documented REST API.

Public `GET` endpoints require no authentication. All write operations (`POST`, `PUT`, `DELETE`) are protected by JWT bearer tokens.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [NestJS](https://nestjs.com) v10 |
| Language | TypeScript 5 |
| ORM | [TypeORM](https://typeorm.io) v0.3 |
| Database | MySQL 8 |
| Auth | JWT (Passport.js) |
| Validation | class-validator + class-transformer |
| API Docs | Swagger UI (@nestjs/swagger) |
| Security | Helmet, CORS, bcrypt |
| Logging | Morgan (HTTP) |
| Compression | compression |

---

## Project Structure

```
src/
├── app.module.ts               # Root module
├── main.ts                     # Bootstrap + Swagger setup
├── auth/                       # JWT authentication
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── auth.module.ts
│   ├── dto/login.dto.ts
│   ├── guards/jwt-auth.guard.ts
│   └── strategies/jwt.strategy.ts
├── profile/                    # Personal profile & bio
├── skills/                     # Technical skills
├── projects/                   # Portfolio projects
├── experience/                 # Work experience
├── education/                  # Academic qualifications
├── achievements/               # Awards & achievements
├── certifications/             # Professional certifications
├── testimonials/               # Recommendations
├── contact/                    # Contact form messages
├── social-links/               # Social media profiles
├── admin/                      # Admin entity
├── common/
│   ├── decorators/
│   │   └── public.decorator.ts # Marks routes as public (no JWT)
│   ├── filters/
│   │   └── http-exception.filter.ts
│   └── interceptors/
│       └── transform.interceptor.ts  # Wraps all responses
└── config/
    └── database.config.ts      # TypeORM MySQL config
```

---

## Getting Started

### Prerequisites

- Node.js >= 18
- MySQL 8 running locally or remotely
- npm or yarn

### Installation

```bash
# Clone the repo
git clone <repo-url>
cd portfolio-nexus-api

# Install dependencies
npm install

# Copy and configure environment
cp .env.example .env
# Edit .env with your MySQL credentials and JWT secret

# Start in development mode (hot-reload)
npm run start:dev
```

The server starts at **http://localhost:3001**

Swagger UI is available at **http://localhost:3001/api/docs**

---

## Environment Variables

Create a `.env` file in the project root (see `.env.example`):

```env
# Application
PORT=3001
NODE_ENV=development
API_PREFIX=api/v1

# MySQL Database
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=your_password
DB_NAME=portfolio_nexus

# JWT
JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRES_IN=7d

# CORS — origin of your frontend
CORS_ORIGIN=http://localhost:3000

# Initial admin account (created on first run if using a seed script)
ADMIN_EMAIL=admin@portfolio.com
ADMIN_PASSWORD=Admin@123456
```

> **Never commit `.env` to version control.**

---

## API Modules

All endpoints are prefixed with `/api/v1`.

### Auth

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/auth/login` | Public | Login and receive JWT token |
| `GET` | `/auth/profile` | Bearer | Get authenticated admin profile |

### Profile

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/profile` | Public | Get portfolio owner profile |
| `POST` | `/profile` | Bearer | Create profile |
| `PUT` | `/profile` | Bearer | Update profile (upsert) |

### Skills

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/skills` | Public | Get all visible skills (`?category=Backend`) |
| `GET` | `/skills/grouped` | Public | Skills grouped by category |
| `GET` | `/skills/admin/all` | Bearer | All skills including hidden |
| `GET` | `/skills/:id` | Public | Get skill by UUID |
| `POST` | `/skills` | Bearer | Create skill |
| `PUT` | `/skills/:id` | Bearer | Update skill |
| `DELETE` | `/skills/:id` | Bearer | Delete skill |

### Projects

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/projects` | Public | Get all visible projects (`?featured=true&category=Web`) |
| `GET` | `/projects/admin/all` | Bearer | All projects including hidden |
| `GET` | `/projects/:id` | Public | Get project by UUID |
| `POST` | `/projects` | Bearer | Create project |
| `PUT` | `/projects/:id` | Bearer | Update project |
| `PATCH` | `/projects/:id/like` | Public | Increment project likes |
| `DELETE` | `/projects/:id` | Bearer | Delete project |

### Experience

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/experience` | Public | Get all visible work experiences |
| `GET` | `/experience/admin/all` | Bearer | All experiences |
| `GET` | `/experience/:id` | Public | Get by UUID |
| `POST` | `/experience` | Bearer | Create |
| `PUT` | `/experience/:id` | Bearer | Update |
| `DELETE` | `/experience/:id` | Bearer | Delete |

### Education

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/education` | Public | Get all visible education records |
| `GET` | `/education/admin/all` | Bearer | All records |
| `GET` | `/education/:id` | Public | Get by UUID |
| `POST` | `/education` | Bearer | Create |
| `PUT` | `/education/:id` | Bearer | Update |
| `DELETE` | `/education/:id` | Bearer | Delete |

### Achievements

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/achievements` | Public | Get achievements (`?featured=true&category=Hackathon`) |
| `GET` | `/achievements/admin/all` | Bearer | All achievements |
| `GET` | `/achievements/:id` | Public | Get by UUID |
| `POST` | `/achievements` | Bearer | Create |
| `PUT` | `/achievements/:id` | Bearer | Update |
| `DELETE` | `/achievements/:id` | Bearer | Delete |

### Certifications

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/certifications` | Public | Get certifications (`?featured=true`) |
| `GET` | `/certifications/admin/all` | Bearer | All certifications |
| `GET` | `/certifications/:id` | Public | Get by UUID |
| `POST` | `/certifications` | Bearer | Create |
| `PUT` | `/certifications/:id` | Bearer | Update |
| `DELETE` | `/certifications/:id` | Bearer | Delete |

### Testimonials

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/testimonials` | Public | Get approved testimonials (`?featured=true`) |
| `GET` | `/testimonials/admin/all` | Bearer | All testimonials (incl. unapproved) |
| `GET` | `/testimonials/:id` | Public | Get by UUID |
| `POST` | `/testimonials` | Bearer | Create |
| `PUT` | `/testimonials/:id` | Bearer | Update / approve |
| `DELETE` | `/testimonials/:id` | Bearer | Delete |

### Contact

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/contact` | Public | Submit contact message |
| `GET` | `/contact` | Bearer | All messages (`?status=Unread`) |
| `GET` | `/contact/stats` | Bearer | Message counts by status |
| `GET` | `/contact/:id` | Bearer | Get message by UUID |
| `PUT` | `/contact/:id` | Bearer | Update status / admin notes |
| `DELETE` | `/contact/:id` | Bearer | Delete message |

### Social Links

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/social-links` | Public | Get all visible social links |
| `GET` | `/social-links/admin/all` | Bearer | All social links |
| `GET` | `/social-links/:id` | Public | Get by UUID |
| `POST` | `/social-links` | Bearer | Create |
| `PUT` | `/social-links/:id` | Bearer | Update |
| `DELETE` | `/social-links/:id` | Bearer | Delete |

---

## Swagger Documentation

The interactive Swagger UI is available when the server is running:

```
http://localhost:3001/api/docs
```

### Features

- **All endpoints** documented with summaries, descriptions, and parameter details
- **Request body schemas** — every DTO field has `@ApiProperty` with examples and descriptions
- **Response schemas** — every entity returned is fully typed with `@ApiProperty`
- **Query parameters** documented with types and allowed enum values
- **Path parameters** documented with UUID format
- **HTTP status codes** — success and error responses documented per endpoint
- **JWT Bearer Auth** — click the 🔒 `Authorize` button, paste your token, and all protected endpoints become testable
- **Tag grouping** — endpoints organized by resource: Auth, Profile, Skills, Projects, Experience, Education, Achievements, Certifications, Testimonials, Contact, Social Links

### Authenticating in Swagger

1. Call `POST /api/v1/auth/login` with admin credentials
2. Copy the `access_token` from the response
3. Click **Authorize** (top right)
4. Paste the token in the `JWT-auth (http, Bearer)` field
5. All 🔒 endpoints are now unlocked for the session

---

## Authentication

The API uses **JWT Bearer Tokens**.

```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "admin@portfolio.com",
  "password": "Admin@123456"
}
```

Response:

```json
{
  "statusCode": 200,
  "message": "Success",
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "admin": {
      "id": "uuid",
      "email": "admin@portfolio.com",
      "name": "Admin"
    }
  },
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

Use the token in subsequent requests:

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## API Response Format

All responses are wrapped by the `TransformInterceptor`:

```json
{
  "statusCode": 200,
  "message": "Success",
  "data": { ... },
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

Error responses follow the same structure with an appropriate `statusCode` and `message`.

---

## Database

TypeORM is configured to run with MySQL 8. On `NODE_ENV=development`, `synchronize: true` automatically creates/updates tables from entities.

**Do not use `synchronize: true` in production.** Use migrations instead:

```bash
# Generate a migration from entity changes
npm run migration:generate -- -n MigrationName

# Run pending migrations
npm run migration:run

# Revert the last migration
npm run migration:revert
```

---

## Scripts

```bash
npm run start:dev      # Development with hot-reload
npm run start:prod     # Production (from dist/)
npm run build          # Compile TypeScript
npm run lint           # ESLint with auto-fix
npm run format         # Prettier format
npm run test           # Unit tests
npm run test:e2e       # End-to-end tests
npm run test:cov       # Coverage report
npm run migration:generate -- -n <Name>   # Generate migration
npm run migration:run                      # Run migrations
npm run migration:revert                   # Revert last migration
```

---

## Related Repositories

| Repo | Description |
|------|-------------|
| **portfolio-nexus-api** (this repo) | NestJS backend API |
| **portfolio-nexus-web** | Next.js 14 frontend portfolio site |
