# 20 – System Architecture Overview

> High-level technical design of the system.
> Audience: engineers, architects, and AI coding tools.

## 1. Context Diagram (Narrative)

- **One-paragraph description of the overall system:**
  - {{architecture_summary}}
- **Key user types interacting with the system:**
  - {{architecture_actors}}

## 2. Major Components

- **Frontend apps (web, mobile, etc.):**
  - {{frontend_components}}
- **Backend services / APIs:**
  - {{backend_components}}
- **Data stores (databases, caches, file storage):**
  - {{data_stores}}
- **External services (auth, email, AI, payments, etc.):**
  - {{external_services}}

## 3. Data Flow (High-Level)

- **Main request/response flows (user → frontend → backend → data):**
  - {{data_flow_description}}

## 4. Deployment Topology

- **Where things run (hosting, regions, environments):**
  - {{deployment_topology}}

## 5. Cross-Cutting Concerns

- **Auth & authorization approach:**
  - {{auth_approach}}
- **Logging & monitoring (brief):**
  - {{logging_monitoring}}
- **Error handling strategy:**
  - {{error_handling}}

## 6. Known Tradeoffs & Constraints

- **Technical tradeoffs we accept at MVP:**
  - {{architecture_tradeoffs}}
- **Areas we plan to revisit for v1+:**
  - {{architecture_future_improvements}}

## 7. Notes for AI Tools

- Use this as the primary reference when:
  - Proposing new services
  - Changing how data flows
  - Adding new external dependencies
- If a requested change conflicts with this design, ask for confirmation and propose options.
