# Step 8 – Runtime Flow Spec (Orchestration Blueprint)

This step defines **how Context Architect actually runs** at runtime:

- Which AI calls happen, in what order.
- Which docs are read / written at each step.
- How Vibe vs Pro flows differ (light vs full stack).
- How this ties into your **tiered model router** (Free / Builder / Pro).

You can treat this as the **API + Orchestration spec** for a future backend:

- A human engineer can implement it in Node, Python, Go, etc.
- An AI coding tool (Cursor, Windsurf, Cline) can read it and scaffold the backend.
