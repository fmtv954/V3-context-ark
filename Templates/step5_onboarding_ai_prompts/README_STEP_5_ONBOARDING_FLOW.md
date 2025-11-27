# Step 5 – Onboarding Flow & AI Prompt Templates (Vibe + Pro)

This step defines the **templates that feed the AI**, not the human docs themselves.
Together, these files describe how you:

1. Take a **brain dump + files** from a user.
2. Ask **clarifying questions** tailored to Vibe vs Pro.
3. Turn that into:
   - A `project_kernel.json` (from Step 3)
   - Seed content for the most important docs (00, 07, 11, 18, 31, 60, 72, 76, 78, 83, 84, 101, etc.).

The actual runtime system plugs real values (user text, doc index, pack definition) into these templates.

---

## 1. Onboarding Phases (Conceptual)

We design onboarding as 4 phases:

1. **Brain Dump Intake**
   - User pastes ideas, goals, notes, links, screenshots, or uploads files.
   - We DO NOT force them to structure anything.

2. **Auto-Extraction**
   - AI converts the brain dump into a rough `project_context`:
     - problem, audience, value prop
     - rough feature list
     - current/desired tech stack
     - time/cost constraints

3. **Clarification Questions**
   - AI generates **minimal** but **high-value** questions to close gaps.
   - Questions are grouped into blocks:
     - Core context (who / what / why)
     - Tech stack + platform choice
     - Money / success (how you define “done”)
     - Risk / safety (for Pro)
   - Vibe Coders get more "teaching"-style tooltips and definitions.
   - Pro Builders get shorter questions and more defaults.

4. **Kernel & Seed Docs**
   - AI takes all answers + pack definition + docs index and produces:
     - A `project_kernel.json` for this project.
     - First-pass drafts for key docs (markdown), especially:
       - 00 – AGENTS / Master Spec
       - 07 – Problem & Solution Statement
       - 11 – Quickstart / First MVP Journey
       - 18 – User Journeys & Scenarios
       - 31 – Design System / UI Principles
       - 60 – User Guide Outline
       - 72 – Analytics & Events Plan
       - 76 – System Maps (Mermaid seed)
       - 78 – Prompt Library Seed
       - 83 – Project Kernel Spec (human-readable)
       - 84 – Onboarding Script (this flow)
       - 101 – Onboarding Script Library (for demos / calls)

---

## 2. Files in This Step

- `ai_onboarding_brain_dump.prompt.md`
  - LLM prompt for **Phase 1–2**: turn raw brain dump into structured project context + early doc mapping.
- `ai_onboarding_clarify.prompt.md`
  - LLM prompt for **Phase 3**: generate and refine clarification questions.
- `ai_generate_docs_from_kernel.prompt.md`
  - LLM prompt for **Phase 4**: given kernel + docs index + templates, fill specific docs.
- `ai_onboarding_to_kernel.mapping.md`
  - Human-readable spec explaining:
    - How onboarding answers map into `project_kernel.json` fields.
    - Which doc IDs get seeded first for Vibe vs Pro.

Your backend can use these files as **system / assistant prompts** (or literal file contents)
for whatever model you use (Claude, DeepSeek, GPT-4o, etc.).
