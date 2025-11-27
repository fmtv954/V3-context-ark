### Export & Integration Paths

This doc defines how users get their doc pack out of Ark and into other tools.

---

### 1. Export Formats (MVP)

1. **ZIP of Markdown Files**

   * Each doc as:

     * `/meta/01_product_vision_and_promise.md`
     * `/flows/01_primary_user_journeys.md`
     * etc.
   * Preserves folder structure defined in the spec.

2. **Single Combined Markdown**

   * One big markdown file with headings separating docs.
   * Good for quick review or sharing.

3. **JSON Summary (optional)**

   * Minimal JSON representation:

     * project meta
     * kernel
     * list of docs with:

       * path
       * title
       * content.

---

### 2. Export Triggers

* **From Workspace**

  * Button: **"Export pack"**.
  * Options:

    * `Download ZIP`
    * `Download combined MD`
    * `Download JSON` (if implemented).

* **From Project Dashboard**

  * Each project row:

    * `…` menu → `Export latest pack`.

---

### 3. Integration Targets (Conceptual)

Ark's exported docs should be easy to use with:

1. **Cursor / VS Code / Cline**

   * Drop ZIP into repo:

     * `docs/` folder with Ark structure.
   * Use:

     * `AGENTS.md` (future phase).
     * `project_kernel.json` (future phase).
   * For MVP:

     * Spec docs used as context windows manually.

2. **v0 / Lovable / Bolt Builders**

   * Builder can:

     * Read exported vision, flows, architecture docs.
     * Use them to seed system prompts or project definitions.

3. **Notion / Confluence / Wiki**

   * User can:

     * Upload or paste markdown docs into spaces/pages.

4. **Ticketing Tools (Jira, Linear) – Future**

   * Later, Ark could:

     * emit summarized epics/stories from docs.

---

### 4. Export Metadata

Each export should include a small `metadata.json` (in ZIP or JSON export) with:

* `project_id`
* `project_name`
* `kernel_version`
* `doc_pack_version`
* `exported_at`
* `exported_by`
* `engine_config` (which AI engines were used)

This allows:

* Traceability.
* Easier automation later if integrating with n8n or similar.

---

### 5. Security & Privacy Considerations

* Export files should:

  * Never include secrets (API keys, credentials).
  * Only include context-level descriptions.
* For BYOK or sensitive deployments:

  * Make sure export obeys organization policies (future phases).
