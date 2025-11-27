# 76 – System Maps & Visual Diagrams

> Visual cockpit for Quantum Voice AI. Keep these diagrams in sync
> with the current MVP behavior.

## 4. Product / User Flow (Mermaid)

```mermaid
flowchart TD
    U[Caller] --> QR[Scan QR Code]
    QR --> LP[Call Landing Page]
    LP --> JOIN[Join Voice Call]
    JOIN --> TALK[Talk to AI Agent]
    TALK --> SUMMARY[Summary & Lead Saved]
    SUMMARY --> TASK[Asana Task Created]
    SUMMARY --> EMAIL[Email Summary Sent]
```

- Main MVP path from scan → call → summary.
- As system grows, additional branches can be added.

## 5. System Context Diagram (Mermaid)

```mermaid
flowchart LR
    Caller[Caller] --> Web[QR Call Page (Next.js)]
    Web --> LK[LiveKit Room]
    LK --> Agent[Voice Agent Backend]
    Agent --> STT[Deepgram STT]
    Agent --> LLM[AI Router / LLMs]
    Agent --> TTS[Deepgram TTS]
    Agent --> DB[(Supabase)]
    Agent --> Asana[Asana API]
    Agent --> Email[Email Provider]
```

- Shows all major external dependencies for MVP.

## 6. Component Diagram (Mermaid)

```mermaid
flowchart TB
    subgraph Frontend
        FE1[Marketing Site]
        FE2[Call Landing Page]
        FE3[Admin Dashboard]
    end

    subgraph Backend
        API[HTTP API / BFF]
        Worker[Integration Worker]
    end

    subgraph Voice
        LK[LiveKit Server]
        VA[Voice Agent Service]
    end

    subgraph Data
        DB[(Supabase DB)]
    end

    FE1 --> API
    FE2 --> LK
    FE3 --> API
    LK --> VA
    VA --> API
    API --> DB
    Worker --> DB
    API --> Worker
```

## 7. Sequence Diagram (Mermaid)

```mermaid
sequenceDiagram
    participant C as Caller
    participant FE as Call Page
    participant LK as LiveKit
    participant VA as Voice Agent
    participant DB as Supabase
    participant AS as Asana
    participant EM as Email Service

    C->>FE: Open QR link
    FE->>LK: Join room
    VA->>LK: Join as agent
    C->>VA: Speak (audio)
    VA->>DB: Store partial lead data
    VA->>AS: Create follow-up task
    VA->>EM: Send summary email
```

These diagrams are starting points; update them as architecture evolves.
