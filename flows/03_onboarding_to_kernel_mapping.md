### Onboarding → Kernel Mapping

This doc defines how each onboarding answer populates the `project_kernel`.

---

### 1. Kernel High-Level Shape

The `project_kernel` should have top-level sections like:

* `meta` – name, stage, pitch.
* `business` – goals, differentiation, market.
* `users` – primary/secondary personas, pains.
* `product` – features, flows.
* `tech` – stack, integrations, constraints.
* `success` – KPIs, risks, timeline.

---

### 2. Mapping Table (Simplified)

| Onboarding Step | Question                     | Kernel Field                            |
| --------------- | ---------------------------- | --------------------------------------- |
| Step 1          | Project Name                 | `meta.name`                             |
| Step 1          | One-line Pitch               | `meta.pitch`                            |
| Step 1          | Expanded Description         | `meta.description`                      |
| Step 1          | Primary Goal                 | `business.primary_goal`                 |
| Step 1          | Stage                        | `meta.stage`                            |
| Step 2          | Primary User / Customer Type | `users.primary.type`                    |
| Step 2          | Secondary Users              | `users.secondary[]`                     |
| Step 2          | User Pain Points             | `users.pain_points[]`                   |
| Step 2          | Competitors / Alternatives   | `business.competitors[]`                |
| Step 2          | Differentiation              | `business.differentiation`              |
| Step 3          | Core Features                | `product.features[]`                    |
| Step 3          | Must-Have vs Nice-to-Have    | `product.feature_priorities`            |
| Step 3          | Key Flows / Journeys         | `product.user_flows[]`                  |
| Step 3          | Non-Functional Requirements  | `product.non_functional_requirements[]` |
| Step 4          | Preferred Tech Stack         | `tech.preferences`                      |
| Step 4          | Non-Negotiables              | `tech.hard_constraints[]`               |
| Step 4          | Integrations                 | `tech.integrations[]`                   |
| Step 4          | Hosting & Data Requirements  | `tech.hosting_and_data`                 |
| Step 5          | Key Metrics / KPIs           | `success.metrics[]`                     |
| Step 5          | Main Risks or Unknowns       | `success.risks[]`                       |
| Step 5          | Timeline & Constraints       | `success.timeline_and_constraints`      |
| Step 5          | Anything Else                | `meta.misc_notes`                       |

---

### 3. Derived / Normalized Fields

Some kernel fields may be **derived**:

* `users.primary.problem_summary`

  * Summarized from `users.pain_points[]` and `business.primary_goal`.

* `product.primary_flow`

  * The key flow extracted from `product.user_flows[]` (e.g., signup → action → output).

* `product.scope_summary`

  * Short summary of:

    * must-have features
    * nice-to-have features.

The AI should **normalize** certain fields:

* Split bullet lists into arrays.
* Trim whitespace, remove duplicates.
* Standardize enums (e.g., `meta.stage` = `idea|prototype|mvp|live`).

---

### 4. Validation & Gaps

If any critical fields are missing (e.g., no pains, no goal), the builder persona should:

* Ask follow-up questions in the chat panel, or
* Mark kernel with flags like `meta.missing_fields[]`.
