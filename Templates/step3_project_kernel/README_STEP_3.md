# Step 3 – `project_kernel.json` (Per-Project Brain)

This step defines the shape of a single project's "kernel" – which docs, packs, and platform overrides control what the AI and humans see.

## Files

- `project_kernel.schema.json`
  - Describes the fields that every project's kernel config should have:
    - `project_id`, `name`
    - `pack_id` – which doc pack is used (`vibe_mvp` or `pro_builder`)
    - `platforms` – which AI coding tools this project is targeting (Cursor, Windsurf, Bolt, etc.)
    - `kernel` – the core brain:
      - `core_docs` – doc IDs always generated for this project
      - `ai_context_docs` – subset of docs fed into AI tools as context/spec
      - `human_only_docs` – docs mainly for humans to read
      - `feature_toggles` – flags that decide which optional docs to include
      - `platform_overrides` – per-platform tweaks to docs and behavior

- `project_kernel.vibe_example.json`
  - Example config for a Vibe MVP project using Cursor + Bolt.
  - Shows a minimal but powerful kernel:
    - Most docs are focused on story, flows, UI, and basic infra.
    - AI context is kept tight so Vibe Coders don't get lost.

- `project_kernel.pro_example.json`
  - Example config for a Pro Builder project using Cursor + Windsurf + Lovable.
  - Shows a heavier kernel with architecture, AI infra, risk, growth, and legal docs.
  - Demonstrates how `platform_overrides` can prioritize specific docs per tool.

## How this connects to Steps 1 & 2

- Step 1 (`docs_index.json`) tells you which docs exist and what they mean.
- Step 2 (`vibe_mvp.json`, `pro_builder.json`) tells you which doc IDs are core vs optional per pack.
- Step 3 (this step) tells you, **for one specific project**:
  - Which pack it's using.
  - Which docs the AI should read vs which are just for humans.
  - How to speak each platform's machine language via `platform_overrides`.

In implementation, your backend can:

1. Ask the user their tier (Vibe vs Pro) and target platforms.
2. Build a `project_kernel.json` by:
   - Pulling doc IDs from the chosen pack.
   - Applying feature toggles (e.g., include_legal, include_growth).
   - Splitting docs into `ai_context_docs` vs `human_only_docs`.
3. Use this kernel to:
   - Generate Markdown templates for each doc.
   - Create platform-specific prompt packs and rules files.
