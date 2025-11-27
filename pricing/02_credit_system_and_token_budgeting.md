### Credit System & Token Budgeting

This doc defines how the credit system works and how tokens are budgeted per project.

---

### 1. Credit Unit Definition

*   **1 Ark Credit** ≈ $0.01 USD (approximate raw provider cost + margin).
*   Credits are the internal currency for:
    *   Generative tasks (kernel, docs, chat).
    *   RAG storage (vector DB).
    *   Export operations.

---

### 2. Cost Estimation (Benchmarks)

*   **Kernel Generation:** ~10-20 Credits ($0.10-$0.20)
    *   Heavy reasoning, large context.
*   **Single Doc Generation:** ~2-5 Credits ($0.02-$0.05)
    *   Input: Kernel + Templates + Rules.
    *   Output: ~1-2k tokens.
*   **Full 50-Doc Pack:** ~150-250 Credits ($1.50-$2.50)
    *   Bulk generation discount logic may apply later.

---

### 3. Budgeting & Limits

*   **Project Budget:** Users can set a "Max Credit Limit" per project to prevent runaway costs.
*   **Low Balance Alert:** Notify user when credits drop below threshold (e.g., 50 credits).
*   **Zero Balance:** Generation pauses immediately. Read-only access remains.

---

### 4. Token Optimization Strategy

To keep credit usage low:
1.  **Context Caching:** Use provider caching (Anthropic/OpenAI) for the static Kernel.
2.  **Compact Prompts:** Strip whitespace/comments from system prompts.
3.  **Model routing:** Use cheaper models (`gpt-4o-mini`, `haiku`) for draft/simple tasks.

---

### 5. Transparency

*   **Usage Log:** Every AI call logs its token usage and calculated credit cost.
*   **Dashboard:** Show "Credits Remaining" and "Burn Rate" prominently.
