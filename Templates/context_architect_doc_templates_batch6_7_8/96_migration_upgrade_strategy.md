# 96 – Migration & Upgrade Strategy

> How we handle schema changes, breaking changes, and version upgrades.
> Audience: backend, infra, AI tools suggesting schema or API changes.

## 1. Migration Types

- **Schema migrations, data migrations, feature flags, etc.:**
  - {{migration_types}}

## 2. Strategy

- **Blue/green, gradual rollout, backward compatibility expectations:**
  - {{migration_strategy}}

## 3. Tooling

- **What tools we use (Prisma, Supabase migrations, custom scripts, etc.):**
  - {{migration_tooling}}

## 4. Rollback

- **How we undo a migration safely if needed:**
  - {{migration_rollback}}

## 5. Notes for AI Tools

- Don’t propose “big bang” migrations without safety nets.
