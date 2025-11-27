# 30 – Database Schema & Design

> Concrete representation of the data model as actual tables/collections and indexes.
> Audience: backend engineers, DevOps, AI tools generating migrations or queries.

## 1. Storage Technology

- **Primary database engine (Postgres, MySQL, Firestore, etc.):**
  - {{db_engine}}
- **Secondary stores (cache, search indexes, blob storage):**
  - {{secondary_stores}}

## 2. Tables / Collections

For each table/collection, define columns, types, and constraints.

### 2.1 {{table1_name}}

- **Purpose:** {{table1_purpose}}
- **Columns:**
  - {{table1_columns}}  <!-- e.g. id (UUID, PK), user_id (UUID, FK users.id), created_at (timestamp)... -->
- **Indexes:**
  - {{table1_indexes}}
- **Relationships:**
  - {{table1_relationships}}

### 2.2 {{table2_name}}

- **Purpose:** {{table2_purpose}}
- **Columns:**
  - {{table2_columns}}
- **Indexes:**
  - {{table2_indexes}}
- **Relationships:**
  - {{table2_relationships}}

(Repeat for remaining tables.)

## 3. Naming Conventions

- **Table naming (snake_case, plural/singular, etc.):**
  - {{table_naming_conventions}}
- **Column naming patterns (id, *_id, created_at, updated_at, etc.):**
  - {{column_naming_conventions}}

## 4. Integrity & Constraints

- **Primary keys & uniqueness constraints:**
  - {{pk_uniq_constraints}}
- **Foreign keys and cascade rules:**
  - {{fk_rules}}
- **Domain-level constraints (e.g., enum values, status fields):**
  - {{domain_constraints}}

## 5. Migration Strategy

- **How schema changes are applied (tools & process):**
  - {{migration_strategy}}
- **Rollback approach:**
  - {{migration_rollback}}

## 6. Notes for AI Tools

- Treat this doc as the authoritative mapping for schema design.
- Generate migrations and queries that align with these tables and conventions.
- If code and this doc diverge, flag the inconsistency instead of guessing.
