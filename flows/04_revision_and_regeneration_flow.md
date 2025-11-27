### Revision & Regeneration Flow

This doc describes how users adjust docs after first generation.

---

### 1. Types of Revisions

1. **Kernel Edits**

   * User edits the project kernel (change goals, features, constraints).
2. **Doc Edits**

   * User manually edits specific docs in the editor.
3. **Doc Regeneration**

   * User asks AI to regenerate specific docs (or later, specific sections).

---

### 2. Kernel Edit Flow

1. User opens **Kernel Panel**.

2. Makes edits to fields (e.g., add new feature, change target user).

3. On save:

   * System creates a new kernel version (`v2`).
   * System evaluates **doc impact**:

     * Which docs are directly or indirectly affected?

4. System prompts user:

   * "Your kernel changed. Do you want to:

     1. Only use the new kernel for future docs, or
     2. Regenerate affected docs now?"

5. If user chooses **Option 2**:

   * Affected docs are enqueued for regeneration.
   * Their status changes to "pending regeneration" / "regenerating".
   * Old versions can be kept in history for reference.

---

### 3. Single Doc Regeneration Flow

1. User opens a doc in the workspace.
2. Clicks **"Regenerate Doc"**.
3. System:

   * Confirms prompt: "Regenerate using latest kernel and templates?"
   * Enqueues a regeneration job for that doc.
4. Doc status:

   * `regenerating` → `generated`.
5. Optional:

   * Offer "Compare old vs new" diff view.
   * Let user accept or revert.

---

### 4. Multi-Doc Regeneration Flow (MVP-light)

MVP can support simple multi-select:

1. User selects several docs in file tree.
2. Clicks **"Regenerate selected"**.
3. Same as single-doc, but queue multiple jobs.

---

### 5. Manual Doc Edit Flow

1. User opens doc.
2. Edits sections manually in the editor.
3. On save:

   * Doc is flagged as `manual_modified = true`.
   * Future auto-regenerations:

     * Ask user if they want to overwrite manual edits.
4. Option:

   * Provide a **"Lock this doc"** toggle:

     * Locked docs are not auto-regenerated even if kernel changes.

---

### 6. UX & Safety

* Always confirm destructive actions:

  * Regenerating many docs.
  * Overwriting manual edits.
* Show clear status labels:

  * Original generated
  * Manually edited
  * Regenerated (v2)
* Keep a simple history (at least last version) behind a "View previous version" button.
