# 46 – Security Architecture & API Security

> How we protect data, users, and infrastructure at a technical level.
> Audience: security-minded engineers, DevOps, AI tools touching auth or access control.

## 1. Security Objectives

- **What we are protecting and from whom (high level):**
  - {{security_objectives}}

## 2. Authentication

- **How users authenticate (email link, OAuth, SSO, etc.):**
  - {{auth_mechanisms}}
- **Session management (JWTs, cookies, expiry):**
  - {{session_management}}

## 3. Authorization

- **Access control model (RBAC, ABAC, tenant-scoped, etc.):**
  - {{authorization_model}}
- **How we enforce authz in code (middleware, policies):**
  - {{authz_enforcement}}

## 4. Data Protection

- **Encryption (in-transit, at-rest) highlights:**
  - {{encryption_practices}}
- **Handling of secrets (keys, tokens, environment variables):**
  - {{secret_management}}

## 5. API Security

- **Rate limiting, throttling, and abuse prevention:**
  - {{rate_limiting}}
- **Input validation and sanitization (in APIs and forms):**
  - {{input_validation}}
- **CORS and cross-origin rules (if relevant):**
  - {{cors_rules}}

## 6. Security Reviews & Updates

- **When and how we review security posture:**
  - {{security_review_process}}

## 7. Notes for AI Tools

- Do not weaken security measures for convenience.
- When adding endpoints or features, ensure they comply with these patterns.
