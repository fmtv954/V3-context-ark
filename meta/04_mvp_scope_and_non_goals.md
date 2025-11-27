### MVP Scope & Non-Goals – Context Ark Doc Engine 3.0

#### 1. MVP Objective

Deliver a **web-based Context Ark Doc Engine** that:

* Takes a user from **brain dump → project kernel → ~50-doc spec pack**.
* Runs as a **hosted web app** (you own backend + DB).
* Supports:

  * single-project workspace with chat + file tree + doc viewer/editor
  * a fixed set of ~50 core docs
  * simple export of the doc pack.

---

#### 2. MVP In-Scope

1. **Onboarding & Intake**

   * Single onboarding wizard that collects:

     * business context
     * users & ICP
     * goals & constraints
     * tech preferences (if any).
   * Brain dump → structured fields mapping.

2. **Kernel Generation**

   * AI builds a **project kernel** from onboarding.
   * Kernel is stored in DB and can be viewed/edited by the user.

3. **50-Doc Pack Generation**

   * Deterministic list of ~50 docs.
   * Each doc generated from:

     * kernel
     * doc template
     * global rules (Architect Guardian).
   * Basic status tracking:

     * pending, generating, generated, needs review, approved.

4. **Workspace UI**

   * Bolt-style layout:

     * Left: file tree + statuses.
     * Center: doc viewer/editor.
     * Right: chat with Architect/Builder/Critic personas.
   * Docs displayed as markdown.

5. **Single-Doc Regeneration**

   * Ability to select a doc and:

     * regenerate full doc
     * optionally regenerate sections (MVP: can be simple "full doc heal").

6. **Basic Export**

   * Export the entire pack as:

     * zip (markdown files)
     * or a single bundled markdown / JSON.

7. **Basic Model Routing**

   * Use a simple **ModelRouter**:

     * one reasoning model for planning/kernel.
     * one writer model for doc generation.
     * optionally a lighter model for critic.

---

#### 3. Non-Goals for MVP

1. **No full RAG over external sources**

   * MVP does **not** crawl GitHub repos, websites, or knowledge bases live.
   * External repos (Cline, AgenticSeek, etc.) are only used to design Ark's own internal docs and prompts.

2. **No code execution / dev environment**

   * MVP doesn't compile or run code.
   * No Monaco-based full IDE, no live preview of apps.
   * Focus is **docs, not running projects**.

3. **No complex orchestration layer**

   * MVP does **not** include n8n or similar orchestrator.
   * No scheduled runs or multi-system automations.
   * A simple internal queue (e.g., Redis/BullMQ or equivalent) for doc jobs is enough.

4. **No full billing / subscription system**

   * MVP can assume:

     * manual gating
     * or simple plan flags.
   * Advanced billing, webhooks, Stripe integration can be added later.

5. **No multi-tenant org management**

   * MVP focuses on **single user / single account** with a list of projects.
   * org/teams, roles/permissions, audit trails are out-of-scope.

6. **No 102-doc pack**

   * MVP is fixed at **~50 docs**.
   * 102-doc "pro pack" is a planned extension.

---

#### 4. Technical Constraints for MVP

* Web app using modern stack (Next.js, API routes, DB).
* Database for:

  * users, projects, kernels, docs, runs.
* LLM providers accessed via HTTP APIs (OpenAI-compatible / OpenRouter / others).
* Jobs can be processed:

  * synchronously for small runs, or
  * via a simple job queue for the 50-doc pack.

---

#### 5. Success Criteria for MVP

* A user can:

  * Create a new project.
  * Complete onboarding.
  * Generate a ~50-doc pack.
  * Review and tweak at least a few docs.
  * Export the pack.

* The system:

  * Handles multiple concurrent projects without blocking the UI.
  * Keeps docs consistent with the kernel and main constraints.
