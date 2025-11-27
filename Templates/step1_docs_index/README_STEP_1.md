# Step 1 – docs_index.json

This zip contains the initial `docs_index.json` for your Context Architect / Spec-Driven workflow.

- It defines the schema and a set of core/high-priority docs (00, 05, 07, 09, 11, 18, 21, 23, 31, 33, 35, 38, 54, 56, 58, 60, 62, 64, 66, 70, 72, 74, 76, 78–102).
- Each entry includes:
  - `id` – numeric string like "72"
  - `filename` – the corresponding Markdown template
  - `category` – product / ai / infra / etc.
  - `summary` – one-line explanation
  - `audience` – who should read it
  - `tags` – quick filters like `kernel_core`, `vibe`, `pro`, `onboarding`

You can:
- Extend this file with the remaining doc IDs later.
- Wire this index into your pack configs (`vibe_mvp.json`, `pro_builder.json`).
- Use `kernel_core` and `vibe`/`pro` tags when building `project_kernel.json`.
