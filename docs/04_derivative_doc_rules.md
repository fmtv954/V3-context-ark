### Derivative Doc Rules

This doc defines how some docs derive content from others while staying consistent.

---

### 1. Base vs Derivative Docs

* **Base docs**:

  * Directly generated from kernel + templates.
  * Examples:

    * product vision
    * primary flows
    * kernel schema.

* **Derivative docs**:

  * Generated from:

    * kernel
    * base docs
    * or higher-level summaries.
  * Examples:

    * marketing brief
    * agent map (future)
    * summarized scope for stakeholders.

---

### 2. Dependency Graph

Maintain a simple dependency graph:

```ts
type DocDependency = {
  docPath: string;
  dependsOn: string[]; // other doc paths or 'kernel.*'
};
```

Rules:

* Derivative doc must list:

  * which kernel sections it uses.
  * which base docs it can read from.
* Regeneration order:

  * Base docs first.
  * Derivative docs after.

---

### 3. Allowed Transformations

Derivative docs may:

* Summarize sections from base docs.
* Reorganize information for specific audiences (execs, devs, etc.).
* Highlight specific risk areas or flows.

They may **not**:

* Change canonical facts (users, goals, constraints).
* Contradict base docs.
* Quietly introduce new requirements.

Any new requirement discovered while generating derivative docs should:

* Be proposed in comments/notes, or
* Trigger a kernel update.

---

### 4. Regeneration Behavior

When a **base doc** changes:

* All derivative docs that depend on it are marked as:

  * "stale" or "review recommended".
* Optionally auto-queue regen for derivative docs, with:

  * a user-facing toggle:

    * "auto-sync derivative docs on change" (on/off).

When **kernel** changes:

* Base docs may need regen.
* The graph should propagate impact to derivative docs.

---

### 5. Practical MVP Simplification

For the 50-doc MVP:

* You can treat most docs as base docs driven directly from kernel.
* Only a few are truly derivative (e.g., summary or quick briefs).
* The rules above prepare you for future more complex dependency graphs.
