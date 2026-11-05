# Quiz Builder

Full-stack app for creating quizzes with boolean, short-answer and multiple-choice questions.

- **Backend:** NestJS, TypeScript, Prisma, PostgreSQL
- **Frontend:** Next.js (App Router), TypeScript, Tailwind CSS, TanStack Query, React Hook Form, Zod

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

## Create a sample quiz

Either seed one from the backend:

```bash
cd backend
npm run db:seed
```

Or build one in the UI: open http://localhost:3000/create, add a title and questions, and submit. Each question is one of:

- **True / False:** pick the correct answer
- **Short text:** list the accepted answers
- **Multiple choice:** add options and tick every correct one

## Frontend structure

The assignment suggests `pages/`, `components/` and `services/`. All three are here, split further with [Feature-Sliced Design](https://feature-sliced.design/):

| Suggested     | Where it is now                                                                              | Why                                                                                                                          |
| ------------- | -------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `pages/`      | `app/`                                                                                       | The Next.js App Router requires this folder.                                                                                 |
| `components/` | `shared/ui/`, `shared/components/`, `entities/quiz/ui/`, `features/*/components/`, `widgets/` | A UI kit button, a quiz card and the quiz form have different scopes, so each one sits where only the code that needs it uses it. |
| `services/`   | `shared/services/`, `entities/quiz/quiz.service.ts`                                          | HTTP and CRUD code is generic. Only the quiz endpoint and its response mapping are quiz-specific.                            |

The app also needs types, Zod schemas, constants, hooks, utils and a store, which the suggested layout has no place for. With layers, each of them has one clear home. Three pages don't strictly need this many folders, but a new entity now only takes its own folder and a small `CrudApiService` subclass.

Layers go from most specific to most generic. A layer imports only from the layers below it, and slices of the same layer don't import each other. `npm run lint` enforces this with `eslint-plugin-boundaries`, and it also rejects files outside these folders.

```
frontend/
├── app/                     # Routes only: each page renders one screen
│   ├── create/              # /create
│   └── quizzes/             # /quizzes and /quizzes/:id
├── widgets/                 # Blocks of the app shell, mounted in the root layout
│   ├── header/              # Navigation and theme toggle
│   └── theme-sync/          # Applies the saved theme to the page
├── features/                # User scenarios, one folder per screen
│   ├── quiz-create/         # Create form with question and answer editors
│   ├── quiz-details/        # Read-only quiz page
│   └── quiz-list/           # Quiz list and delete flow
├── entities/                # Business objects that features build on
│   └── quiz/
│       ├── constants/       # Validation limits and question type labels
│       ├── models/          # Quiz types returned by the API
│       ├── schemas/         # Zod schema of the create form, mirrors the API rules
│       ├── ui/              # Quiz card and read-only question views
│       ├── utils/           # New question defaults and question count text
│       ├── quiz.service.ts  # CRUD service, the only way to reach the quiz API
│       └── quiz.hook.ts     # TanStack Query hooks on top of the service
└── shared/                  # Reusable code that depends on no layer above
    ├── components/          # Composites on the UI kit: RHF fields, query states, dialog
    ├── constants/           # App routes and local storage keys
    ├── hooks/               # Shared hooks: applying the saved theme
    ├── models/              # Shared types: UI sizes and variants, theme, CRUD contract
    ├── providers/           # App-wide React providers: TanStack Query
    ├── services/            # HTTP client, base CRUD service, local storage
    ├── store/               # Zustand stores: theme
    ├── styles/              # SCSS variants and mixins for the UI kit
    ├── ui/                  # UI kit primitives with no app logic
    └── utils/               # Small helpers: error messages, class names, error focus
```

## Code quality

Both apps:

```bash
npm run lint
npm run format:check
```

