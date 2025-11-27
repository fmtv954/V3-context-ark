### Skill Profile for Each AI Task

This doc maps tasks to the specific AI capabilities required, helping in model selection.

---

### 1. Skill Dimensions

We rate tasks on these dimensions (1–5 scale):

* **Reasoning:** Logic, planning, handling complexity.
* **Creativity:** Writing quality, tone, fluency.
* **Context:** Ability to handle large inputs/refs.
* **Instruction Following:** Strict adherence to schemas/constraints.
* **Speed:** Importance of low latency.

---

### 2. Task Profiles

#### Task: `KERNEL_DRAFT`

* **Reasoning:** 5/5 (Must infer structure from unstructured brain dump).
* **Creativity:** 2/5 (Needs to be factual, concise).
* **Context:** 4/5 (Onboarding data can be messy/long).
* **Instruction Following:** 5/5 (Strict JSON schema).
* **Speed:** 2/5 (User can wait 10-20s).
* **Ideal Model:** GPT-4o, Claude 3.5 Sonnet.

#### Task: `DOC_GENERATE` (Writer)

* **Reasoning:** 3/5 (Needs to follow kernel logic).
* **Creativity:** 5/5 (Needs to write engaging, clear prose).
* **Context:** 4/5 (Needs kernel + template + constraints).
* **Instruction Following:** 4/5 (Template structure).
* **Speed:** 3/5 (Batch process, but shouldn't be glacial).
* **Ideal Model:** Claude 3.5 Sonnet (best writer), GPT-4o.

#### Task: `DOC_CRITIQUE` (Reviewer)

* **Reasoning:** 4/5 (Spotting logical flaws).
* **Creativity:** 1/5 (Just output issues).
* **Context:** 4/5 (Compare doc vs kernel).
* **Instruction Following:** 5/5 (Output clean JSON list of issues).
* **Speed:** 3/5.
* **Ideal Model:** GPT-4o, o1-preview (if deep reasoning needed), or Claude 3.5 Sonnet.

#### Task: `CHAT_ASSISTANT`

* **Reasoning:** 3/5.
* **Creativity:** 4/5 (Conversational).
* **Context:** 3/5 (Chat history).
* **Instruction Following:** 3/5.
* **Speed:** 5/5 (Must feel snappy).
* **Ideal Model:** GPT-4o-mini, Claude 3 Haiku, Llama 3.1 8B (local).

---

### 3. Implications for Routing

* **High Reasoning + High Schema** → Use the smartest model available (Cost is worth it).
* **High Creativity** → Use the best writer (Claude typically wins here).
* **High Speed** → Use optimized/smaller models.

This profile drives the `ModelRouter` logic defined in `ai/03_model_router_design.md`.
