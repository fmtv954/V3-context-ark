# 72 – Analytics & Event Tracking Plan

## Core KPIs

- QR scans → call starts (conversion rate).
- Call starts → completed lead forms.
- Leads → Asana tasks successfully created.
- Average call duration by campaign.

## Events to Track

- `qr_scanned` – QR link opened.
- `call_joined` – LiveKit session started.
- `call_ended` – LiveKit session ended.
- `lead_created` – lead row written to DB.
- `asana_task_created` – integration success/failure.
- `email_summary_sent` – summary dispatch success/failure.

## Tools

- Start with Supabase logs + simple custom tables.
- Later: add product analytics (PostHog, Plausible, etc.).
