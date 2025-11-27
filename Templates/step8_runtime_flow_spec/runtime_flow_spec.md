# Runtime Flow Spec – Context Architect

> Goal: Describe the **exact sequence of operations** from user brain-dump → project kernel → docs → platform packs → visuals.

This is *not* implementation code. It is the **orchestration blueprint**.

---

## 1. Conceptual Phases

We model the runtime as 6 phases:

1. **Onboarding Intake**
2. **Kernel Build**
3. **Doc Generation**
4. **Platform Prompt Packs**
5. **Visual Maps (Mermaid)**
6. **Export & Handoff**

Each phase has:

- Inputs (files / fields)
- AI calls (prompt templates + models)
- Outputs (new or updated docs)
- Human checkpoints (where we ask the user to confirm before moving on)

---

## 2. Core Inputs & Artifacts

### 2.1 Inputs from the user

- Raw text brain dumps (notes, PRDs, ideas)
- Uploaded files (PDFs, Notion exports, etc.)
- Answers to clarification questions
- Selected platform(s): e.g. `cursor`, `windsurf`, `bolt.new`
- Selected bundle: `vibe_mvp` or `pro_builder` (or both)

### 2.2 Key internal artifacts

- `AGENTS.md` – master spec & rules
- `project_kernel.json` – normalized, structured intent
- Doc templates (00–102) – stored as Markdown in the docs library
- Platform config files:
  - `.cursorrules`, `.windsurfrules`, `.clinerules`, etc.
- Visual maps doc:
  - `76_system_maps.md` (or `76_system_maps.mermaid_template.md`)

---

## 3. Phase-by-Phase Flow

### 3.1 Phase 1 – Onboarding Intake

**Input:** user brain-dump + uploads  
**AI prompt template:** `ai_onboarding_intake.prompt.md` (from your onboarding step)  
**Model routing:**

- Free tier → DeepSeek / Qwen
- Builder / Pro → Claude Haiku / Grok / GPT-4o mini

**Steps:**

1. User starts a project.
2. System collects:
   - Free-form text
   - Optional files
   - Basic metadata (project name, target audience, goals, time horizon).
3. AI call: *Onboarding Intake* → parses everything into a **first-pass kernel**:
   - project summary
   - problem / solution
   - key features
   - constraints
   - open questions
4. Output:
   - `onboarding_snapshot.json` (raw extraction)
   - `clarification_questions.md`

5. Human checkpoint:
   - Show user the summary + questions.
   - User answers questions or edits the summary.

---

### 3.2 Phase 2 – Kernel Build

**Input:** `onboarding_snapshot.json` + user answers  
**AI prompt template:** `ai_build_project_kernel.prompt.md`  
**Output:** `project_kernel.json` (single source of structured truth)

**Steps:**

1. AI merges:
   - Initial extraction
   - User corrections
   - Additional constraints (tier, platform, budget).
2. AI normalizes into **kernel schema**:
   - domain, audience, problem, solution
   - core workflows (MVP first)
   - tech stack hints (if provided)
   - monetization & business intent
3. Output file: `project_kernel.json`
4. Human checkpoint:
   - Show kernel in a readable Markdown view.
   - Ask: "Does this accurately represent the project you want?"

If approved → proceed to doc generation.

---

### 3.3 Phase 3 – Doc Generation

**Input:** `project_kernel.json` + bundle selection (`vibe_mvp`, `pro_builder`)  
**AI prompt templates:** one per doc group, e.g.:

- Core product docs (Vision, MVP, User Journeys)
- Architecture docs
- Safety / Guardrails
- Business docs (business model, pricing, analytics)

These refer back to the master doc index (00–102).

**Steps:**

1. System determines the **doc set** to generate:

   - Vibe MVP:
     - Minimum: Vision, MVP spec, User flow, Architecture-lite, Safety, Pricing, Analytics-lite, User Guide outline.
   - Pro Builder:
     - All of the above + deeper architecture, infra, testing, ops, risk, tech debt, etc.

2. For each doc ID:
   - Load the respective **doc template**.
   - Make 1 AI call per doc with:
     - `project_kernel.json`
     - Any supporting docs already generated in this run
     - The doc template instructions.

3. Outputs:
   - One Markdown file per doc (e.g., `11_mvp_spec.md`, `18_user_journeys.md`, etc.)

4. Human checkpoint:
   - Optionally present a summary page:
     - List of generated docs
     - One-line description for each
   - Let user flag docs that need revision before moving on.

---

### 3.4 Phase 4 – Platform Prompt Packs

