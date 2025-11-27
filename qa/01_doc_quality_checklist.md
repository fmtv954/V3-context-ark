### Doc Quality Checklist

This doc provides a checklist for the "Critic" persona (or human reviewer) to evaluate generated docs.

---

### 1. Structural Integrity

- [ ] **Front-matter exists:** Contains `id`, `group`, `title`, `version`.
- [ ] **Follows Template:** Matches the sections defined in the mapped template.
- [ ] **Valid Markdown:** No broken links, unclosed code blocks, or malformed tables.

---

### 2. Content & Accuracy

- [ ] **Kernel Compliance:** Does not contradict the Project Kernel (e.g., users, tech stack).
- [ ] **No Hallucinations:** Does not invent APIs, libraries, or constraints not specified in Kernel.
- [ ] **Completeness:** No empty sections or `[TODO]` placeholders unless explicitly allowed.
- [ ] **Clarity:** Sentences are concise, active voice, and professional tone.

---

### 3. Consistency

- [ ] **Internal Links:** References to other docs use the correct relative paths (e.g., `../meta/01_vision.md`).
- [ ] **Terminology:** Uses defined terms (e.g., "Project Kernel", "Doc Engine") consistently.

---

### 4. Usefulness

- [ ] **Actionable:** Can a developer/designer pick this up and start working?
- [ ] **Specific:** Avoids vague phrases like "Make it user-friendly" without definition.

---

### 5. Automated Checks (Future)

- [ ] **Linter:** `markdownlint` passes with 0 errors.
- [ ] **Spellcheck:** No obvious typos.
