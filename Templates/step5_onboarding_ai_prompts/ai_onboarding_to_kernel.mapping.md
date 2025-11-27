# Onboarding → Kernel → Docs Mapping (Human Spec)

This file explains, for humans and future you, how onboarding flows into the project kernel
and which docs get generated first for each pack.

---

## 1. From Onboarding to Kernel

Inputs:

- Brain dump
- Onboarding clarification answers
- Chosen `pack_id` (Vibe vs Pro)
- Target platforms (Cursor, Windsurf, Bolt, etc.)

Process (using the prompts in this folder):

1. `ai_onboarding_brain_dump.prompt.md`
   - Produces:
     - `project_context`
     - initial `kernel_suggestion`
     - `doc_seed_notes` for many important docs
     - `missing_info_questions`

2. `ai_onboarding_clarify.prompt.md`
   - Uses:
     - `project_context`
     - `kernel_suggestion`
     - `doc_seed_notes`
   - Produces:
     - Question blocks mapped to doc IDs.

3. User answers questions in-app.

4. Backend synthesizes final:
   - `project_kernel.json` (based on pack + kernel_suggestion + answers)
   - merged `doc_seed_notes` incorporating clarification answers.

---

## 2. First-Wave Docs per Pack

### Vibe MVP Pack – First-Wave Docs

Focus on **narrative + MVP path + UI + pricing + analytics basics**.

Recommended first-wave generation using `ai_generate_docs_from_kernel.prompt.md`:

- 00 – AGENTS / Master Spec
- 07 – Problem & Solution
- 11 – Quickstart / First MVP Journey
- 18 – User Journeys & Scenarios
- 31 – Design System & UI Principles
- 38 – Auth / Permissions Overview (lightweight)
- 56 – Basic Deployment Plan
- 60 – User Guide Outline
- 64 – Pricing & Packaging Sheet
- 72 – Analytics & Event Tracking Plan
- 76 – System Maps (Mermaid seeds)
- 78 – Prompt Library (MVP core patterns)
- 83 – Kernel Spec (human-readable)
- 84 – Onboarding Script (how this project was set up)
- 101 – Onboarding Script Library (for demos / calls)

### Pro Builder Pack – First-Wave Docs

Focus on **architecture + AI infra + reliability + growth + compliance**,
in addition to everything Vibe gets.

Add to the Vibe list:

- 21 – Voice / Assistant Behaviour Spec
- 23 – Voice / Call Routing Spec (if voice product)
- 33 – Extended Architecture / Data Flows
- 35 – RAG / Knowledge Base Strategy (if applicable)
- 54 – Production Deployment & Environments
- 58 – Cost Management & FinOps Plan
- 62 – Support & SLAs Overview
- 66 – Growth Experiments & Channels
- 70 – Feedback Loops & Feature Iteration
- 79–82 – AI Infra, Routing, Evaluation & Safety
- 85 – AI Evaluation & Benchmarking Plan
- 86 – Legal & Compliance Notes (if turned on)
- 89–92 – Reliability, Incident Playbooks, Monitoring
- 93–94 – Data Retention, Privacy, Regulator Docs
- 95–99 – Internal Tools, Partner, Sandbox, Compliance Briefs
- 100 – Marketing Site Spec
- 102 – Long-Term Roadmap & North Star

In practice, you don’t have to generate ALL of these at once.
You can:

- Generate Vibe first-wave docs for everyone.
- For Pro, offer a toggle: “Generate advanced docs now” vs “Later.”

---

## 3. How This Feeds AI Tools

Once the first-wave docs are generated:

- They live as `.md` files in the repo.
- `project_kernel.json` decides which ones go into `ai_context_docs`.
- Platform-specific adapters (.cursorrules, .windsurfrules, etc.) make tools like Cursor/Windsurf read these docs before coding.

This gives you an end-to-end flow:

Brain Dump → Onboarding Prompts → Kernel + Docs → Platform Rules → Code.
