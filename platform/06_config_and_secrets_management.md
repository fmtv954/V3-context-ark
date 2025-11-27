### Config & Secrets Management

This doc outlines how sensitive data and configuration are handled.

---

### 1. Types of Secrets

1. **Platform Secrets** (Owned by Admin):
   * `OPENAI_API_KEY`
   * `DATABASE_URL`
   * `REDIS_URL`
   * Managed via environment variables (Vercel/Docker).

2. **User Secrets** (BYOK Mode):
   * If a user wants to bring their own Anthropic Key.
   * Stored in `user_secrets` table, **encrypted at rest** (AES-256).
   * Decrypted only at runtime by the Model Router.

---

### 2. Runtime Configuration (`ark.config.ts`)

The backend loads a configuration object at startup:

```ts
export const config = {
  features: {
    enableNewKernelLogic: boolean,
    enableBilling: boolean,
  },
  limits: {
    maxDocsPerProject: 50,
    maxTokensPerRun: 100000,
  },
  modelRouting: {
    // Loaded from DB or file
  }
};
```

---

### 3. Encryption Strategy

For `user_secrets`:

* Use a dedicated encryption key (`ENCRYPTION_KEY` env var).
* Do not store this key in the DB.
* Rotate keys by re-encrypting the table (future scope).

---

### 4. Access Control

* Only the **Backend API** and **Worker** can access secrets.
* The **Frontend Client** never sees API keys.
* AI Models are called server-side only.
