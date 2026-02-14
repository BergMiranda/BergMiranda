# Automotive Repair Shop Management Platform

```mermaid
flowchart LR
    subgraph FE[Frontend - Next.js]
      UI[Mobile-first UI]
      Charts[Dashboard + KPI Widgets]
      Sig[Digital Signature Canvas]
    end

    subgraph BE[Backend - Express + TypeScript]
      API[REST API + OpenAPI]
      Auth[JWT + RBAC]
      Biz[Workflows + Billing + Inventory]
      Notify[Email/SMS Services]
      Export[PDF/Excel Export]
    end

    subgraph DB[(PostgreSQL via Prisma)]
      C[Clients]
      V[Vehicles]
      WO[WorkOrders]
      INV[Inventory]
      FIN[Invoices/Payments]
      EMP[Employees]
      SCH[Schedules]
    end

    FE -->|HTTPS| BE
    BE --> DB
    Biz --> Notify
    Biz --> Export
```

## Architecture Overview
- **Frontend**: Next.js 14 + TypeScript + Tailwind. App Router with feature folders under `frontend/src/app/*`.
- **Backend**: Express + TypeScript + Prisma + PostgreSQL. REST API with layered structure (`routes -> controllers -> services -> prisma`).
- **Database**: Normalized schema for clients, vehicles, work orders, inventory, employees, estimates, invoices, payments, schedules, and signatures.
- **AuthN/AuthZ**: JWT access tokens and role-based middleware (`ADMIN`, `MANAGER`, `MECHANIC`).
- **Deployment**: Dockerized FE/BE, GitHub Actions CI, deployable on AWS ECS/Fargate, Heroku-compatible config included.

## Repository Layout
- `backend/` API, business logic, Prisma schema/migrations, tests
- `frontend/` mobile-first Next.js UI
- `docs/` OpenAPI spec + architecture details
- `scripts/` sample data and helper scripts
- `.github/workflows/` CI pipeline

## Quick Start
1. `cp backend/.env.example backend/.env`
2. `docker compose up --build`
3. API: `http://localhost:4000/api/v1`
4. UI: `http://localhost:3000`

## Local Development
### Backend
```bash
cd backend
npm install
npx prisma migrate dev
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Production Notes
- Set secrets via cloud secret manager (JWT, DB URL, SMTP/Twilio keys).
- Use managed Postgres.
- Enable HTTPS, audit logging, backups, and observability.
