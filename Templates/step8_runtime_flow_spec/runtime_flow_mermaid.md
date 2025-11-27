```mermaid
flowchart TD
    A[Onboarding Intake\n(ai_onboarding_intake)] --> B[Kernel Build\n(ai_build_project_kernel)]
    B --> C[Doc Generation\n(doc_generation/*)]
    C --> D[Platform Packs\n(platform/*)]
    C --> E[Visual Maps\nai_kernel_to_mermaid]
    D --> F[Export & Handoff\nzip project]
    E --> F
```
