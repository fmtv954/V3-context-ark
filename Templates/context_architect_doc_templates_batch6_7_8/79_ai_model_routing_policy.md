# 79 – AI Model Routing & Tier Policy

> How we choose which model handles which task and for which pricing tier.
> Audience: AI engineers, infra, cost owners, AI tools doing routing suggestions.

## 1. Task Types

- **List of major AI task types (analysis, doc gen, code, eval, etc.):**
  - {{ai_task_types}}

## 2. Model Pool

- **Available models (name, provider, strengths):**
  - {{ai_model_pool}}

## 3. Routing Rules

- **Free / Vibe tier routing rules:**
  - {{ai_routing_free}}
- **Builder / mid-tier routing rules:**
  - {{ai_routing_builder}}
- **Pro / Studio tier routing rules:**
  - {{ai_routing_pro}}

## 4. Fallback & Retries

- **What to do when a model fails or is overloaded:**
  - {{ai_routing_fallbacks}}

## 5. Notes for AI Tools

- Use these rules when proposing or implementing routing logic.
- Avoid sending expensive tasks to high-cost models unless required.
