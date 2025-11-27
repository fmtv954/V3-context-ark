# 36 – Integration Overview & Strategy

> How we connect to third-party tools and what those integrations must do.
> Audience: backend, AI tools building or modifying integrations.

## 1. Integration Goals

- **Why we integrate with external services at all:**
  - {{integration_goals}}

## 2. Integration Inventory

- **Core integrations (by name + purpose):**
  - {{core_integrations}}
- **Nice-to-have / future integrations:**
  - {{future_integrations}}

## 3. Design Principles

- **How we design integration boundaries (webhooks, polling, queues):**
  - {{integration_design_principles}}
- **Error handling & retries across integrations:**
  - {{integration_error_handling}}

## 4. Data Mapping

- **How we map external objects to our internal domain entities:**
  - {{integration_data_mapping}}

## 5. Security & Credentials

- **How we store and rotate API keys / secrets:**
  - {{integration_security}}

## 6. Notes for AI Tools

- When adding or changing integrations:
  - Follow the patterns and security rules here.
  - Document any new external dependency in this doc.
