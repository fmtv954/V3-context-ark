### Usage Limits & Abuse Protection

This doc specifies the limits and mechanisms to protect the platform and users from abuse.

---

### 1. User Tiers & Hard Limits

| Limit | Free Tier | Pro Tier | Enterprise / BYOK |
| :--- | :--- | :--- | :--- |
| **Projects** | 1 Active | 10 Active | Unlimited |
| **Docs per Project** | Max 5 | Max 100 | Unlimited |
| **Generations / Day** | 10 calls | 500 calls | Custom |
| **Concurrent Jobs** | 1 | 3 | 10+ |

---

### 2. Abuse Detection Triggers

The system monitors for:

1.  **Rapid Fire Requests:** > 20 requests/minute from single user (Rate Limit 429).
2.  **Token Cycling:** Repeatedly regenerating the same doc > 10 times in 10 minutes without edits.
3.  **Prompt Injection:** Detection of patterns attempting to jailbreak the "Context Ark" persona.
4.  **Content Policy Violations:** Generation of prohibited content (hate, malware, etc.).

---

### 3. Response Actions

*   **Rate Limit (Temporary):** Return HTTP 429. User must wait (exponential backoff).
*   **Account Lock (Manual Review):** If severe abuse detected, lock account and notify admin.
*   **Shadow Ban (Spam):** For non-critical spam, deprioritize jobs in the queue.

---

### 4. API & Key Safety

*   **BYOK Keys:** Stored encrypted (AES-256).
*   **Usage Cap:** Users must set a hard spend cap on their own keys (e.g., $50/mo on OpenAI dashboard). We also implement a "soft stop" if we detect >$10 usage in 1 hour.
*   **Key Rotation:** Recommend rotation every 90 days.

---

### 5. Appeals Process

Users locked out can request review via support email.
*   SLA: 24-48 hours.
*   Outcome: Restore access or permanent ban.
