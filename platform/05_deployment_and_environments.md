### Deployment & Environments

This doc explains how the platform is deployed across different environments.

---

### 1. Environments

* **Development (Local):**
  * `localhost:3000`
  * Local Postgres (Docker) or Supabase Dev.
  * Local Redis.
  * Uses "Mock" LLM provider or developer's personal keys.

* **Preview (PR Builds):**
  * Vercel Preview URL.
  * Connected to a shared "Staging" DB.
  * Useful for UI testing.

* **Production:**
  * `app.contextark.com`
  * Hosted on Vercel (Frontend/API) + Supabase (DB) + Upstash (Redis).
  * Production API Keys (OpenAI/Anthropic) stored in secrets manager.

---

### 2. Configuration Management

We use **Environment Variables** (`.env`):

* `DATABASE_URL`
* `NEXT_PUBLIC_SUPABASE_URL`
* `NEXT_PUBLIC_SUPABASE_ANON_KEY`
* `OPENAI_API_KEY`
* `ANTHROPIC_API_KEY`
* `REDIS_URL`

Secrets are never checked into git.

---

### 3. BYOK Deployment (Self-Hosted)

For Enterprise / Privacy-focused users:

* **Docker Compose:**
  * `docker-compose.yml` bundles:
    * Next.js App
    * Postgres
    * Redis
    * Ollama (optional)
* **Config:**
  * User provides their own `.env` file.
  * "Single User Mode" enabled (disables signup/billing).
