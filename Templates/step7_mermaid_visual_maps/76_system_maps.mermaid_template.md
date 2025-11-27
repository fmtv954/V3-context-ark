---
id: "76"
filename: "76_system_maps.md"
category: "architecture_visuals"
audience: ["founder", "engineer", "designer", "ai_tools"]
tags: ["mermaid", "system-maps", "architecture", "flows", "visual"]
status: "draft-template"
---

# 76 – System Maps & Visual Diagrams

> This doc is the **visual cockpit** for the project.
> Every time the architecture, flows, or key journeys change,
> update the diagrams here so humans *and* AI can see the system at a glance.

---

## 1. Purpose

- Give a **visual overview** of the product, from user journeys to system internals.
- Help Vibe coders, Pro builders, and AI tools understand:
  - What the main flows are.
  - Which components exist and how they talk to each other.
  - Where data moves and where risks hide.
- Act as the **source diagrams** that can be reused in docs, decks, and marketing.

---

## 2. When to Use / Update This Doc

- After initial onboarding: create **very rough** diagrams from the kernel.
- When you add/remove major features.
- Before and after big refactors (so you can compare "before" vs "after").
- Before a launch, demo, or handoff to another team.

---

## 3. Diagram Types We Use

Use Mermaid for all diagrams so they can be edited as text:

1. **Product / User Flow** – how users move through the app.
2. **System Context Diagram** – high-level boxes and arrows.
3. **Component Diagram** – main services, modules, or front/back pieces.
4. **Sequence Diagram** – step-by-step call flows (e.g., signup, voice call).
5. **Deployment / Infra Diagram** – environments, services, queues, etc. (Pro tier).

You do **not** need all of these on day one.
Start with Product Flow + System Context, then grow as the project matures.

---

## 4. Product / User Flow (Mermaid)

Describe the main user journey (or the MVP one) visually.

```mermaid
flowchart TD
    U[User] --> A[Entry point: e.g., Landing or QR Scan]
    A --> B[Key Step 1]
    B --> C[Key Step 2]
    C --> D[Outcome or Next Step]
```

- Replace nodes with real labels ("Scan QR", "Talk to Voice Agent", "Receive Email Summary").
- For complex products, you can maintain **multiple flows**: e.g., New User, Returning User, Admin.

You may keep short bullets under the diagram explaining important edge cases.

---

## 5. System Context Diagram (Mermaid)

Show how the product sits among external systems and services.

```mermaid
flowchart LR
    User[User / Client] -->|HTTP/WebRTC| App[App Frontend]
    App --> API[Backend / API]
    API --> DB[(Primary Database)]
    API --> AI[AI Services]
    AI --> Vendor1[Vendor / External API 1]
    AI --> Vendor2[Vendor / External API 2]
```

Customize nodes to your actual stack (e.g., "Next.js", "Supabase", "LiveKit", "Deepgram").

---

## 6. Component Diagram (Mermaid)

Break the system into core logical components.

```mermaid
flowchart TB
    subgraph Frontend
        FE1[Web App]
        FE2[Admin Dashboard]
    end

    subgraph Backend
        BE1[API / BFF]
        BE2[Worker / Queue Processor]
    end

    subgraph AI
        LLM[LLM Orchestrator]
        RAG[RAG / Vector Search]
    end

    FE1 --> BE1
    FE2 --> BE1
    BE1 --> BE2
    BE1 --> LLM
    LLM --> RAG
```

Keep labels generic-but-meaningful so AI can map them to code modules later.

---

## 7. Sequence Diagram (Mermaid)

Use sequence diagrams for critical flows (signup, checkout, call routing, etc.).

```mermaid
sequenceDiagram
    participant U as User
    participant FE as Frontend
    participant API as API
    participant AI as AI Agent
    participant DB as Database

    U->>FE: Perform action (e.g., start call)
    FE->>API: Send request
    API->>AI: Invoke AI pipeline
    AI->>DB: Read/write data
    AI-->>API: Response
    API-->>FE: Result
    FE-->>U: Show outcome
```

Create one diagram per important flow. Name them clearly.

---

## 8. Deployment / Infra Diagram (Mermaid, Optional)

For Pro / Infra-heavy builds, include a deployment diagram.

```mermaid
flowchart LR
    subgraph CloudProvider
        LB[Load Balancer]
        S1[App Server]
        S2[App Server]
        Q[Queue]
        W[Worker]
        DB[(Database)]
        LOG[Logging / Metrics]
    end

    User[User] --> LB
    LB --> S1
    LB --> S2
    S1 --> Q
    S2 --> Q
    Q --> W
    W --> DB
    S1 --> LOG
    S2 --> LOG
    W --> LOG
```

Adapt to Vercel, Supabase, Fly.io, etc.

---

## 9. How AI Should Use This Doc

For tools like Cursor, Windsurf, Cline, etc.:

- When asked to change architecture or major flows:
  - **Read this doc + AGENTS.md + architecture docs** first.
  - Keep diagrams and code **conceptually aligned** (even if diagrams lag).
- This doc is **advisory but important** – if code diverges from diagrams, the AI should:
  - Mention the divergence.
  - Optionally propose updated diagrams (using Mermaid) to keep things in sync.

For onboarding flows, you can use AI prompts (see helper prompts in Step 7)
to auto-generate **first drafts** of these diagrams from the kernel.

---

## 10. Definition of Done

This doc is "good enough" when:

- At least **2–3 diagrams** exist:
  - One Product/User flow.
  - One System Context.
  - Optionally Component or Sequence for the main MVP path.
- Diagrams reflect the **current** MVP state.
- The founder / tech lead agrees that a new dev could look here and "get it" in under 5 minutes.

Update diagrams as you ship major features or refactor the system.
