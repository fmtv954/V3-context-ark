# Blackbox Prompt Caching – Example Usage

This project can use Blackbox API Prompt Caching to store the spec context
and reuse it cheaply across calls.

Example (conceptual):

- Cache ID: `quantum-voice-ai-spec`
- Cached content:
  - AGENTS.md
  - project_kernel.json (stringified)
  - Short summaries of key docs

When calling Blackbox from your editor/CLI, include:

- A reference to the cache ID.
- A short instruction like:

  > "Using the cached spec, implement the Next.js call landing page
  > for the QR-to-call flow."
