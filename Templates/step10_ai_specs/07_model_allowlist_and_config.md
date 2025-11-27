### Model Allowlist & Configuration

This doc defines the "Core Roster" of models for Context Ark, including Paid (Value/Pro) and Free options.

---

### 1. Paid Models (The "Roster")

These models are routed via **OpenRouter** (or direct provider if configured).
Prices are approx $ per 1M tokens (Input / Output).

#### Value / Mid-Tier
| Model ID | Price (In/Out) | Notes |
| :--- | :--- | :--- |
| `z-ai/glm-4.5-air` | $0.13 / $0.85 | Strong general, cheap. |
| `z-ai/glm-4.5` | $0.35 / $1.50 | 1M context, strong reasoning. |
| `qwen/qwen-plus-2025-07-28` | $0.40 / $1.20 | Great all-round doc+code. |
| `google/gemini-2.5-flash-lite` | $0.10 / $0.40 | Fastest, cheapest summarizer. |
| `google/gemini-2.5-flash` | $0.30 / $2.50 | Strong writer / tool user. |
| `openai/gpt-4o-mini` | $0.15 / $0.60 | Fast, reliable standard. |
| `microsoft/phi-4` | $0.06 / $0.14 | Ultra-cheap math/logic brain. |

#### Reasoning / Pro-Tier
| Model ID | Price (In/Out) | Notes |
| :--- | :--- | :--- |
| `deepseek/deepseek-r1` | $0.30 / $1.20 | Top-tier reasoning (OpenRouter price). |
| `qwen/qwen3-max` | $1.20 / $6.00 | 256k ctx, S-tier open-weights. |
| `anthropic/claude-haiku-4.5` | $1.00 / $5.00 | Fast, near-frontier code. |
| `anthropic/claude-sonnet-4.5` | $3.00 / $15.00 | The gold standard for docs. |
| `x-ai/grok-4` | $3.00 / $15.00 | Edgy/opinionated writing. |

---

### 2. Free Core Models

These models are available on OpenRouter's free tier (limits apply).

*   `x-ai/grok-4.1-fast:free` (2M ctx, strong reasoning)
*   `z-ai/glm-4.5-air:free` (Strong general)
*   `meta-llama/llama-3.3-70b-instruct:free` (Llama 3.3)
*   `mistralai/mistral-7b-instruct:free` (Replacement for small-3.1)

---

### 3. Configuration Schema

The system uses a unified config object for connection details.

```typescript
type ModelConfig = {
  provider: 'openrouter' | 'openai' | 'anthropic' | 'google' | 'deepseek';
  modelId: string; // The exact string ID from Section 1 or 2
  contextWindow: number; // e.g. 128000
  costPer1M: { input: number, output: number };
  isFree: boolean;
}