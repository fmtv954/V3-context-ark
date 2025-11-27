### Onboarding Questionnaire Specification

This doc defines the exact onboarding questions and structure.

---

### 1. Onboarding Structure

The wizard is divided into steps:

1. **Step 1 – Project Basics**
2. **Step 2 – Users & Market**
3. **Step 3 – Product & Features**
4. **Step 4 – Tech & Constraints**
5. **Step 5 – Success & Risks**

Each step includes:

* One **big brain-dump** textarea.
* Several **structured questions** (short text, selects, multi-selects).
* Internal mapping to kernel fields.

---

### 2. Step 1 – Project Basics

**Goal:** Understand the core idea and why it exists.

Questions:

1. **Project Name**

   * Type: short text
   * Required.

2. **One-line Pitch**

   * "In one sentence, what are you building?"
   * Type: short text.

3. **Expanded Description / Brain Dump**

   * "Describe your idea in as much detail as you want. Don't worry about structure."
   * Type: long text.

4. **Primary Goal**

   * "What does success look like for this product in 6–12 months?"
   * Type: long text or predefined list with "Other".

5. **Stage**

   * "What stage is this project at?"
   * Options:

     * Idea only
     * Prototype
     * MVP in progress
     * Live product
   * Type: select.

---

### 3. Step 2 – Users & Market

**Goal:** Capture who it's for and why they care.

Questions:

1. **Primary User / Customer Type**

   * "Who is the main user or customer?"
   * Type: short text (e.g., 'small ecom store owners').

2. **Secondary Users (if any)**

   * "Any other important user types?"
   * Type: long text.

3. **User Pain Points**

   * "List the top 3–5 pain points this solves for users."
   * Type: long text; encourage bullet points.

4. **Competitors or Alternatives**

   * "How do users solve this today?"
   * Type: long text.

5. **Differentiation**

   * "Why is your approach different or better?"
   * Type: long text.

---

### 4. Step 3 – Product & Features

**Goal:** Understand the core functionality and flows.

Questions:

1. **Core Features**

   * "List your 3–7 core features."
   * Type: long text; encourage bullet list.

2. **Must-Have vs Nice-to-Have**

   * "Which features are absolutely required for your first version?"
   * Type: long text.

3. **Key Flows / Journeys**

   * "Describe your key user journeys (e.g., signup, checkout, conversation)."
   * Type: long text.

4. **Non-Functional Requirements (if known)**

   * "Any performance, reliability, or compliance requirements?"
   * Type: long text (optional).

---

### 5. Step 4 – Tech & Constraints

**Goal:** Capture technical preferences & hard constraints.

Questions:

1. **Preferred Tech Stack (if any)**

   * "Do you have any tech preferences (frameworks, languages, platforms)?"
   * Type: long text.

2. **Non-Negotiables**

   * "Anything you absolutely cannot use (e.g., due to policy, cost, compatibility)?"
   * Type: long text.

3. **Integrations**

   * "What external tools or APIs must this product integrate with (if known)?"
   * Type: long text.

4. **Hosting & Data Requirements**

   * "Do you have requirements for where data is stored or how hosting works?"
   * Type: long text.

---

### 6. Step 5 – Success & Risks

**Goal:** Capture how success is measured and key risks.

Questions:

1. **Key Metrics / KPIs**

   * "How will you measure success (KPIs, metrics, outcomes)?"
   * Type: long text.

2. **Main Risks or Unknowns**

   * "What are your top 3 risks or unknowns right now?"
   * Type: long text.

3. **Timeline & Constraints**

   * "Any hard deadlines or resource constraints (budget, time, people)?"
   * Type: long text.

4. **Anything Else?**

   * Catch-all question for extra info user wants to add.
   * Type: long text.

---

### 7. Validation & UX Notes

* Each step should:

  * show progress (1/5, 2/5, etc.)
  * allow "Save & continue later".
* Critical fields:

  * Project name
  * One-line pitch
  * Basic description
    must be required; others can be optional.
