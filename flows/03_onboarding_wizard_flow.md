### Onboarding Wizard Flow Specification

This doc defines the step-by-step onboarding experience for new projects.

---

#### 1. Overall Flow Structure

**5-Step Wizard:**
1. Project Basics
2. Users & Market
3. Product & Features
4. Tech & Constraints
5. Success & Risks

**Navigation Controls:**
* Previous/Next buttons
* Progress indicator
* Save & continue later
* Skip to kernel preview

---

#### 2. Step 1 – Project Basics

**Layout:**
* Large heading: "Tell us about your project"
* Subheading: "We'll use this to understand your vision"
* Progress: 1 of 5

**Fields:**
1. **Project Name** (required)
   * Input type: Text
   * Placeholder: "e.g., Voice Funnel, Project Navigator"
   * Validation: Not empty

2. **One-line Pitch** (required)
   * Input type: Text
   * Placeholder: "In one sentence, what are you building?"
   * Validation: Max 140 characters

3. **Expanded Description** (required)
   * Input type: TextArea
   * Placeholder: "Describe your idea in as much detail as you want..."
   * Validation: Min 50 characters

4. **Primary Goal**
   * Input type: TextArea
   * Placeholder: "What does success look like in 6-12 months?"

5. **Project Stage**
   * Input type: Radio buttons
   * Options: Idea only, Prototype, MVP in progress, Live product

**Actions:**
* Back (disabled on first step)
* Next (enabled when required fields filled)
* Save draft
* Skip to quick draft mode

---

#### 3. Step 2 – Users & Market

**Layout:**
* Heading: "Who are you building for?"
* Subheading: "Understanding your users is key to good docs"
* Progress: 2 of 5

**Fields:**
1. **Primary User Type** (required)
   * Input type: Text
   * Placeholder: "e.g., indie developers, small ecom store owners"
   * Validation: Not empty

2. **Secondary Users**
   * Input type: TextArea
   * Placeholder: "Any other important user types? (optional)"

3. **User Pain Points** (required)
   * Input type: TextArea
   * Placeholder: "List the top 3-5 pain points this solves..."
   * Validation: Min 3 bullet points

4. **Competitors or Alternatives**
   * Input type: TextArea
   * Placeholder: "How do users solve this today?"

5. **Differentiation**
   * Input type: TextArea
   * Placeholder: "Why is your approach different or better?"

**Actions:**
* Back
* Next
* Save draft
* View example responses

---

#### 4. Step 3 – Product & Features

**Layout:**
* Heading: "What does it do?"
* Subheading: "Core functionality and user flows"
* Progress: 3 of 5

**Fields:**
1. **Core Features** (required)
   * Input type: TextArea
   * Placeholder: "List your 3-7 core features..."
   * Validation: Min 3 bullet points

2. **Must-Have vs Nice-to-Have**
   * Input type: TextArea
   * Placeholder: "Which features are absolutely required?"

3. **Key User Journeys**
   * Input type: TextArea
   * Placeholder: "Describe key journeys (signup, main flow, output...)"

4. **Non-Functional Requirements**
   * Input type: TextArea
   * Placeholder: "Any performance, reliability, or compliance needs?"

**Actions:**
* Back
* Next
* Save draft
* Add another journey

---

#### 5. Step 4 – Tech & Constraints

**Layout:**
* Heading: "Technical preferences & constraints"
* Subheading: "What matters for implementation"
* Progress: 4 of 5

**Fields:**
1. **Preferred Tech Stack**
   * Input type: TextArea
   * Placeholder: "Any preferences for frameworks, languages, platforms?"

2. **Non-Negotiables**
   * Input type: TextArea
   * Placeholder: "Anything you absolutely cannot use?"

3. **Required Integrations**
   * Input type: TextArea
   * Placeholder: "External tools or APIs you must integrate with?"

4. **Hosting & Data Requirements**
   * Input type: TextArea
   * Placeholder: "Requirements for hosting, data storage, privacy?"

**Actions:**
* Back
* Next
* Save draft
* Import from existing project

---

#### 6. Step 5 – Success & Risks

**Layout:**
* Heading: "How will you measure success?"
* Subheading: "And what could go wrong?"
* Progress: 5 of 5

**Fields:**
1. **Key Metrics / KPIs**
   * Input type: TextArea
   * Placeholder: "How will you measure success?"

2. **Main Risks or Unknowns**
   * Input type: TextArea
   * Placeholder: "What are your top 3 risks or unknowns?"

3. **Timeline & Constraints**
   * Input type: TextArea
   * Placeholder: "Any deadlines, budget, or resource constraints?"

4. **Anything Else?**
   * Input type: TextArea
   * Placeholder: "Any other important context?"

**Actions:**
* Back
* Generate Kernel (primary CTA)
* Save draft
* Start over

---

#### 7. Kernel Preview Screen

**Layout:**
* Heading: "Here's what we understood"
* Subheading: "Review and confirm your project kernel"

**Sections:**
* Project Summary (name, pitch, stage)
* User Summary (primary/secondary users, pains)
* Product Summary (features, flows)
* Tech Summary (preferences, constraints)
* Success Summary (goals, risks)

**Actions:**
* Edit any section
* Approve and Generate Docs
* Start Over
* Save as Draft

---

#### 8. Validation & Error Handling

**Real-time Validation:**
* Field-level validation as user types
* Clear error messages below fields
* Visual indicators (red borders, icons)
* Prevent progress on critical errors

**Save States:**
* Auto-save every 30 seconds
* Manual save option
* Draft indicator in project list
* Resume from last step

**Progressive Disclosure:**
* Show/hide optional fields
* Example responses on hover
* Tooltips for complex terms
* Keyboard shortcuts

This wizard guides users through structured input while remaining flexible and user-friendly.
