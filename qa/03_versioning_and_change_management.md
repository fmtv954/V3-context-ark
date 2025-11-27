### Versioning & Change Management

This doc specifies how Ark handles changes to docs, templates, and kernels.

---

### 1. Doc Versioning

*   **Structure:** Major.Minor (e.g., `v1.2`)
    *   **Major:** Kernel Update or Full Regeneration.
    *   **Minor:** Manual edit or partial correction.
*   **Storage:** History stored in `runs` table (diffs or full snapshots).

---

### 2. Kernel Versioning

*   **Trigger:** Any change to `project_kernel.json` increments `kernelVersion` (integer).
*   **Impact Analysis:**
    *   When Kernel increments, system checks `dependsOn` graph.
    *   Docs depending on changed fields are flagged `outdated`.

---

### 3. Template Versioning

*   **Central Updates:** We (Ark team) update templates occasionally.
*   **User Impact:** Existing projects are **pinned** to the template version used at creation unless they explicitly "Upgrade Doc Pack".
*   **Migration:** "Upgrade" runs a diff check to see if custom edits conflict with new template structure.

---

### 4. Change Management Workflow

1.  **User Request:** "Change DB from Postgres to Mongo."
2.  **Kernel Update:** AI updates `kernel.techStack.db`.
3.  **Impact Calc:** System flags `platform/04_data_model` and `platform/06_config` as stale.
4.  **Regeneration:** User approves regen of stale docs.
5.  **Version Bump:** Docs move from `v1.0` to `v2.0`.
