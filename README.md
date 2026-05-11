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

Fill these values in `apps/web/.env` for local web-app development and in Vercel for production:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
SUPABASE_SECRET_KEY=
SUPABASE_DB_PASSWORD=
```

The root [`.env.example`](.env.example) also documents repository-level variables used by local tooling.

### Symphony Linear integration

Symphony uses the repository-root `.env` file, not `apps/web/.env`, for local workflow automation credentials. Create it from the root example:

```bash
cp .env.example .env
```

Then set `LINEAR_API_KEY` in the root `.env` file:

```env
LINEAR_API_KEY=lin_api_your_key_here
```

Do not commit the real key. The root `.gitignore` ignores `.env` while keeping `.env.example` tracked.

Symphony automatically loads variables from the root `.env` when it starts, so no extra export step is needed. The Linear key is required for Symphony to poll Linear issues, update issue status, and post comments.

Start Symphony from the repository root with:

```bash
npm run symphony -- WORKFLOW.md --port 0
```

See [apps/web/README.md](apps/web/README.md) for app-specific setup and deployment notes.
