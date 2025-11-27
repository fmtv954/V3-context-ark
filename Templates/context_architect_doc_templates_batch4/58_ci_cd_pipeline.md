# 58 – CI/CD Pipeline Design

> How code moves from PR to production through automation.
> Audience: engineers, DevOps, AI tools editing workflows.

## 1. Tools & Platforms

- **CI/CD provider(s) (GitHub Actions, GitLab, etc.):**
  - {{cicd_provider}}

## 2. Pipeline Stages

- **Stage 1 – Lint & Unit Tests:**
  - {{stage1_details}}
- **Stage 2 – Integration / E2E Tests:**
  - {{stage2_details}}
- **Stage 3 – Build & Package:**
  - {{stage3_details}}
- **Stage 4 – Deploy to Staging:**
  - {{stage4_details}}
- **Stage 5 – Deploy to Production:**
  - {{stage5_details}}

## 3. Triggers

- **What events trigger which pipelines (push, PR, tags, manual):**
  - {{cicd_triggers}}

## 4. Approvals & Gates

- **Who can approve production deploys and how:**
  - {{approval_process}}

## 5. Secrets & Config

- **How we manage CI/CD secrets and environment configs:**
  - {{cicd_secrets_management}}

## 6. Notes for AI Tools

- Follow this structure when modifying workflow files.
- Do not expose secrets or bypass approval gates.
