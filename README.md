# Orthodox Saints

Monorepo for an Orthodox saints web app.

The main app is in [apps/web](apps/web), built with Next.js, Supabase auth, and Vitest coverage.

## Quick Start

```bash
npm install
cp apps/web/.env.example apps/web/.env
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

```bash
npm run dev
npm run build
npm run lint
npm run test
npm run test:coverage
```

## Environment

Fill these values in `apps/web/.env` for local development and in Vercel for production:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
SUPABASE_SECRET_KEY=
SUPABASE_DB_PASSWORD=
```

See [apps/web/README.md](apps/web/README.md) for app-specific setup and deployment notes.
