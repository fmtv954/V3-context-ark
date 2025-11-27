### Kernel Generation Process

This doc defines how Context Ark turns onboarding input into a high-quality `ProjectKernel`.

---

### 1. Inputs

* Raw onboarding answers (steps 1–5).
* Any follow-up answers collected via chat.
* Defaults/assumptions from engine profile (`quick` vs `standard`).

---

### 2. Phase 1 – Normalize Onboarding Data

1. **Parse answers**

   * Split bullet lists into arrays.
   * Trim whitespace, drop empty entries.
2. **Standardize enums**

   * Map stage to one of `idea | prototype | mvp | live`.
3. **Sanity-check completeness**

   * Check required fields (see kernel schema doc).
   * Mark missing fields.

---

### 3. Phase 2 – Draft Kernel (LLM + Rules)

1. Pass normalized onboarding data + mapping spec into the **Kernel Builder** persona.
2. The LLM builds a first-draft kernel object:

   * Exactly matching `ProjectKernel` shape.
   * Fills unknowns with explicit `"UNKNOWN"` or `"TODO"` markers, not fake data.
3. Kernel Builder must:

   * Derive `primaryFlow`, `problemSummary`, and `featurePriorities` where possible.
   * Keep textual fields concise but specific (1–3 sentences each).

---

### 4. Phase 3 – Validation & Tightening

After draft kernel:

1. **Schema validation**

   * Check types, required fields, allowed enums.
   * If invalid, re-run with corrections or show error.

2. **Constraint checks**

   * Ensure no self-contradictions:

     * e.g., "must be offline-only" vs "uses always-on cloud API".
   * If contradictions detected:

     * Add to `success.risks[]` as "potential conflict".
     * Flag for user review.

3. **Normalization**

   * Shorten overly long fields.
   * Convert paragraph lists into arrays where appropriate.

---

### 5. Phase 4 – User Review & Approval

1. Show user a **Kernel Review UI**:

   * Grouped by `meta`, `business`, `users`, `product`, `tech`, `success`.
2. Let user:

   * Edit text inline.
   * Add/remove items from arrays.
3. Once satisfied, user clicks **"Approve kernel"**.
4. System:

   * Stores as `version = v1`.
   * Locks this version as the basis for first doc pack generation.

---

### 6. Phase 5 – Minor Adjustments After Approval

* Minor edits (typos, copy cleanups) do **not** auto-trigger doc regeneration.
* Structural changes (new core feature, changed target user) will:

  * Trigger "impacted docs" logic, handled by the update/versioning process.
