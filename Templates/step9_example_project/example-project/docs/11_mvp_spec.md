# 11 – MVP Specification

## MVP Goal

Ship a working QR-to-call experience where:

- A user scans a QR code.
- Joins a browser-based voice call with an AI agent.
- The agent captures and summarizes lead info.
- A follow-up task is created in Asana.
- A summary email is sent to the business owner.

## In-Scope Features (MVP)

- Campaign creation (name, description, QR link).
- Hosted call page per campaign.
- AI voice agent with:
  - Greeting
  - 4–6 core qualifying questions
  - Closing / recap
- Asana integration (single workspace/board at first).
- Email summaries to one configured address.

## Out-of-Scope (for MVP)

- Multi-tenant Asana workspaces.
- Dynamic CRMs integrations (HubSpot, Salesforce).
- Complex routing trees (keep flows relatively linear).
- Custom voice cloning (use base voices).

## Technical Constraints

- One region (e.g. US) at launch.
- Use cost-effective models via OpenRouter / LiteLLM.
