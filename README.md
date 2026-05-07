# AI-Powered E2E Automation Dashboard

A modern developer tooling platform for browser automation, regression testing, debugging, API validation, and observability.

## What is included

- Next.js App Router with TypeScript, Tailwind CSS, and Shadcn-inspired UI primitives
- Playwright automation workflow for Chromium, Firefox, and WebKit
- Supabase-ready backend architecture for auth and test result persistence
- API route for launching automation runs with screenshots, traces, and failure metadata
- GitHub Actions CI pipeline for Playwright regression validation

## Getting started

1. Install dependencies:
   ```bash
   npm ci
   ```

2. Copy environment variables:
   ```bash
   cp .env.example .env.local
   ```

3. Update `.env.local` with your Supabase and OpenAI values.

4. Start the application:
   ```bash
   npm run dev
   ```

5. Open the dashboard:
   ```text
   http://localhost:3000
   ```

## Key commands

- `npm run dev` — run the Next.js app locally
- `npm run build` — compile the app for production
- `npm run test:e2e` — execute Playwright browser tests
- `npm run test:ci` — build and run CI-focused validation

## CI / deployment

The project includes a GitHub Actions workflow at `.github/workflows/ci.yml` that installs dependencies, installs Playwright browsers, and runs the E2E test suite.

Deploy the app on Vercel and connect Supabase for auth and test storage.
