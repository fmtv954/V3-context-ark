### AI Logging & Trace Spec

This doc defines what we log for every AI interaction for debugging, cost tracking, and optimization.

---

### 1. The `Run` Object

Every AI request produces a `Run` record.

```ts
type Run = {
  id: string; // UUID
  projectId: string;
  taskId: string; // e.g., 'DOC_GENERATE'
  targetId?: string; // doc_id or kernel_id
  
  // Model info
  provider: 'openai' | 'anthropic' | 'local';
  modelId: string;
  configProfile: 'standard' | 'economy';
  
  // Timing
  startedAt: Date;
  completedAt: Date;
  latencyMs: number;
  
  // Cost
  inputTokens: number;
  outputTokens: number;
  totalCostUsd: number;
  
  // Result
  status: 'success' | 'failed';
  error?: string; // if failed
  
  // Trace
  promptSnapshot?: string; // (Truncated if huge)
  responseSnapshot?: string; // (Truncated if huge)
};
```

---

### 2. Log Levels

* **INFO:**
  * Task started.
  * Task completed successfully.
  * Token usage stats.
* **WARN:**
  * Rate limit hit (retrying).
  * Fallback triggered.
  * Schema repair triggered.
* **ERROR:**
  * Task failed after all retries.
  * Provider API 500.

---

### 3. Trace Retention Policy

* **Metadata (cost, status):** Keep indefinitely.
* **Full Prompts/Responses:**
  * Keep for 30 days (for debugging).
  * Truncate very large prompts (>50k tokens) to save storage, unless explicitly flagged for debug.

---

### 4. User Visibility

Users (in the "Runs" or "Cost" panel) see:

* "Generated Doc X using Claude 3.5 Sonnet (1.4s, $0.02)"
* "Failed to generate Kernel (Timeout)"

They generally **do not** need to see the raw prompt unless they are in "Debug Mode".

---

### 5. Cost Aggregation

We aggregate `Runs` to calculate:

* Project total cost.
* User monthly spend.
* Cost per doc type (to identify expensive templates).
