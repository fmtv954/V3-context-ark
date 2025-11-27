### High-Level System Architecture

This doc outlines the core components of the Context Ark platform.

---

### 1. Conceptual Diagram

```mermaid
graph TD
    Client[Web Client (Next.js)] --> API[Next.js API Routes]
    API --> Auth[Auth (Supabase/NextAuth)]
    API --> DB[(Database - Postgres)]
    API --> Queue[Job Queue (Redis/Bull)]
    
    Queue --> Worker[Doc Engine Worker]
    Worker --> Router[Model Router]
    Router --> LLM[LLM Providers (OpenAI, Anthropic)]
```

---

### 2. Core Components

#### A. Frontend (Web Client)
* **Stack:** Next.js (React), Tailwind CSS, Lucide Icons.
* **Responsibility:** UI rendering, state management (projects, docs, chat), local interaction logic.
* **Deployment:** Vercel / Netlify / Docker.

#### B. Backend API (Next.js API Routes)
* **Stack:** Next.js Server Actions / API Routes.
* **Responsibility:** CRUD for projects/kernels/docs, user auth, triggering jobs.

#### C. Database
* **Stack:** PostgreSQL (via Supabase or similar).
* **Responsibility:** Persistent storage for:
    * Users, Projects, Kernels (JSONB), Docs (Markdown text), Runs (Logs).

#### D. Job Queue
* **Stack:** Redis + BullMQ (or Inngest / simple DB queue for MVP).
* **Responsibility:** Handling long-running AI tasks (batch generation) asynchronously to avoid HTTP timeouts.

#### E. Doc Engine Worker
* **Stack:** Node.js / Python (if using AgenticSeek parts).
* **Responsibility:**
    * Consumes jobs from queue.
    * Loads Kernel + Template.
    * Calls Model Router.
    * Saves result to DB.

#### F. Model Router
* **Stack:** TypeScript Service.
* **Responsibility:** Abstraction layer over LLM APIs, handling retries, fallbacks, and logging.

---

### 3. Data Flow Example: Generate Doc Pack

1. User clicks "Generate" on Client.
2. Client POSTs to `/api/projects/:id/generate`.
3. API validates request, creates `Job` record in DB, pushes to Queue.
4. Worker picks up Job.
5. Worker loops through list of 50 templates.
6. For each template:
    * Calls Model Router with prompt.
    * Receives Markdown.
    * Updates `Doc` record in DB.
7. Client polls (or uses WebSocket/Subscription) to see progress updates.
