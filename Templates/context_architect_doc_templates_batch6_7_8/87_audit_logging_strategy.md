# 87 – Audit Logging & Traceability Strategy

> How we track important actions for debugging, compliance, and trust.
> Audience: backend, security, AI tools dealing with logging.

## 1. What We Log

- **Key actions and events to log (auth, config changes, etc.):**
  - {{audit_log_events}}

## 2. Log Structure

- **What fields each log entry should contain (who, what, when, where):**
  - {{audit_log_structure}}

## 3. Storage & Retention

- **Where logs are stored and how long we keep them:**
  - {{audit_log_storage_retention}}

## 4. Access

- **Who can access audit logs and how:**
  - {{audit_log_access_rules}}

## 5. Notes for AI Tools

- When generating code, ensure sensitive actions are logged per this doc.
