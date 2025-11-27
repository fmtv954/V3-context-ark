# Example Project – Quantum Voice AI: QR-to-Call Lead Agent

This is an example **output folder** from Context Architect.

It models a product where a user scans a QR code, talks to a voice agent,
and the system captures leads, creates follow-up tasks, and sends summaries.

## What’s inside

- `AGENTS.md` – Master spec & rules for SDD / AI tools
- `project_kernel.json` – Structured “project brain”
- `docs/` – Core product, architecture, safety, and business docs
- `platform/` – Per-platform rule files (Cursor, Windsurf, Cline, etc.)
- `system/` – Runtime flow spec (how this bundle was generated)

## How to use this folder

1. Open it in your AI coding tool (Cursor, Windsurf, etc.).
2. Tell the tool something like:

   > “Read AGENTS.md, project_kernel.json, and all docs/*.md.
   > Then propose a plan to implement the MVP in this repo.”

3. For platform configs (e.g. `.cursorrules`, `.windsurfrules`),
   copy them from `platform/<name>/` to the actual locations those
   tools expect in a real project root.

This is a **teaching artifact** + **starter spec**, not production code.
