### Default Model Assignments (J1 - J6)

This doc defines the specific model assignments for each job, broken down by user tier (Free, Builder, Pro).

---

### J1 – Intake & Triage
*Summarise onboarding into a clean kernel.*

| Tier | Primary Model | Backups |
| :--- | :--- | :--- |
| **Free** | `mistralai/mistral-7b-instruct:free` | `meta-llama/llama-3.3-70b-instruct:free`, `z-ai/glm-4.5-air:free` |
| **Builder** | `google/gemini-2.5-flash-lite` | `z-ai/glm-4.5-air` |
| **Pro** | `anthropic/claude-haiku-4.5` | `openai/gpt-4o-mini`, `qwen/qwen-plus-2025-07-28` |

---

### J2 – Deep Planner / Architect
*Design the 50-doc pack structure.*

| Tier | Primary Model | Backups |
| :--- | :--- | :--- |
| **Free** | `x-ai/grok-4.1-fast:free` | `deepseek/deepseek-r1-distill-llama-70b:free`, `microsoft/phi-4` |
| **Builder** | `deepseek/deepseek-r1` | `z-ai/glm-4.5`, `microsoft/phi-4` |
| **Pro** | `anthropic/claude-sonnet-4.5` | `qwen/qwen3-max`, `anthropic/claude-haiku-4.5` |

---

### J3 – Document Writer
*Generating the actual 50 docs.*

| Tier | Primary Model | Backups |
| :--- | :--- | :--- |
| **Free** | `meta-llama/llama-3.3-70b-instruct:free` | `z-ai/glm-4.5-air:free`, `qwen/qwen3-235b-a22b:free` |
| **Builder** | `qwen/qwen-plus-2025-07-28` | `google/gemini-2.5-flash` |
| **Pro** | `anthropic/claude-sonnet-4.5` | `qwen/qwen3-max`, `openai/gpt-4o-mini` |

---

### J4 – Refiner / Editor
*Revisions, linting, style consistency.*

| Tier | Primary Model | Backups |
| :--- | :--- | :--- |
| **Free** | `meta-llama/llama-3.3-70b-instruct:free` | `z-ai/glm-4.5-air:free` |
| **Builder** | `qwen/qwen-plus-2025-07-28` | `google/gemini-2.5-flash-lite` |
| **Pro** | `anthropic/claude-haiku-4.5` | `openai/gpt-4o-mini` |

---

### J5 – Cross-Pack QA & Coherence
*Scan 50 docs, find contradictions.*

| Tier | Primary Model | Backups |
| :--- | :--- | :--- |
| **Free** | `x-ai/grok-4.1-fast:free` | `z-ai/glm-4.5-air:free`, `qwen/qwen3-235b-a22b:free` |
| **Builder** | `z-ai/glm-4.5` | `deepseek/deepseek-r1` |
| **Pro** | `anthropic/claude-sonnet-4.5` | `qwen/qwen3-max` |

---

### J6 – Budget Brain & Router Logic
*Cost math, EV, model selection.*

| Tier | Primary Model | Backups |
| :--- | :--- | :--- |
| **Free** | `z-ai/glm-4.5-air:free` | `microsoft/phi-4`, `meta-llama/llama-3.3-70b-instruct:free` |
| **Builder** | `qwen/qwen-plus-2025-07-28` | `openai/gpt-4o-mini`, `microsoft/phi-4` |
| **Pro** | `qwen/qwen-plus-2025-07-28` | `z-ai/glm-4.5`, `microsoft/phi-4` |