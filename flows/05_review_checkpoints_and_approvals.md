### Review Checkpoints & Approvals

This doc defines when the user must approve key artifacts.

---

### 1. Checkpoint 1 – Kernel Approval

**Gate:** Before mass doc generation.

1. After onboarding, Ark produces a **kernel preview**.
2. User can:

   * Edit key fields.
   * Ask clarifying questions in chat.
3. They must click **"Approve kernel"** before:

   * The system generates the full doc pack.

System stores:

* `kernel.version = v1`
* `kernel.approved_at = timestamp`

---

### 2. Checkpoint 2 – Doc Pack Overview

**Gate:** Before final export.

1. Once most docs in the pack are generated:

   * Show a **summary view**:

     * categories (vision, flows, architecture…)
     * counts (generated, pending, failed).
2. User can:

   * Quickly skim titles & statuses.
   * Mark certain docs as **"Needs review"** or **"Approved"**.
3. When ready, user clicks **"Approve doc pack"** (soft approval).

System stores:

* `doc_pack.approved_at`
* `doc_pack.approved_by_user_id`

---

### 3. Checkpoint 3 – Per-Doc Approval (Optional but Recommended)

Each doc can carry:

* `status`:

  * `generated`
  * `edited`
  * `approved`
* `approved_by`
* `approved_at`

UX:

1. In file tree, user sees checkmarks next to **approved** docs.
2. In doc view, user can click **"Mark as approved"** once satisfied.

---

### 4. Changes After Approval

If kernel or core inputs change **after** approval:

* System should warn:

  * "Changes may affect approved docs."
* Offer:

  * "Keep approvals, but mark impacted docs as 'Review recommended'."
  * Or "Reset approvals for impacted docs."

This keeps the user aware of drift.

---

### 5. Export & Approval Link

* Ideally, export metadata includes:

  * Kernel version.
  * Date/time of doc pack approval.
  * Who approved it.
* So when handing off to devs or AI agents, they know:

  * This spec is the **approved version**, not a random draft.
