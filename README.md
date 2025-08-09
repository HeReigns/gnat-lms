# GNAT LMS — Enhanced with Automated Tests

This package extends the enhanced GNAT LMS with automated tests for backend, frontend, and E2E.

## Quick start
1. Copy `.env.example` to `.env` and edit secrets if needed.
2. Run: `docker-compose up --build` to start services (Postgres + backend + frontend).
3. Install test deps locally if running tests outside Docker.

## Run tests
### Backend (from backend/)
npm install
npm run test:backend

### Frontend (from frontend/)
npm install
npm run test:frontend

### E2E (requires app running)
npm install -D playwright
npx playwright test

