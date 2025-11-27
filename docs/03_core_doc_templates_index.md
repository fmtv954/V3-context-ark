### Core Doc Templates Index – 50-Doc MVP

This doc lists all core templates and how they map to groups.

---

### 1. Meta & Vision Templates

* `meta/01_product_vision_and_promise.md` – Template: `T_META_VISION`
* `meta/02_problem_and_pain_points.md` – Template: `T_META_PAIN_POINTS`
* `meta/03_target_users_and_personas.md` – Template: `T_META_PERSONAS`
* `meta/04_mvp_scope_and_non_goals.md` – Template: `T_META_SCOPE`
* `meta/05_future_phases_and_extensions.md` – Template: `T_META_ROADMAP`

---

### 2. Flows & Onboarding Templates

* `flows/01_primary_user_journeys.md` – `T_FLOWS_JOURNEYS`
* `flows/02_onboarding_questionnaire_spec.md` – `T_FLOWS_ONBOARDING_QUESTIONS`
* `flows/03_onboarding_to_kernel_mapping.md` – `T_FLOWS_KERNEL_MAPPING`
* `flows/04_revision_and_regeneration_flow.md` – `T_FLOWS_REVISION_REGEN`
* `flows/05_review_checkpoints_and_approvals.md` – `T_FLOWS_CHECKPOINTS`
* `flows/06_export_and_integration_paths.md` – `T_FLOWS_EXPORT_INTEGRATIONS`

---

### 3. Kernel & Doc Engine Templates

* `kernel/01_project_kernel_schema.md` – `T_KERNEL_SCHEMA`
* `kernel/02_kernel_generation_process.md` – `T_KERNEL_GENERATION`
* `kernel/03_kernel_update_and_versioning.md` – `T_KERNEL_VERSIONING`
* `docs/01_doc_pack_overview_and_groups.md` – `T_DOCS_OVERVIEW`
* `docs/02_doc_template_conventions.md` – `T_DOCS_TEMPLATE_RULES`
* `docs/03_core_doc_templates_index.md` – `T_DOCS_TEMPLATE_INDEX`
* `docs/04_derivative_doc_rules.md` – `T_DOCS_DERIVATIVE_RULES`
* `docs/05_single_doc_regeneration_rules.md` – `T_DOCS_REGEN_RULES`

*(and similarly for other groups; you can maintain an internal mapping table.)*

---

### 4. Template Registry

Maintain a simple registry object, e.g.:

```ts
type TemplateId =
  | 'T_META_VISION'
  | 'T_META_PAIN_POINTS'
  | 'T_META_PERSONAS'
  // ...
  | 'T_DOCS_REGEN_RULES';

type TemplateRegistryEntry = {
  id: TemplateId;
  path: string;
  group: string;
  description: string;
  dependsOnKernelSections: string[];
};

const TEMPLATE_REGISTRY: TemplateRegistryEntry[] = [
  {
    id: 'T_META_VISION',
    path: 'meta/01_product_vision_and_promise.md',
    group: 'meta',
    description: 'High-level product vision and promise.',
    dependsOnKernelSections: ['meta', 'business', 'users'],
  },
  // ...
];
```

This registry powers:

* DocEngine decisions.
* UI mapping between file paths and templates.
* Impact analysis when kernel changes.
