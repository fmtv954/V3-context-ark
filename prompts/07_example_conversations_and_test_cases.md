### Example Conversations & Test Cases

This doc contains "golden traces" of ideal interactions for testing and tuning personas.

---

### 1. Test Case: Kernel Generation (Architect Guardian)

**User Input:**
> "I want to build a Tinder for dog adoption. Users swipe on dogs. Shelters upload profiles. Needs to be mobile-first."

**Expected Architect Response (Internal Monologue):**
1. Identify intent: Create new project kernel.
2. Select task: `KERNEL_DRAFT`.
3. Select model: `claude-3-5-sonnet` (reasoning).
4. Construct prompt with snippet `Kernel Obedience`.

**Expected Output (Kernel Draft):**
```json
{
  "meta": {
    "name": "DogTinder (Draft)",
    "pitch": "A mobile-first app for swiping right on adoptable dogs.",
    "stage": "idea"
  },
  "business": {
    "primaryGoal": "Facilitate dog adoptions through a gamified interface."
  },
  "users": {
    "primary": { "type": "Adopters", "description": "Mobile users looking for dogs." },
    "secondary": [{ "type": "Shelters", "description": "Orgs uploading dog profiles." }]
  },
  "product": {
    "coreFeatures": ["Swipe interface", "Shelter dashboard", "Chat/Match system"],
    "constraints": ["Mobile-first design"]
  }
}
```

---

### 2. Test Case: Doc Generation (Doc Builder)

**Input:**
* Kernel: (DogTinder from above)
* Template: `T_META_VISION`
* Rules: "Tone: Inspiring but grounded."

**Expected Output:**
```md
# Product Vision & Promise

## Problem
Adopting a dog is often a tedious process involving clunky websites and paperwork. Potential adopters lose interest due to friction.

## Vision
DogTinder reimagines adoption as a joyful, mobile-first experience. By using a familiar "swipe" interface, we make discovering dogs fun and engaging, while providing shelters with a streamlined way to reach more people.

## Core Promise
1. **Fun Discovery:** Adoption feels like a game, not a chore.
2. **Instant Connection:** Match and chat directly with shelters.
3. **Mobile First:** Designed for how people actually use their phones.
```

---

### 3. Test Case: Critique (Critic Reviewer)

**Input:**
* Kernel: DogTinder (Constraint: "Mobile-first")
* Doc: Architecture Doc claiming "Desktop-only Admin Panel built in WPF".

**Expected Output:**
```json
{
  "issues": [
    {
      "severity": "major",
      "location": "Admin Panel Section",
      "problem": "Proposed 'WPF Desktop App' conflicts with 'Mobile-first' constraint and modern web standards.",
      "suggestion": "Suggest a responsive Web Admin Portal instead."
    }
  ]
}
```

---

### 4. Test Case: Routing Inquiry (Router Assistant)

**User:** "Why did the kernel generation take 20 seconds?"

**Expected Response:**
"Kernel generation uses our most powerful reasoning model (`claude-3-5-sonnet`) to ensuring the project foundation is solid. This model is slower but produces much higher quality structural outputs than faster alternatives. If speed is critical, you can switch to the 'Economy' profile to use `gpt-4o-mini`."
