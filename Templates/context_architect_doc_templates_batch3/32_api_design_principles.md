# 32 – API Design Principles & Conventions

> Standard rules for REST/HTTP (or GraphQL) APIs in this project.
> Audience: backend engineers, AI tools generating API endpoints or clients.

## 1. API Style

- **Primary style (REST, GraphQL, RPC, mixed):**
  - {{api_style}}
- **Base URL / versioning strategy (e.g., /api/v1):**
  - {{api_versioning}}

## 2. Naming & Structure

- **Resource naming conventions (plural, snake/slug, etc.):**
  - {{resource_naming_conventions}}
- **Path patterns (e.g., /projects/{id}/tasks):**
  - {{path_patterns}}

## 3. Methods & Semantics

- **How we use HTTP methods (GET, POST, PUT, PATCH, DELETE):**
  - {{http_methods_usage}}
- **Idempotency rules:**
  - {{idempotency_rules}}

## 4. Request & Response Shapes

- **JSON structure conventions (camelCase, snake_case):**
  - {{json_conventions}}
- **Pagination pattern (cursor-based, offset, etc.):**
  - {{pagination_pattern}}

## 5. Error Handling

- **Standard error format (fields, example payload):**
  - {{error_format}}
- **Status codes mapping (what code for which scenario):**
  - {{status_code_conventions}}

## 6. Auth & Security (API Layer)

- **How APIs are authenticated/authorized:**
  - {{api_auth_strategy}}

## 7. Notes for AI Tools

- Follow these conventions when creating or updating endpoints.
- If a new endpoint doesn’t fit, propose updates to this doc before implementing.
