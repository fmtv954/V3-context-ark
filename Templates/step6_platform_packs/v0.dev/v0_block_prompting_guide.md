# v0.dev Block Prompting Guide – SDD-Friendly

v0.dev works best when you target specific blocks instead of the whole page.

When prompting v0:

1. Tell it explicitly that the project uses Spec-Driven Development.
2. Mention AGENTS.md and any relevant docs for the block you're editing.
   - For example, for a pricing section, mention 64_pricing_packaging.md.
   - For hero/landing layout, mention 100_marketing_site_spec.md.

Example prompt for a Hero block:

> You are editing only the Hero section of a landing page.
> Read the one-liner and key benefits from AGENTS.md and 07_problem_solution.md.
> Design a responsive hero section (headline, subcopy, CTA) that matches the tone and audience.
> DO NOT change other sections of the page.

Keep prompts focused, tied to specific docs, and block-scoped.
