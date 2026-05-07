# Orthodox Saints Web

Next.js app for an Orthodox saints index with saint profile pages, source notes, and Supabase-backed email/password authentication.

## Stack

- Next.js 16 App Router
- React 19
- Supabase SSR auth helpers
- Vitest, Vite, Testing Library, and V8 coverage
- CSS modules

## Getting Started

Install dependencies from the repository root:

```bash
npm install
```

Copy the app env example and fill in the Supabase values:

```bash
cp apps/web/.env.example apps/web/.env
```

Run the development server from the repository root:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

You can also run scripts directly inside `apps/web` if your tooling treats this folder as the project root.

## Environment Variables

The app expects these values in `apps/web/.env` for local app-root development, or in Vercel project environment variables for deployment:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
SUPABASE_SECRET_KEY=
SUPABASE_DB_PASSWORD=
```

`NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` are public client values. `SUPABASE_SECRET_KEY` and `SUPABASE_DB_PASSWORD` are server-only values and should not be exposed to browser code.

## Auth

The app includes:

- `/sign-in`
- `/sign-up`
- `/auth/confirm` for Supabase email confirmation links
- a top nav with signed-out links and a signed-in sign-out action

The Supabase clients live in `src/lib/supabase`.

## Scripts

From the repository root:

```bash
npm run dev
npm run build
npm run lint
npm run test
npm run test:coverage
```

Coverage output is generated at `apps/web/coverage/index.html` and is ignored by git.

## Deployment

If Vercel is configured with `apps/web` as the project root, set the environment variables in that Vercel project. The app also tolerates root-level env files when scripts are run from the monorepo root.

Recommended Vercel settings:

- Root Directory: `apps/web`
- Build Command: `npm run build`
- Development Command: `npm run dev`

If deploying from the repository root instead, use the root scripts, which forward to the web workspace.
