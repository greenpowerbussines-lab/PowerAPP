# Green Power — DC Fast Chargers B2B Platform

Monorepo for the Green Power business website: landing page + admin panel + API.

## Tech Stack

- **API**: NestJS + Prisma + PostgreSQL (Supabase)
- **Web**: Next.js 14 + Tailwind CSS + next-intl (UZ/RU)
- **Package Manager**: pnpm (workspaces)

## Prerequisites

- Node.js ≥ 20
- pnpm ≥ 9

## Quick Start (without Docker)

```bash
# 1. Install dependencies
pnpm install

# 2. Configure environment
# Copy the example and fill in your real Supabase password
cp apps/api/.env.example apps/api/.env
# Edit apps/api/.env — set DATABASE_URL password

# 3. Generate Prisma client
cd apps/api && npx prisma generate

# 4. Run migrations
npx prisma migrate dev

# 5. Seed the database
npx prisma db seed

# 6. Go back to root
cd ../..

# 7. Start both API and Web
pnpm dev
```

## URLs

| Service | URL |
|---------|-----|
| Web (Next.js) | http://localhost:3000 |
| API (NestJS) | http://localhost:4000/api |
| Admin Panel | http://localhost:3000/admin |
| Prisma Studio | `cd apps/api && npx prisma studio` |

## Environment Variables (apps/api/.env)

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | ✅ | PostgreSQL connection string with `?sslmode=require` |
| `JWT_SECRET` | ✅ | Secret key for JWT tokens |
| `CORS_ORIGIN` | ❌ | Allowed origins (default: `http://localhost:3000`) |
| `ADMIN_EMAIL` | ❌ | Admin email for seed (default: `admin@greenpower.uz`) |
| `ADMIN_PASSWORD` | ❌ | Admin password for seed (default: `Admin123!`) |
| `TELEGRAM_BOT_TOKEN` | ❌ | Telegram bot token for lead notifications |
| `TELEGRAM_CHAT_ID` | ❌ | Telegram chat ID for notifications |

> **Note**: Telegram is optional. If token/chat are empty, the app runs normally without sending notifications.

## Project Structure

```
green-power/
├── apps/
│   ├── api/                    # NestJS API
│   │   ├── prisma/
│   │   │   ├── schema.prisma   # Database schema
│   │   │   └── seed.ts         # Seed data
│   │   ├── src/
│   │   │   ├── auth/           # Authentication (JWT)
│   │   │   ├── cases/          # Case studies CRUD
│   │   │   ├── faq/            # FAQ CRUD
│   │   │   ├── leads/          # Lead management
│   │   │   ├── prisma/         # Prisma service
│   │   │   ├── settings/       # Site settings
│   │   │   └── telegram/       # Telegram notifications
│   │   └── .env.example
│   └── web/                    # Next.js Frontend
│       ├── src/
│       │   ├── app/            # Pages (App Router)
│       │   │   ├── admin/      # Admin panel
│       │   │   ├── cases/      # Case studies
│       │   │   ├── contacts/   # Contacts page
│       │   │   ├── faq/        # FAQ page
│       │   │   ├── products/   # Products page
│       │   │   └── solutions/  # Solutions page
│       │   └── components/     # UI components
│       └── messages/           # i18n (uz.json, ru.json)
├── package.json
└── pnpm-workspace.yaml
```

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start API + Web in dev mode |
| `pnpm dev:api` | Start only API |
| `pnpm dev:web` | Start only Web |
| `pnpm build` | Build both apps |
| `pnpm db:migrate` | Run Prisma migrations |
| `pnpm db:generate` | Generate Prisma client |
| `pnpm db:seed` | Seed database |
| `pnpm db:studio` | Open Prisma Studio |
