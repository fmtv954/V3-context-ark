### Doc Template Conventions

This doc standardizes how templates for all docs are structured.

---

### 1. Template Structure

Each doc template should define:

* **Front-matter** (metadata)
* **Sections & headings**
* **Kernel bindings** (which kernel fields feed which parts)
* **Constraints & rules** for the generator.

Example front-matter:

```yaml
id: meta_product_vision
group: meta
title: Product Vision & Promise
depends_on:
  - kernel.meta
  - kernel.business
  - kernel.users
ai_persona: doc_builder
tone: clear, confident, concise
length_hint: 800-1200 words
```

---

### 2. Section Patterns

Prefer a consistent heading style:

* `#` for title (generated, matches front-matter `title`)
* `##` for main sections
* `###` for subsections

Example sections:

* Problem
* Product Vision
* Core Promise
* Objectives
* Success Criteria

---

### 3. Kernel Bindings

Within the template, specify binding hints, e.g.:

* "Use `kernel.meta.pitch` as the short product pitch."
* "Summarize `kernel.users.painPoints[]` as top pains."
* "Use `kernel.business.primaryGoal` to define success."

Templates should **never assume** non-existent fields; they must:

* Check for field existence.
* Fallback to placeholders or ask for clarification.

---

### 4. Tone & Style Rules

* Avoid marketing fluff; write like a clear internal spec.
* Use:

  * short paragraphs
  * bullet lists where appropriate
  * examples only when helpful.
* Prefer direct language:

  * "The system will…" instead of "We hope to…"

---

### 5. Constraints for AI Generator

Templates must include constraints such as:

* "Do not change or override kernel facts."
* "If kernel is missing required data, use `TODO:` markers instead of inventing details."
* "Keep headings stable; do not rename sections unless absolutely necessary."

These constraints help keep generations consistent and safe.