**Input:**

- `project_kernel.json`
- Generated docs (at least the core ones)
- Selected platforms (e.g., `cursor` + `v0.dev`)

**AI prompt templates:**

- `platform/cursor/cursor_rules_from_docs.prompt.md`
- `platform/windsurf/windsurfrules_from_docs.prompt.md`
- etc.

**Steps:**

1. For each selected platform:
   - Read its **machine-language adapter** template (from Step 6).
   - Feed in:
     - Kernel
     - Paths to key docs (IDs mapped to filenames)
     - Any platform-specific preferences (e.g., JS vs TS).

2. AI generates platform config files, e.g.:
   - `.cursorrules`
   - `.windsurfrules`
   - `.clinerules`
   - `AGENTS.md` refinements if needed

3. Outputs per platform:
   - `platform/<name>/*` files ready to drop into repo.

No human checkpoint is strictly required here, but you can add one: show a diff-style view of rules before writing.

---

### 3.5 Phase 5 – Visual Maps (Mermaid)

**Input:**

- `project_kernel.json`
- Core journeys docs (e.g., 11, 18)
- Architecture docs
- Existing `76_system_maps.md` (if any)

**AI prompt template:** `step7_mermaid_visual_maps/ai_kernel_to_mermaid.prompt.md`

**Steps:**

1. AI reads kernel + key docs.
2. AI generates or updates sections in doc 76:
   - Product / User Flow
   - System Context
   - Component diagram
   - Optional sequence for main MVP.

3. Outputs:
   - Updated `76_system_maps.md`

Human checkpoint recommended here: show diagrams in an embedded Mermaid renderer and let user approve.

---

### 3.6 Phase 6 – Export & Handoff

**Goal:** Deliver a **ready-to-build project folder** the user can:

- Drop into Cursor/Windsurf/Replit, or
- Sync to GitHub, or
- Download as a zip.

**Folder layout (suggested):**

```text
/project-root
  AGENTS.md
  project_kernel.json

  docs/
    00_vision.md
    06_business_model.md
    08_brand_positioning.md
    11_mvp_spec.md
    18_user_journeys.md
    21_voice_architecture.md
    23_data_flows.md
    31_security_overview.md
    34_safety_guardrails.md
    60_user_guide_outline.md
    64_pricing_packaging.md
    72_analytics_plan.md
    76_system_maps.md
    ...

  platform/
    cursor/
      .cursorrules
    windsurf/
      .windsurfrules
    cline/
      .clinerules
    replit/
      .replit
      replit_agent_rules.md
    ...
```

At this point, Context Architect is "done" for that run. The next phase (outside this spec) is:

- User opens the project in their chosen AI coding tool.
- That tool now reads AGENTS.md + rules + docs to **generate actual code**.

---

## 4. Tier-Aware Model Routing (Runtime Hooks)

This spec is **model-agnostic**, but we assume you have a model router (e.g., LiteLLM, OpenRouter) with tiers:

- **Free / Entry:** DeepSeek, Qwen, etc.
- **Builder:** Claude Sonnet for docs + Grok / GPT-4o mini for side tasks.
- **Pro:** Claude Sonnet / GPT-4o as primaries + DeepSeek R1 for validation.

At each AI call, you can annotate the **required quality level**, e.g.:

- Onboarding intake → `quality: medium`
- Kernel build → `quality: high`
- Doc generation (public-facing) → `quality: high`
- Platform packs / rules → `quality: high`
- Visual maps → `quality: medium`

Your runtime can then:

- Choose appropriate models per call.
- Enforce per-project usage budgets.
- Optionally downshift to cheaper models if near the cap.

---

## 5. Human Checkpoints Summary

For Vibe coders, checkpoints keep them safe from "silent wrong":

1. **After kernel build** – confirm project_kernel.json.
2. **After core docs** – show doc list + key snippets.
3. **After visual maps** – render diagrams, ask "Does this look right?"
4. **(Optional) After platform packs** – show rules in a diff view.

For Pro builders, you can let them disable some checkpoints for speed.

---

## 6. Definition of Done (Runtime Orchestration)

We consider the runtime flow correctly implemented when:

- A user can go from **zero → zipped project** in a single run:
  - Onboarding → kernel → docs → platform packs → visuals → zip.
- All AI calls are traceable (logs know which prompt + model were used).
- Each phase can be **re-run independently** (e.g., regenerate docs after kernel changes, or only refresh visual maps).

This spec is the contract that your backend and AI tools must follow.
