# 38 – Permissions, Roles & Tenancy Model

> Defines who can do what, where, and in which “space” (tenant/project).
> Audience: backend, frontend, security, AI tools touching authz-sensitive logic.

## 1. Tenancy Model

- **Tenancy type (single-tenant, multi-tenant, hybrid):**
  - {{tenancy_type}}
- **Top-level tenant concept (e.g., workspace, org, team):**
  - {{tenant_concept}}
- **How users belong to tenants:**
  - {{tenant_membership_rules}}

## 2. Roles

- **List of roles (e.g., owner, admin, member, viewer):**
  - {{roles_list}}
- **Per-role high-level capabilities:**
  - {{role_capabilities_summary}}

## 3. Permissions Matrix (Conceptual)

- **Which roles can perform which actions (write conceptually, not as a full ACL):**
  - {{permissions_matrix_description}}

## 4. Scope of Actions

- **What actions are scoped to tenant, project, or global:**
  - {{action_scopes}}

## 5. Enforcement Strategy

- **Where and how we check permissions (backend, middleware, RLS, etc.):**
  - {{permission_enforcement_strategy}}

## 6. Notes for AI Tools

- When creating features or API endpoints:
  - Respect the roles and scopes defined here.
  - Do not grant powerful actions to low-privilege roles.
