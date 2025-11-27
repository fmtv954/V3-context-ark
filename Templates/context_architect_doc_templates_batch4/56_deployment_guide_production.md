# 56 – Production Deployment Guide

> Step-by-step instructions to ship a new version safely.
> Audience: engineers, DevOps, AI tools guiding deploys or writing CI/CD.

## 1. Environments

- **List of environments (local, staging, production, etc.):**
  - {{environments_list}}
- **Differences between environments (feature flags, limits, etc.):**
  - {{environment_differences}}

## 2. Release Process

- **Triggering a release (who, how, from where):**
  - {{release_trigger_process}}
- **Pre-deploy checks (tests, migrations, approvals):**
  - {{pre_deploy_checks}}
- **Deploy steps (CI/CD jobs, manual tasks):**
  - {{deploy_steps}}

## 3. Post-Deploy Verification

- **Smoke tests or checks immediately after deploy:**
  - {{post_deploy_checks}}
- **How to monitor for issues right after shipping:**
  - {{post_deploy_monitoring}}

## 4. Rollback

- **How to roll back safely if something goes wrong:**
  - {{rollback_procedure}}

## 5. Change Communication

- **Who we notify and how for major changes:**
  - {{deploy_comms}}

## 6. Notes for AI Tools

- Use this doc when generating deploy scripts or CI jobs.
- Do not skip required checks or rollback paths.
