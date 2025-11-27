### Kernel Update & Versioning

This doc defines how kernels change over time and how that impacts docs.

---

### 1. Versioning Model

For each project:

* `kernel_version`: integer starting at 1.
* Every persisted change after approval increments version:

  * `v1`, `v2`, `v3`, …

Metadata stored:

```ts
type KernelVersionMeta = {
  version: number;
  createdAt: string;
  createdBy: string;
  changeSummary: string;
};
```

---

### 2. Types of Changes

1. **Minor Edits**

   * Fixing typos, rephrasing, adding clarity.
   * No structural impact (no new features, no changed target users).
2. **Structural Changes**

   * Adding/removing core features.
   * Changing primary user type.
   * Changing major constraints or goals.

---

### 3. Handling Minor Edits

* Minor edits can:

  * Update the current kernel version **without creating a new version**, or
  * Create a new version with a "minor change" tag (configurable).
* Docs are **not auto-regenerated**.
* Optionally flag docs as:

  * "Check for phrasing alignment" if necessary.

---

### 4. Handling Structural Changes

When user performs a structural edit:

1. System computes **diff** of kernel:

   * e.g., new feature added to `product.coreFeatures`.
2. Classify as **structural**.
3. Create **new kernel version** (`v2`).
4. Determine affected docs:

   * Use a simple dependency map (e.g., feature-related docs, flow docs, architecture docs).
5. Prompt user:

> "Your kernel changed in these areas: [list].
> These docs are impacted: [list].
> Do you want to:
>
> 1. Keep docs as-is and just use new kernel going forward, or
> 2. Regenerate impacted docs now?"

6. If user chooses option 2:

   * Queue regeneration jobs for affected docs.
   * Previous doc versions preserved in history.

---

### 5. Storing Kernel History

Keep a small history:

* Last N kernel versions (e.g., 5).
* Each with:

  * `version`, `createdAt`, `createdBy`, `changeSummary`.
* Allow user to:

  * View older versions.
  * Diff kernels (text diff with sections).

No rollback for MVP, but can be added later.

---

### 6. Impact on Exports

When exporting a doc pack:

* Include:

  * Current kernel version.
  * Short change summary.
* So consumers of the docs know:

  * Which kernel version the docs were generated from.
