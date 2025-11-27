### AI Task Catalog

This doc enumerates the 6 core jobs where Context Ark calls an LLM.

---

### 1. Job Definitions (J1 - J6)

#### J1 – Intake & Triage
*   **Goal:** Compress messy user onboarding inputs into a clean `ProjectKernel` draft.
*   **Skills:** Summarization, classification, light reasoning, low latency.
*   **Persona:** Architect Guardian (Intake Mode).
*   **Typical Output:** `kernel_draft.json` (Goals, Constraints, Stack, Risks).

#### J2 – Deep Planner / Architect
*   **Goal:** Design the 50-doc pack structure, dependencies, and detailed outlines.
*   **Skills:** Long chain-of-thought, deep reasoning, constraint following, system design.
*   **Persona:** Architect Guardian (Planner Mode).
*   **Typical Output:** `doc_plan.json` (List of docs + sections).

#### J3 – Document Writer
*   **Goal:** Generate the actual content of the documentation (PRDs, FRDs, Architecture).
*   **Skills:** Long context output, structured writing, template adherence, low hallucination.
*   **Persona:** Doc Builder.
*   **Typical Output:** Markdown content (2k-4k tokens).

#### J4 – Refiner / Editor
*   **Goal:** Rewrite drafts based on user feedback, or perform linting/style consistency passes.
*   **Skills:** Copy-editing, style consistency, instruction following.
*   **Persona:** Doc Builder (Editor Mode).
*   **Typical Output:** Refined Markdown.

#### J5 – Cross-Pack QA & Coherence
*   **Goal:** Scan across multiple docs to find contradictions, gaps, and misaligned assumptions.
*   **Skills:** Massive context (1M+), retrieval-style reasoning, consistency checking.
*   **Persona:** Critic Reviewer.
*   **Typical Output:** QA Report / Issues List.

#### J6 – Budget Brain & Router Logic
*   **Goal:** Estimate costs, pick models for upcoming tasks, and calculate EV/margins.
*   **Skills:** Math, JSON manipulation, small context, high speed.
*   **Persona:** Model Router.
*   **Typical Output:** `router_decision.json`.

---

### 2. Execution Strategy

*   **Synchronous:** J6 (Router), J1 (Intake - partial).
*   **Asynchronous:** J2 (Planning), J3 (Writing), J5 (QA).
*   **Interactive:** J4 (Refining - often user-driven).
