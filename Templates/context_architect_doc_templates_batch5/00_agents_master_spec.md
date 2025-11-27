# 00 – AGENTS Master Spec (Project Constitution)

> The single source of truth for this project’s goals, rules, and workflow.
> Audience: humans + ALL AI coding tools (Cursor, Windsurf, Cline, etc.).

## 1. Project Context

- **Project name:** {{project_name}}
- **One-sentence goal:** {{project_one_sentence_goal}}
- **Problem we solve (for whom):**
  - {{project_problem_statement}}
- **Core value (why this matters):**
  - {{project_core_value}}

## 2. Tech Stack

- **Frontend:** {{frontend_stack}}
- **Backend / APIs:** {{backend_stack}}
- **Database / storage:** {{database_stack}}
- **Infra / hosting:** {{infra_stack}}
- **Key libraries / frameworks:** {{key_libraries}}

## 3. Strict Rules (“The No List”)

- **Language / style constraints (no `any`, no console.log, etc.):**
  - {{code_style_no_list}}
- **Architecture constraints (e.g., keep feature modules isolated):**
  - {{architecture_no_list}}
- **Security / privacy constraints (never log X, never expose Y):**
  - {{security_no_list}}

## 4. Workflow Protocol (SDD Loop)

1. **Specify** – Update specs (this doc + others) first.
2. **Plan** – Generate/update PLAN.md before coding.
3. **Task** – Break into tasks/issues with clear acceptance criteria.
4. **Implement** – Write code strictly following the plan.
5. **Verify** – Run tests and validate against spec.

- **How we apply this project-wide:**
  - {{sdd_project_workflow_notes}}

## 5. Current Status Snapshot

- **Phase (Idea / MVP / Beta / Production):** {{project_phase}}
- **What we’re focusing on *right now* (top 3):**
  - {{current_focus_items}}

## 6. Notes for AI Tools

- ALWAYS read this file before major changes.
- If user instructions conflict with this spec:
  - Explain the conflict and ask whether to update the spec or follow the spec.
