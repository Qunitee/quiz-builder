# Quiz Builder

Full-stack app for creating quizzes with boolean, short-answer and multiple-choice questions.

- **Backend:** NestJS, TypeScript, Prisma, PostgreSQL
- **Frontend:** Next.js (App Router), TypeScript, Tailwind CSS, React Hook Form, Zod

## Prerequisites

- Node.js 20+
- Docker (for PostgreSQL)

## 1. Database

```bash
docker compose up -d
```

PostgreSQL runs on `localhost:5433` (user `quiz`, password `quiz`, database `quiz_builder`).

## 2. Backend

```bash
cd backend
cp .env.example .env
npm install            # also generates the Prisma client
npm run db:migrate     # applies migrations
npm run db:seed        # optional: creates a sample quiz
npm run start:dev      # http://localhost:3001
```

Health check: `GET http://localhost:3001/health`

## 3. Frontend

```bash
cd frontend
cp .env.example .env.local
npm install
npm run dev            # http://localhost:3000
```

## Code quality

Both apps:

```bash
npm run lint
npm run format:check
```

<!-- TODO: API endpoints, how to create a sample quiz, data model and decisions -->
