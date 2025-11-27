### Doc Pack Overview & Groups (50-Doc MVP)

This doc defines how the ~50-doc pack is grouped and how groups relate to the kernel.

---

### 1. High-Level Groups

The 50-doc MVP is organized into:

1. **Meta & Vision**
2. **User Flows & Onboarding**
3. **Kernel & Templates**
4. **AI Tasks & Models**
5. **Prompts & Personas**
6. **UI & UX**
7. **Platform & Architecture**
8. **Pricing & Credits**
9. **QA, RAG & Governance**

These groups combine to form a complete, AI-ready and dev-ready spec.

---

### 2. Example Mapping to File Paths

For example:

* **Meta & Vision**

  * `meta/01_product_vision_and_promise.md`
  * `meta/02_problem_and_pain_points.md`
  * `meta/03_target_users_and_personas.md`
  * `meta/04_mvp_scope_and_non_goals.md`
  * `meta/05_future_phases_and_extensions.md`

* **User Flows & Onboarding**

  * `flows/01_primary_user_journeys.md`
  * `flows/02_onboarding_questionnaire_spec.md`
  * `flows/03_onboarding_to_kernel_mapping.md`
  * `flows/04_revision_and_regeneration_flow.md`
  * `flows/05_review_checkpoints_and_approvals.md`
  * `flows/06_export_and_integration_paths.md`

…and so on, covering all 50 docs.

---

### 3. Relationship to Kernel

* Kernel is the **root**; every doc group reads kernel fields.

* Groups emphasize different views:

  * Meta & Vision → "Why this exists"
  * Flows & Onboarding → "How users move through it"
  * Platform & Architecture → "How it's built and runs"
  * AI Tasks & Prompts → "How AI interacts with it"

* No doc should introduce core facts that aren't reflected in the kernel.

---

### 4. Dependency Patterns

* **Meta & Vision** – mostly kernel-driven.
* **Flows & Onboarding** – kernel + some derived detail.
* **Platform & Architecture** – kernel + product + tech sections.
* **Pricing & Credits** – kernel's goals + product complexity -> suggestions.

Docs downstream of kernel changes must either:

* Update the kernel first, then regenerate; or
* Explicitly state that assumptions are speculative.

---

### 5. Use Cases

* Builders can:

  * Read **Meta & Flows** to quickly understand the product.
  * Dive into **Architecture & Data** for implementation.
* AI agents can:

  * Use Meta + Kernel as root context.
  * Pull more detailed docs as needed.
