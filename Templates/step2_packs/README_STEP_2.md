# Step 2 – Pack Definitions (`vibe_mvp` and `pro_builder`)

This step defines which docs from `docs_index.json` belong to each product tier.

## Files

- `vibe_mvp.json`
  - Target user: Vibe Coders going from brain-dump to MVP.
  - Focus: Minimum set of specs required to ship a real MVP without drowning them in infra/compliance.
  - Fields:
    - `id`: "vibe_mvp"
    - `label`: Human-readable name.
    - `description`: What this pack is for.
    - `notes`: Extra guidance for you/future devs.
    - `core_docs`: Doc IDs that should *always* be generated + used for the kernel.
    - `optional_docs`: Doc IDs that are available but not required for every Vibe project.

- `pro_builder.json`
  - Target user: Pro builders who want architecture, AI infra, scaling, risk and growth docs up front.
  - Focus: Near-production spec set, ready to hand to senior devs or AI tools like Cursor/Windsurf.
  - Same fields as `vibe_mvp.json`.

## MVP Toggle Integration

The system supports an **MVP toggle mode** (`docs_index.json` has `core_mvp`) for different project scopes.

- **core_mvp toggle** (8 docs): Ultra-minimal for rapid prototyping
- **vibe_mvp pack** (30 core docs): Complete shippable MVP with testing, deployment, analytics
- **pro_builder pack** (48 core docs): Full enterprise-ready specifications

## Recently Updated (2025.01.23)
- **vibe_mvp core expanded**: 18→30 docs (added testing, deployment, security, performance essentials)
- **pro_builder completed**: Now includes all 48 core docs for comprehensive production specs

## How this connects to the next step

In Step 3 (`project_kernel.json`):

- You will pick a `pack_id` (`"vibe_mvp"` or `"pro_builder"`) per project.
- The kernel logic will:
  - Load all `core_docs` for that pack.
  - Optionally add some `optional_docs` based on toggles (e.g., "include_legal", "include_growth").
  - Distinguish between:
    - Docs that go into AI context (e.g., 00, 18, 31, 38, 72, 78, 81, 83)
    - Docs that are mainly for humans to read in the workspace.

You can tweak core/optional membership at any time without changing the rest of the system.

## Next Steps

Phase 2 complete. Ready for:
- **Phase 3**: project_kernel.json schema and examples
- **Pack Integration**: Connect vibes_mvp/pro_builder to kernel configs
- **UI Implementation**: MVP toggle components for user selection
