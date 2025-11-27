# 72 – Analytics & Event Tracking Plan

> Defines what we track, why, and how.
> Audience: product, growth, engineering, AI tools instrumenting events.

## 1. Analytics Goals

- **What questions we want analytics to answer:**
  - {{analytics_goals}}

## 2. Core Events

For each key user action, define an event name and properties.

- **Event 1: {{event1_name}}**
  - When it fires: {{event1_trigger}}
  - Properties: {{event1_properties}}
  - Why it matters: {{event1_reason}}

- **Event 2: {{event2_name}}**
  - When it fires: {{event2_trigger}}
  - Properties: {{event2_properties}}
  - Why it matters: {{event2_reason}}

(Add more events as needed.)

## 3. Funnels & Key Flows

- **Activation funnel steps:**
  - {{activation_funnel}}
- **Retention-related events:**
  - {{retention_events}}

## 4. Implementation Notes

- **Analytics tools (e.g., PostHog, Amplitude, custom):**
  - {{analytics_tools}}
- **Naming conventions for events and properties:**
  - {{analytics_naming_conventions}}

## 5. Privacy & Opt-Out

- **User controls (consent, opt-out):**
  - {{analytics_privacy_controls}}

## 6. Notes for AI Tools

- When building UI or flows, ensure the correct event hooks can be attached.
- Do not log sensitive data as event properties.
