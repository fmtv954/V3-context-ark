### Fallback & Failure Strategies

This doc defines how Ark handles LLM failures, ensuring robustness.

---

### 1. Types of Failures

1. **API Error (5xx/429):**
   * Provider is down or rate-limited.
2. **Schema Validation Failure:**
   * Model returned malformed JSON or markdown that breaks parsing.
3. **Refusal / Content Policy:**
   * Model refused to answer due to safety filter triggers.
4. **Timeout:**
   * Model took too long to respond.

---

### 2. Strategy A: Exponential Backoff (for 5xx/429)

* **Logic:**
   * Attempt 1: Immediate.
   * Attempt 2: Wait 1s.
   * Attempt 3: Wait 2s.
   * Attempt 4: Wait 4s.
* **If all fail:** Switch to fallback model.

---

### 3. Strategy B: Model Fallback (Cross-Provider)

* **Logic:**
   * If Primary (e.g., Anthropic) fails repeatedly, switch to Fallback (e.g., OpenAI).
   * Persist this switch for `N` minutes to avoid flapping.
   * Log the switch event as a warning.

---

### 4. Strategy C: Schema Repair (for Validation Failures)

* **Logic:**
   * If JSON parse fails, try a "Repair" pass.
   * Send the malformed JSON back to a fast model (e.g., GPT-4o-mini) with:
     > "Fix this JSON syntax error: [error details]"
   * If repair fails, abort task.

---

### 5. Strategy D: Graceful Degradation (for Timeout/Refusal)

* **For Docs:**
   * Mark doc status as `generation_failed`.
   * Show error to user: "Generation failed. Try again?"
* **For Chat:**
   * Show error: "I'm having trouble connecting to my brain right now. Please try again in a moment."

---

### 6. Strategy E: User Intervention

* If the kernel draft is repeatedly rejected by the schema validator due to ambiguous input:
   * Stop automated retries.
   * Ask the user:
     > "I'm struggling to understand the 'Tech Stack' section. Could you clarify if you mean React or Vue?"
