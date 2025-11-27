### Primary User Journeys – Context Ark Doc Engine 3.0

This doc defines the end-to-end flows a user can experience in the MVP.

---

### 1. Journey A – New User → First Doc Pack

**Goal:** A new user signs up, creates a project, and generates their first ~50-doc pack.

1. **Landing / Marketing Site**

   * User clicks **"Start a new project"** or **"Get started"**.
   * Redirect to app sign-up/sign-in.

2. **Sign-Up / Sign-In**

   * Options:

     * Email + password
     * (Optional) OAuth providers (Google/GitHub) if enabled.
   * After successful auth, user is taken to **Projects Dashboard**.

3. **Create New Project**

   * User clicks **"New Project"**.
   * Minimal form:

     * Project name
     * Optional: Project type (e.g., "Web app", "AI SaaS", "Agent system") for preset templates.
   * On submit:

     * A blank project record is created.
     * User is taken directly into **Onboarding Wizard** for that project.

4. **Onboarding Wizard**

   * Multi-step, guided form:

     * Step 1: High-level vision & problem.
     * Step 2: Users & market.
     * Step 3: Features & flows.
     * Step 4: Tech preferences & constraints.
     * Step 5: Special cases / must-haves / must-avoid.
   * Each step supports:

     * Free-text "brain dump" fields.
     * Specific structured questions.

5. **Kernel Preview & Confirmation**

   * Ark runs **Kernel Generation** using onboarding answers.
   * User sees:

     * A **kernel preview** (structured summary of their project).
   * User can:

     * Accept as-is.
     * Make small edits inline.
   * On confirmation:

     * Kernel is saved as version `v1`.

6. **Generate Doc Pack**

   * User clicks **"Generate 50-doc pack"**.
   * System:

     * Creates a generation run.
     * Enqueues doc jobs.
   * UI:

     * Switches to **Workspace View** (chat + file tree + doc panel).
     * Shows progress as docs appear with status updates.

7. **Review & Adjust**

   * Once generation reaches a reasonable threshold (e.g., most docs done):

     * User browses the **file tree**.
     * Clicks individual docs to read and edit.
   * They can:

     * Add comments or notes.
     * Request regeneration of key docs.

8. **Export**

   * When satisfied, user clicks **"Export pack"**.
   * Options:

     * Download zip (markdown files).
     * Copy share link (if implemented).
   * Journey ends with a ready-to-use spec pack.

---

### 2. Journey B – Returning User → Continue Existing Project

**Goal:** A returning user resumes work on a project and refines docs.

1. **Sign-In**

   * User logs in, lands on **Projects Dashboard**.

2. **Select Existing Project**

   * User clicks an existing project from the list.
   * Taken directly to **Workspace View** for that project.

3. **Review Kernel & Docs**

   * Can open **Kernel panel** to review/edit core assumptions.
   * Browses file tree:

     * Reads docs,
     * Marks some as "approved",
     * Requests regen on others.

4. **Apply Changes**

   * If user edits kernel:

     * System asks:

       * "Apply changes only to **future docs**?"
       * or "Regenerate **affected docs**?"
   * If they choose regeneration:

     * Only docs depending on changed kernel aspects are queued.

5. **Re-Export**

   * After updates, the user exports a fresh pack.

---

### 3. Journey C – Quick Draft (Minimal Onboarding)

**Goal:** A user wants a fast, rough spec without detailed onboarding.

1. **New Project (Quick Mode)**

   * On "New Project", user chooses **"Quick Draft"**.
   * Single-page intake:

     * Short description
     * Key goals
     * What tech (if any) they *must* use.

2. **Immediate Kernel Draft**

   * Ark generates a **rough kernel** quickly.
   * User approves or tweaks.

3. **Limited Doc Pack**

   * Ark generates only a **subset** of the 50 docs (e.g., 15–20 core docs).
   * This remains part of MVP's doc pack but flagged as **"Quick Draft Mode"**.

4. **Upgrade to Full Pack**

   * Later, user can "Upgrade to full spec":

     * Runs full onboarding.
     * Expands to all 50 docs.

*(Quick mode is optional for MVP but nice to bake into flows.)*
