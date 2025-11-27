### Single Doc Regeneration Rules

This doc defines guardrails for regenerating an individual doc.

---

### 1. Triggers for Single-Doc Regen

User may request regen when:

* The doc is unclear or too generic.
* Kernel has changed and they want this doc updated.
* The doc has internal contradictions.

System may request regen when:

* Generation previously failed.
* Internal QA flags the doc as low quality.

---

### 2. Inputs to Regeneration

Regen must use:

* Latest **approved kernel**.
* Latest **doc template** for that doc.
* Any **locked constraints**:

  * Titles or headings that should not change.
  * Certain sentences or sections, if you support partial locking later.

Optional:

* Previous doc version as reference (for diff & safety).

---

### 3. Non-Negotiable Rules

When regenerating:

1. **No new facts outside kernel**

   * Do not invent new users, goals, or stack elements.
2. **Respect global constraints**

   * Always follow project-wide rules (e.g., compliance, tech bans).
3. **Prefer consistency over clever rewrites**

   * Do not radically change structure unless template changed.
4. **Label unknowns**

   * If kernel lacks data, use explicit `TODO:` or "Unknown" markers, not guesses.

---

### 4. Partial vs Full Regeneration (MVP)

MVP can implement **full-regeneration only** with an eye for partial later:

* Full regen:

  * Entire doc is regenerated according to template.
* Partial regen (future):

  * Users could highlight a section and ask:

    * "Rewrite this section only."

Even with full regen, you can:

* Show "before vs after" diff.
* Allow user to accept or revert.

---

### 5. Versioning & History

Each regen should:

* Increment a `doc_version` integer.
* Store previous version in history (last N versions).
* Allow viewing previous version for manual copy/paste if needed.

Metadata:

```ts
type DocVersionMeta = {
  version: number;
  generatedAt: string;
  generatedBy: 'ai' | 'user';
  kernelVersion: number;
  notes?: string;
};
```

---

### 6. UX & Safety Prompts

Before regen:

* Prompt user:

  * "Regenerate this doc using the latest kernel and templates?"
* If doc has **manual edits**:

  * Warn:

    * "You have manual edits. Regeneration may overwrite them. Continue?"

After regen:

* Show diff if possible.
* Let user:

  * Accept new version,
  * Or revert to previous.
