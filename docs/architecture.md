# Architecture

## Backend
- Express REST API with role-based middleware.
- Prisma ORM with PostgreSQL.
- Services encapsulate domain workflows:
  - Estimate/invoice generation
  - Stock adjustments
  - Workflow status transitions
  - Notification hooks (email/SMS)
  - PDF/Excel report export

## Frontend
- Next.js app-router mobile-first UI.
- Feature pages: dashboard, clients, vehicles, work orders, inventory, schedule.
- Signature capture component for estimate approval UX.

## Security
- JWT auth, role-based access control.
- Recommended additions for production: refresh tokens, rate limiting, audit logs.

## Deployment
- Dockerized services and CI pipeline.
