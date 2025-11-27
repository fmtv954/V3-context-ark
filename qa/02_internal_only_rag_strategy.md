### Internal-Only RAG Strategy

This doc defines the strict "Internal-Only" rule for RAG (Retrieval Augmented Generation).

---

### 1. The Core Rule

**Context Ark AI NEVER searches the internet.**
It ONLY retrieves information from:
1.  **The Project Kernel:** The user-defined source of truth.
2.  **The 50 Spec Docs:** The currently generated documentation.
3.  **The Template Library:** The official templates.
4.  **User Chat History:** The current conversation context.

---

### 2. Why Internal-Only?

*   **Consistency:** Prevents AI from pulling in random blog posts or outdated Stack Overflow answers that contradict the user's stack.
*   **Privacy:** No user data is sent to third-party search indexes.
*   **Cost:** Reduces latency and token costs associated with web scraping.
*   **Focus:** Forces the AI to rely on the defined constraints (Kernel) rather than general knowledge.

---

### 3. Implementation

*   **Vector Store:** A local or hosted vector DB (e.g., pgvector, Chroma) stores chunks of the *current project docs*.
*   **Ingestion:**
    *   On Doc Save: Re-embed the changed doc.
    *   On Kernel Update: Re-embed the kernel.
*   **Retrieval:**
    *   Query: "How do I handle auth?"
    *   Search: Vector store for "auth" in `flows/*` and `platform/*`.
    *   Context: Top 3-5 matches + Kernel Auth section.

---

### 4. Exception Handling

If the AI needs external knowledge (e.g., "What is the latest Next.js version?"):
*   It should **ask the user** or check the Kernel's `techStack` version field.
*   It should **not** guess or browse.
