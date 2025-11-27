### Backend Service Boundaries

This doc defines the internal modules and their responsibilities to ensure separation of concerns.

---

### 1. `KernelService`

* **Responsibilities:**
  * Manage `ProjectKernel` schema and validation.
  * Handle kernel versioning and history.
  * Compute diffs between kernel versions.
* **Key Methods:**
  * `createKernel(projectId, initialData)`
  * `updateKernel(kernelId, diff)`
  * `getKernelHistory(kernelId)`

---

### 2. `DocService`

* **Responsibilities:**
  * Manage `Doc` records (metadata + content).
  * Load/Parse templates.
  * Track doc status (`pending`, `generating`, `approved`).
  * Handle export logic (bundling docs into ZIP/JSON).
* **Key Methods:**
  * `getDoc(docId)`
  * `updateDocContent(docId, content)`
  * `getProjectDocs(projectId)`

---

### 3. `EngineService` (The Coordinator)

* **Responsibilities:**
  * Coordinate the "Generation" process.
  * Fetch Kernel from `KernelService`.
  * Fetch Template from `DocService`.
  * Call `ModelRouter` to generate content.
  * Save result back to `DocService`.
* **Key Methods:**
  * `generateDoc(docId)`
  * `regenerateProjectDocs(projectId, docIds)`

---

### 4. `ModelRouter` (The AI Gateway)

* **Responsibilities:**
  * Execute AI prompts using configured providers.
  * Handle retries, fallbacks, and logging.
  * Enforce cost limits if configured.
* **Key Methods:**
  * `executeTask(taskType, inputs, config)`

---

### 5. `JobQueueService`

* **Responsibilities:**
  * Abstract the underlying queue implementation (Redis/Bull/Inngest).
  * Enqueue jobs.
  * Report job status/progress.
* **Key Methods:**
  * `enqueue(jobName, payload)`
  * `getJobStatus(jobId)`

---

### 6. Dependency Graph

```
EngineService
  --> KernelService (read)
  --> DocService (read/write)
  --> ModelRouter (execute)
  
API Layer
  --> JobQueueService (enqueue)
  --> KernelService (read/write)
  --> DocService (read/write)

Worker
  --> JobQueueService (consume)
  --> EngineService (invoke)
