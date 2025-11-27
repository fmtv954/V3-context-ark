# 16 – Spec-Driven Development (SDD) Workflow

> Describes how we use specifications (AGENTS.md + docs) as the primary source of truth.
> Audience: engineers, AI coding tools, product owners.

## 1. Core Artifacts

- **Master spec file (AGENTS.md / SPEC.md) location:**
  - {{master_spec_path}}
- **Key supporting docs (Vision, MVP, Architecture, etc.):**
  - {{supporting_docs_list}}

## 2. The SDD Loop

1. **Specify:** Update the spec documents to reflect the desired change.
2. **Plan:** Derive a step-by-step plan in PLAN.md (or an equivalent plan artifact).
3. **Tasks:** Break the plan into concrete tasks/issues.
4. **Implement:** Make code changes that strictly follow the plan.
5. **Verify:** Confirm implementation matches the spec + tests.

- **How we apply this in practice for this project:**
  - {{sdd_loop_project_notes}}

## 3. Rules of Engagement

- **Spec always comes first. Do not code new features without spec updates.**
- **If you discover that code and spec disagree:**
  - {{spec_code_disagreement_policy}}

## 4. AI Collaboration

- **How AI tools should read and respect the spec:**
  - {{ai_spec_usage_rules}}
- **How AI should propose changes (spec diffs, plan suggestions, etc.):**
  - {{ai_spec_change_process}}

## 5. Notes for AI Tools

- Before major changes, read AGENTS.md and relevant docs.
- Propose a plan referencing specific sections/IDs of the spec.
- Treat spec updates as part of the implementation, not an optional bonus.
