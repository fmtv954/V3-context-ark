# 48 – Observability, Logging & Monitoring

> How we see what the system is doing in production.
> Audience: backend, DevOps, SRE, AI tools touching logging/metrics.

## 1. Observability Goals

- **What we want to be able to see/answer about the system:**
  - {{observability_goals}}

## 2. Logging Strategy

- **Log levels and when to use them (debug, info, warn, error):**
  - {{log_levels_usage}}
- **What must be logged (and what must never be logged):**
  - {{logging_requirements}}
- **PII / sensitive data logging rules:**
  - {{logging_pii_rules}}

## 3. Metrics

- **Key technical metrics (latency, error rate, throughput, etc.):**
  - {{technical_metrics}}
- **Key product metrics to instrument (activation, retention events, etc.):**
  - {{product_metrics}}

## 4. Traces / Request Flows

- **How we trace requests through services (if applicable):**
  - {{tracing_approach}}

## 5. Alerting

- **What conditions should trigger alerts:**
  - {{alert_conditions}}
- **Where alerts go (Slack, email, PagerDuty, etc.):**
  - {{alert_channels}}
- **Who is on the hook to respond:**
  - {{alert_ownership}}

## 6. Notes for AI Tools

- When adding new features in sensitive areas, consider:
  - Where logs and metrics should be added.
- Do not log secrets or sensitive data.
