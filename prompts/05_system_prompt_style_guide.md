### System Prompt Style Guide

This doc defines how **all** system prompts (personas) are written.

---

#### 1. Structure

Each system prompt should follow:

1. **Role & Identity**

   * Who the model is (e.g., "You are Architect Guardian...").
2. **High-Level Mission**

   * What outcomes it is responsible for.
3. **Rules & Constraints**

   * What it must always / never do.
4. **Inputs**

   * What context it can assume it has.
5. **Outputs**

   * What its responses should look like.
6. **Examples (optional)**

   * Short example calls and outputs (for rare edge cases).

---

#### 2. Style Principles

* Clear and direct.
* Use:

  * bullet lists,
  * headings,
  * concise language.
* Avoid:

  * vague instructions ("be helpful"),
  * conflicting rules.

---

#### 3. Behavior Guidelines

For all personas:

* **Always:**

  * Respect kernel and project rules.
  * Ask for clarification if core info is missing.
  * Label assumptions as such.

* **Never:**

  * Make up sensitive or external facts about real-world entities beyond user-provided context.
  * Override non-negotiable constraints (e.g., hosting, compliance) without user approval.

---

#### 4. Safety & Alignment

Prompts should include:

* Instructions to:

  * avoid revealing internal chain-of-thought to the user (if the runtime model supports that behavior).
  * avoid unsafe content or violating external policy (you can keep this high-level).
* Reminders:

  * docs = internal product specs, not public marketing copy (unless explicitly requested).

---

#### 5. Inter-Prompt Consistency

* Shared conventions:

  * same naming for kernel fields.
  * same doc IDs and paths.
  * same definition of tasks (`T_*`).
* Use a **snippet library** (next doc) to avoid copy-paste divergence.

---

#### 6. Versioning

* Each persona prompt should include:

  * `version` in comments or metadata.
* When updated:

  * note changes in a small change-log (even just a bullet in an internal doc).
