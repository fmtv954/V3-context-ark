### Project Kernel Schema – Context Ark Doc Engine 3.0

The **project kernel** is the single structured "brain" for a project.
All docs in the pack must derive from this kernel plus templates and rules.

---

### 1. Top-Level Shape

The kernel is a JSON-like object with these main sections:

```ts
type ProjectKernel = {
  meta: {
    id: string;
    name: string;
    pitch: string;
    description: string;
    stage: 'idea' | 'prototype' | 'mvp' | 'live';
    createdAt: string;
    updatedAt: string;
    miscNotes?: string;
  };
  business: {
    primaryGoal: string;
    goals?: string[];
    competitors?: string[];
    differentiation?: string;
    revenueModel?: string;
    pricingStrategyHint?: string;
  };
  users: {
    primary: {
      type: string;
      description?: string;
      problemSummary?: string;
    };
    secondary?: {
      type: string;
      description?: string;
    }[];
    painPoints?: string[];
    segments?: string[];
  };
  product: {
    coreFeatures: string[];
    featurePriorities?: {
      mustHave: string[];
      niceToHave: string[];
    };
    userFlows?: string[];
    primaryFlow?: string;
    nonFunctionalRequirements?: string[];
    constraints?: string[];
  };
  tech: {
    preferences?: string[];
    hardConstraints?: string[];
    integrations?: string[];
    hostingAndData?: string;
    stackAssumptions?: string[];
  };
  success: {
    metrics?: string[];
    risks?: string[];
    timelineAndConstraints?: string;
  };
  engine: {
    profile: 'quick' | 'standard' | 'deep';
    docPackSize: number; // 50 for MVP
    aiModelHints?: {
      reasoningModel?: string;
      writerModel?: string;
      criticModel?: string;
    };
  };
  governance: {
    complianceNotes?: string[];
    dataSensitivity?: 'low' | 'medium' | 'high';
  };
  links?: {
    referenceDocs?: string[];
    inspirationProducts?: string[];
  };
};
```

This is a **canonical schema**; DB representation can be JSONB or equivalent.

---

### 2. Required Fields

Minimum fields required to generate a coherent doc pack:

* `meta.name`
* `meta.pitch`
* `meta.description`
* `business.primaryGoal`
* `users.primary.type`
* `users.painPoints` (at least one)
* `product.coreFeatures` (at least 3)
* `product.userFlows` (at least 1)
* `success.metrics` OR clear primary goal

If any of these are missing, the AI should:

* Ask follow-up questions, or
* Populate with explicit placeholders (e.g., `"TODO: clarify primary user"`), not hallucinations.

---

### 3. Optional / Derived Fields

Fields like:

* `product.primaryFlow`
* `users.primary.problemSummary`
* `product.featurePriorities`
* `tech.stackAssumptions`

are often **derived** from onboarding answers and normalized by the kernel-generation process.

---

### 4. Stability & Expectations

* Kernel is **stable but editable**:

  * Acts as root truth for doc generation.
  * Changes should be deliberate and versioned.
* Docs must **never introduce new "facts"** that contradict the kernel.
* If a doc needs new information, the kernel should be updated first (or doc must clearly flag assumptions).
