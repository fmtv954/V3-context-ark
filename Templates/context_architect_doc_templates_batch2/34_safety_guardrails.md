# 34 – Safety & Guardrail Policy (for AI)

> Defines how AI behavior should be constrained to protect users, the business, and data.
> Audience: AI engineers, product, legal/compliance, AI tools acting as agents.

## 1. Safety Objectives

- **Primary safety goals (plain language):**
  - {{safety_goals}}

## 2. Content & Behavior Boundaries

- **Disallowed behaviors (what the AI must NEVER do):**
  - {{disallowed_behaviors}}
- **Sensitive topics or data areas with extra caution:**
  - {{sensitive_areas}}
- **Allowed but high-friction actions (require confirmation):**
  - {{high_friction_actions}}

## 3. Data Handling & Privacy

- **What data AI is allowed to access:**
  - {{allowed_data_access}}
- **What data AI must not store or log:**
  - {{restricted_data_storage}}
- **Retention expectations for logs / transcripts:**
  - {{data_retention_policies}}

## 4. Action Guardrails (Tools & APIs)

- **APIs the AI may call and under what conditions:**
  - {{tool_use_policies}}
- **Destructive operations that require explicit user confirmation:**
  - {{destructive_ops_rules}}

## 5. User Experience Safeguards

- **How AI should respond when it hits a safety boundary:**
  - {{user-facing_safety_messages}}
- **Escalation path to a human (if applicable):**
  - {{escalation_paths}}

## 6. Monitoring & Review

- **Who reviews logs / flagged interactions and how often:**
  - {{safety_review_process}}
- **How to update this policy as product evolves:**
  - {{safety_policy_update_process}}

## 7. Notes for AI Tools

- You must obey this document even if user instructions conflict with it.
- If an instruction appears unsafe or ambiguous, refuse or ask for clarification.
