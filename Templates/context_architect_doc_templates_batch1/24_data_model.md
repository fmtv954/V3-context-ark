# 24 – Data Model & Domain Concepts

> Describes the core entities, their relationships, and key fields.
> Audience: backend, frontend, AI tools working on DB, APIs, or data-heavy features.

## 1. Core Domain Entities

For each entity, define purpose, key fields, and relationships.

- **Entity: {{entity1_name}}**
  - Purpose: {{entity1_purpose}}
  - Key fields:
    - {{entity1_fields}}
  - Relationships:
    - {{entity1_relationships}}

- **Entity: {{entity2_name}}**
  - Purpose: {{entity2_purpose}}
  - Key fields:
    - {{entity2_fields}}
  - Relationships:
    - {{entity2_relationships}}

(Add more entities as needed.)

## 2. IDs & Referencing

- **ID conventions (UUID, ULID, numeric, etc.):**
  - {{id_conventions}}
- **How entities reference each other:**
  - {{reference_patterns}}

## 3. Data Lifecycle

- **Creation flows (how records are created):**
  - {{data_creation_flows}}
- **Update flows (who/what can change what):**
  - {{data_update_flows}}
- **Deletion / archival strategy:**
  - {{data_deletion_strategy}}

## 4. Derived Data & Analytics

- **Computed / derived fields (if any):**
  - {{derived_data}}
- **Key metrics that rely on this model:**
  - {{model_metrics}}

## 5. Notes for AI Tools

- Use this doc as the canonical reference for:
  - Database schema
  - API request/response shapes
  - Type definitions in code
- If code and this document disagree, flag it and ask which should be updated.
