### Data Model & Persistence

This doc details the schema for the Postgres database.

---

### 1. `users`

* `id` (UUID, PK)
* `email`
* `created_at`
* `preferences` (JSONB): Theme, default model config.

---

### 2. `projects`

* `id` (UUID, PK)
* `user_id` (FK -> users)
* `name`
* `status` (active, archived)
* `created_at`
* `updated_at`

---

### 3. `kernels`

* `id` (UUID, PK)
* `project_id` (FK -> projects)
* `version` (INT)
* `data` (JSONB): The full ProjectKernel object.
* `hash` (String): Checksum to detect changes.
* `created_by` (user_id or 'ai')
* `created_at`

---

### 4. `docs`

* `id` (UUID, PK)
* `project_id` (FK -> projects)
* `doc_id` (String): e.g., 'meta/01_vision' (stable logical ID)
* `title`
* `content` (Text): The actual markdown.
* `status` (Enum): `pending`, `generating`, `generated`, `modified`, `approved`, `failed`.
* `kernel_version` (INT): Which kernel version this was generated from.
* `template_hash` (String): Version of template used.
* `updated_at`

---

### 5. `runs`

* `id` (UUID, PK)
* `project_id` (FK -> projects)
* `task` (String): 'DOC_GENERATE', 'KERNEL_DRAFT'
* `model_used` (String)
* `status` (success/failure)
* `cost_usd` (Decimal)
* `metadata` (JSONB): Latency, tokens, error details.
* `created_at`

---

### 6. `jobs`

* `id` (UUID, PK)
* `type` (String): 'GENERATE_PACK', 'REGENERATE_DOC'
* `payload` (JSONB)
* `status` (pending/processing/completed/failed)
* `progress` (Float): 0.0 - 1.0
* `created_at`
* `completed_at`
