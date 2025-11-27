### Model Router Design

This doc specifies the logic for choosing the right model for each task.

---

### 1. Concept

The `ModelRouter` is a service that intercepts every AI request and decides:

1. **Which provider** to use (OpenAI, Anthropic, Local).
2. **Which model ID** to target.
3. **Fallback strategy** if the primary choice fails.

It decouples the application code from specific model names (e.g., `gpt-4o`).

---

### 2. Router Configuration

The router loads a config at startup:

```ts
type ModelConfig = {
  providers: {
    openai: { apiKey: string; enabled: boolean };
    anthropic: { apiKey: string; enabled: boolean };
    local: { baseUrl: string; enabled: boolean };
  };
  assignments: {
    KERNEL_DRAFT: { primary: 'anthropic/claude-3-5-sonnet', fallback: 'openai/gpt-4o' };
    DOC_GENERATE: { primary: 'anthropic/claude-3-5-sonnet', fallback: 'openai/gpt-4o' };
    DOC_CRITIQUE: { primary: 'openai/gpt-4o', fallback: 'anthropic/claude-3-5-sonnet' };
    CHAT_ASSISTANT: { primary: 'openai/gpt-4o-mini', fallback: 'anthropic/claude-3-haiku' };
  };
};
```

---

### 3. Routing Logic

When `executeTask(taskType, inputs)` is called:

1. **Lookup Assignment:**
   * Get `primary` model ID for `taskType`.
2. **Check Availability:**
   * Is the provider enabled?
   * Are we rate-limited?
3. **Execute:**
   * Call the model API.
4. **On Failure (5xx / Rate Limit):**
   * Log warning.
   * Switch to `fallback` model.
   * Retry execution.
5. **On Success:**
   * Return result.

---

### 4. Dynamic Routing (Future)

Later, the router can be smarter:

* **Cost-Aware:**
   * If user is on "Free Tier", force cheaper models for all tasks.
* **Load-Aware:**
   * If OpenAI is having an outage (detected via high error rates), auto-switch all traffic to Anthropic.
* **Latency-Aware:**
   * For chat, pick the fastest responder based on recent p99 metrics.

---

### 5. Local Model Support

For users running local LLMs (Ollama/LM Studio):

* Router can be configured to point `primary` to `local/llama-3.1-70b`.
* This enables **privacy-first** deployments where no data leaves the machine.
