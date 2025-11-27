# 26 – AI & LLM Pipeline Overview

> High-level view of how AI models, prompts, and tools are wired together.
> Audience: AI engineers, backend, DevOps, AI routing/orchestration tools.

## 1. Goals of the AI System

- **What the AI is responsible for (and not responsible for):**
  - {{ai_system_goals}}

## 2. Model Inventory

- **Primary LLM(s) and providers:**
  - {{primary_models}}
- **Secondary / specialized models (reasoning, embeddings, vision, etc.):**
  - {{secondary_models}}

## 3. Call Patterns & Routing

- **When we call which model (by use case):**
  - {{model_routing_rules}}
- **Tiering or budget logic (if any):**
  - {{ai_budget_logic}}

## 4. Prompting Strategy

- **System prompts and core patterns we rely on:**
  - {{prompting_patterns}}
- **How we handle long context or multi-step tasks:**
  - {{context_management_strategy}}

## 5. Tools & Function Calling

- **Tools/functions the AI can call (API, DB, search, etc.):**
  - {{ai_tools_list}}
- **How the AI decides when to call them:**
  - {{tool_use_strategy}}

## 6. Failure Modes & Fallbacks

- **How we handle API errors, timeouts, or provider outages:**
  - {{ai_failure_handling}}
- **Fallback behaviors (retry, alternate model, degrade gracefully):**
  - {{ai_fallback_behaviors}}

## 7. Notes for AI Tools

- Use this doc when adjusting routing, adding models, or changing prompts.
- Do not silently change providers or behavior without aligning with this spec.
