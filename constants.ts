
import { BatchDefinition, DocMetadata, DocStatus, PackDefinition, ProjectTemplate, ModelConfig, AiTaskType, UserTier } from './types';

export const COST_PER_REGEN = 1; // 1 Credit per doc regeneration

// Initial credits per tier
export const INITIAL_CREDITS: Record<UserTier, number> = {
    free: 5,
    starter: 25,
    pro: 100,
    admin: 99999
};

// --- MODEL ROSTER (Step 10) ---
export const MODEL_ROSTER: Record<string, ModelConfig> = {
    'gemini-flash': { id: 'gemini-2.5-flash', provider: 'google', name: 'Gemini 2.5 Flash', costPer1M: { input: 0.1, output: 0.4 }, contextWindow: 1000000 },
    'gemini-pro': { id: 'gemini-2.0-pro-exp-02-05', provider: 'google', name: 'Gemini 2.0 Pro', costPer1M: { input: 0, output: 0 }, contextWindow: 2000000 },
    'gpt-4o': { id: 'gpt-4o', provider: 'openai', name: 'GPT-4o', costPer1M: { input: 2.5, output: 10 }, contextWindow: 128000 },
    'gpt-4o-mini': { id: 'gpt-4o-mini', provider: 'openai', name: 'GPT-4o Mini', costPer1M: { input: 0.15, output: 0.6 }, contextWindow: 128000 },
    'claude-sonnet': { id: 'claude-3-5-sonnet-20241022', provider: 'anthropic', name: 'Claude 3.5 Sonnet', costPer1M: { input: 3, output: 15 }, contextWindow: 200000 },
    'claude-haiku': { id: 'claude-3-5-haiku-20241022', provider: 'anthropic', name: 'Claude 3.5 Haiku', costPer1M: { input: 1, output: 5 }, contextWindow: 200000 },
    'deepseek-r1': { id: 'deepseek-r1', provider: 'deepseek', name: 'DeepSeek R1', costPer1M: { input: 0.55, output: 2.19 }, contextWindow: 64000 }
};

// --- TASK ROUTING TABLE (Step 10) ---
// TEMPORARY OVERRIDE: Using Gemini for ALL tasks to ensure system functionality without multiple API keys.
export const TASK_ROUTING: Record<AiTaskType, Record<UserTier, { primary: string, fallback: string }>> = {
    'J1_INTAKE': {
        'free': { primary: 'gemini-flash', fallback: 'gemini-flash' },
        'starter': { primary: 'gemini-flash', fallback: 'gemini-flash' },
        'pro': { primary: 'gemini-pro', fallback: 'gemini-flash' },
        'admin': { primary: 'gemini-pro', fallback: 'gemini-flash' }
    },
    'J2_PLANNER': {
        'free': { primary: 'gemini-flash', fallback: 'gemini-flash' },
        'starter': { primary: 'gemini-pro', fallback: 'gemini-flash' },
        'pro': { primary: 'gemini-pro', fallback: 'gemini-flash' },
        'admin': { primary: 'gemini-pro', fallback: 'gemini-flash' }
    },
    'J3_WRITER': {
        'free': { primary: 'gemini-flash', fallback: 'gemini-flash' },
        'starter': { primary: 'gemini-flash', fallback: 'gemini-flash' },
        'pro': { primary: 'gemini-pro', fallback: 'gemini-flash' },
        'admin': { primary: 'gemini-pro', fallback: 'gemini-flash' }
    },
    'J4_REFINER': {
        'free': { primary: 'gemini-flash', fallback: 'gemini-flash' },
        'starter': { primary: 'gemini-flash', fallback: 'gemini-flash' },
        'pro': { primary: 'gemini-pro', fallback: 'gemini-flash' },
        'admin': { primary: 'gemini-pro', fallback: 'gemini-flash' }
    },
    'J5_CRITIC': {
        'free': { primary: 'gemini-flash', fallback: 'gemini-flash' },
        'starter': { primary: 'gemini-pro', fallback: 'gemini-flash' },
        'pro': { primary: 'gemini-pro', fallback: 'gemini-flash' },
        'admin': { primary: 'gemini-pro', fallback: 'gemini-flash' }
    },
    'J6_ROUTER': {
        'free': { primary: 'gemini-flash', fallback: 'gemini-flash' },
        'starter': { primary: 'gemini-flash', fallback: 'gemini-flash' },
        'pro': { primary: 'gemini-flash', fallback: 'gemini-flash' },
        'admin': { primary: 'gemini-flash', fallback: 'gemini-flash' }
    }
};

// --- DOC TEMPLATES (From provided Zip) ---
// In a real app, these would be loaded from the filesystem or DB.
// For this Client-Side app, we embed the most critical ones.
export const DOC_TEMPLATES: Record<string, string> = {
  "00": `# 00 – AGENTS Master Spec (Project Constitution)
> The single source of truth for this project’s goals, rules, and workflow.

## 1. Project Context
- **Project name:** {{project_name}}
- **One-sentence goal:** {{project_one_sentence_goal}}
- **Problem we solve (for whom):** {{project_problem_statement}}
- **Core value (why this matters):** {{project_core_value}}

## 2. Tech Stack
- **Frontend:** {{frontend_stack}}
- **Backend / APIs:** {{backend_stack}}
- **Database / storage:** {{database_stack}}
- **Infra / hosting:** {{infra_stack}}

## 3. Strict Rules (“The No List”)
- **Language / style constraints:** {{code_style_no_list}}
- **Architecture constraints:** {{architecture_no_list}}
- **Security / privacy constraints:** {{security_no_list}}

## 4. Workflow Protocol (SDD Loop)
1. **Specify** – Update specs first.
2. **Plan** – Generate PLAN.md.
3. **Implement** – Code strictly following the plan.
4. **Verify** – Validate against spec.

## 5. Current Status
- **Phase:** {{project_phase}}
- **Focus:** {{current_focus_items}}
`,
  "07": `# 07 – Problem & Pain Landscape

## 1. Core Problem Statement
- **What problem are we solving?:** {{core_problem_paragraph}}

## 2. Symptoms & Pains
- **What users feel day-to-day:** {{user_pains_list}}

## 3. Existing Solutions & Workarounds
- **How users solve this today:** {{existing_solutions}}
- **Why those aren’t good enough:** {{existing_solutions_gaps}}

## 4. Urgency & Stakes
- **What happens if they *don’t* solve this?:** {{consequences_of_inaction}}
`,
  "11": `# 11 – Quick Start Implementation Guide

## 1. Who This Is For
- **Target user type(s):** {{quickstart_target_users}}

## 2. Prerequisites
- **Accounts/tools needed:** {{quickstart_prereqs}}

## 3. 10–30 Minute Quick Start Path
- **Step 1 – Create a project:** {{quickstart_step1}}
- **Step 2 – Add/import your ideas:** {{quickstart_step2}}
- **Step 3 – Generate doc pack:** {{quickstart_step3}}
- **Step 4 – Review and approve:** {{quickstart_step4}}
- **Step 5 – Send to AI tool:** {{quickstart_step5}}

## 4. Common Pitfalls
- **Things that often go wrong:** {{quickstart_pitfalls}}
`,
  "18": `# 18 – User Journeys & Core Flows

## 1. Primary Journeys
- **Journey 1 Name:** {{journey1_name}}
- **Journey 2 Name:** {{journey2_name}}

## 2. Journey 1: Detailed Flow
- **Persona:** {{journey1_persona}}
- **Entry point:** {{journey1_entry}}
- **Key steps:** {{journey1_steps_summary}}
- **Success outcome:** {{journey1_success}}

## 3. Notes for AI Tools
- Use these journeys when designing onboarding questions or proposing UX tweaks.
`,
  "21": `# 21 – Conversation / Flow Engine Specification

## 1. Purpose
- **What kinds of flows this engine must support:** {{flow_engine_purpose}}

## 2. Core Concepts
- **Node or step structure:** {{flow_engine_nodes}}
- **Transitions:** {{flow_engine_transitions}}
- **Context:** {{flow_engine_context}}

## 3. Representation
- **How flows are represented (JSON, YAML):** {{flow_engine_representation}}

## 4. Execution Model
- **How a flow run starts/ends:** {{flow_engine_execution_model}}
- **Error handling:** {{flow_engine_error_handling}}
`,
  "31": `# 31 – Design System & UI Components

## 1. Design Tokens
- **Colors/Spacing/Type:** {{design_tokens_summary}}

## 2. Core Components
- **List of main components:** {{core_components_list}}
- **State handling:** {{component_state_patterns}}

## 3. Layout Patterns
- **Common layouts:** {{layout_patterns}}

## 4. Accessibility
- **Rules:** {{accessibility_rules}}
`,
  "72": `# 72 – Analytics & Event Tracking Plan

## 1. Analytics Goals
- **What questions we want analytics to answer:** {{analytics_goals}}

## 2. Core Events
- **Event 1:** {{event1_name}}
  - Trigger: {{event1_trigger}}
  - Properties: {{event1_properties}}
  - Why: {{event1_reason}}

## 3. Funnels
- **Activation funnel steps:** {{activation_funnel}}

## 4. Implementation
- **Tools:** {{analytics_tools}}
- **Conventions:** {{analytics_naming_conventions}}
`,
  "76": `# 76 – System Maps & Visual Diagrams

> Visual cockpit for the project. Use Mermaid for all diagrams.

## 4. Product / User Flow (Mermaid)
\`\`\`mermaid
flowchart TD
    U[User] --> A[Entry]
    A --> B[Step 1]
    B --> C[Outcome]
\`\`\`
- **Description:** {{diagram_user_journeys_desc}}

## 5. System Context Diagram (Mermaid)
\`\`\`mermaid
flowchart LR
    User --> Frontend
    Frontend --> API
    API --> DB
\`\`\`
- **Description:** {{diagram_system_arch_desc}}
`,
  "83": `# 83 – Project Kernel & Context Config

> Defines the "brain" of the project for AI tools.

## 1. Kernel Concept
- **What is the kernel?:** {{kernel_concept}}

## 2. Core Inputs
- **Docs included in context:** {{kernel_core_doc_ids}}

## 3. Platform Mapping
- **How maps to IDEs:** {{kernel_platform_mapping}}
`,
  "84": `# 84 – Brain-Dump Onboarding Flow

## 1. Philosophy
- **Why we allow brain dumps:** {{brain_dump_philosophy}}

## 2. Input Types
- **What users can paste:** {{brain_dump_input_types}}

## 3. Flow Outline
- **Step 1 – Collect:** {{brain_dump_step1}}
- **Step 2 – Extract:** {{brain_dump_step2}}
- **Step 3 – Clarify:** {{brain_dump_step3}}
- **Step 4 – Review:** {{brain_dump_step4}}
`
};

// --- FULL 102-DOC STRUCTURE (Representative) ---
export const INITIAL_DOCS_STRUCTURE: DocMetadata[] = [
    // BATCH 0: Foundation (J2 Planner)
    { id: '00', title: 'AGENTS Master Spec', filename: '00_agents_master_spec.md', group: 'Core', batchIndex: 0, dependsOn: [], status: DocStatus.PENDING },
    { id: '01', title: 'Vision & Narrative', filename: '01_vision_scope.md', group: 'Vision', batchIndex: 0, dependsOn: ['00'], status: DocStatus.PENDING },
    { id: '05', title: 'Personas & JTBD', filename: '05_personas_jobs_to_be_done.md', group: 'Vision', batchIndex: 0, dependsOn: ['01'], status: DocStatus.PENDING },
    { id: '07', title: 'Problem Landscape', filename: '07_problem_pain_landscape.md', group: 'Vision', batchIndex: 0, dependsOn: ['01'], status: DocStatus.PENDING },
    
    // BATCH 1: Users & Requirements (J3 Writer)
    { id: '09', title: 'Executive Summary', filename: '09_executive_summary_pitch.md', group: 'Users', batchIndex: 1, dependsOn: ['01', '07'], status: DocStatus.PENDING },
    { id: '11', title: 'Quickstart Guide', filename: '11_quickstart_implementation_guide.md', group: 'Users', batchIndex: 1, dependsOn: ['05'], status: DocStatus.PENDING },
    { id: '18', title: 'User Journeys', filename: '18_user_journeys_flows.md', group: 'Users', batchIndex: 1, dependsOn: ['05', '11'], status: DocStatus.PENDING },

    // BATCH 2: Product & UX (J3 Writer)
    { id: '21', title: 'Conversation Flow Engine', filename: '21_conversation_flow_engine.md', group: 'Product', batchIndex: 2, dependsOn: ['18'], status: DocStatus.PENDING },
    { id: '23', title: 'Voice UX Patterns', filename: '23_voice_ux_patterns.md', group: 'Product', batchIndex: 2, dependsOn: ['18', '21'], status: DocStatus.PENDING },
    { id: '31', title: 'Design System', filename: '31_design_system_ui_components.md', group: 'Product', batchIndex: 2, dependsOn: ['18'], status: DocStatus.PENDING },
    { id: '33', title: 'Admin Dashboard', filename: '33_admin_dashboard_spec.md', group: 'Product', batchIndex: 2, dependsOn: ['31'], status: DocStatus.PENDING },

    // BATCH 3: Architecture (J2 Planner / J3 Writer)
    { id: '38', title: 'Permissions & Roles', filename: '38_permissions_roles_model.md', group: 'System', batchIndex: 3, dependsOn: ['18'], status: DocStatus.PENDING },
    { id: '56', title: 'Deployment Guide', filename: '56_deployment_guide_production.md', group: 'System', batchIndex: 3, dependsOn: ['31'], status: DocStatus.PENDING },
    { id: '58', title: 'CI/CD Pipeline', filename: '58_ci_cd_pipeline.md', group: 'System', batchIndex: 3, dependsOn: ['56'], status: DocStatus.PENDING },

    // BATCH 4: AI & Data (J2 Planner)
    { id: '72', title: 'Analytics Plan', filename: '72_analytics_event_tracking_plan.md', group: 'AI', batchIndex: 4, dependsOn: ['18'], status: DocStatus.PENDING },
    { id: '76', title: 'Visual System Maps', filename: '76_mermaid_maps_index.md', group: 'AI', batchIndex: 4, dependsOn: ['00', '18', '56'], status: DocStatus.PENDING },
    { id: '78', title: 'Prompt Playbook', filename: '78_prompt_playbook_library.md', group: 'AI', batchIndex: 4, dependsOn: ['00'], status: DocStatus.PENDING },
    { id: '83', title: 'Kernel Config', filename: '83_project_kernel_config_spec.md', group: 'AI', batchIndex: 4, dependsOn: ['00'], status: DocStatus.PENDING },

    // BATCH 5: Ops & GTM (J3 Writer)
    { id: '84', title: 'Onboarding Script', filename: '84_brain_dump_onboarding_script.md', group: 'Ops', batchIndex: 5, dependsOn: ['11'], status: DocStatus.PENDING },
    { id: '101', title: 'Onboarding Library', filename: '101_onboarding_script_library.md', group: 'GTM', batchIndex: 5, dependsOn: ['84'], status: DocStatus.PENDING },
    // Added for Pro Differentiation
    { id: '66', title: 'Growth Playbook', filename: '66_growth_activation_playbook.md', group: 'GTM', batchIndex: 5, dependsOn: ['72'], status: DocStatus.PENDING },
    { id: '99', title: 'Legal Terms', filename: '99_legal_terms_privacy_outline.md', group: 'Legal', batchIndex: 5, dependsOn: ['00'], status: DocStatus.PENDING },
    { id: '100', title: 'Marketing Site', filename: '100_marketing_site_spec.md', group: 'GTM', batchIndex: 5, dependsOn: ['09'], status: DocStatus.PENDING },
];

export const BATCHES: BatchDefinition[] = [
  { index: 0, name: 'Foundation & Vision', description: 'Core narrative, problem definitions, and user alignment.', range: [1, 8] },
  { index: 1, name: 'Users & Requirements', description: 'Personas, detailed user stories, and use cases.', range: [9, 16] },
  { index: 2, name: 'Product & UX', description: 'User flows, interface specs, and accessibility standards.', range: [17, 26] },
  { index: 3, name: 'System Architecture', description: 'Tech stack, API design, database schemas, and infrastructure.', range: [27, 46] },
  { index: 4, name: 'AI & Data Strategy', description: 'Prompts, agents, RAG indexing, and model routing.', range: [47, 56] },
  { index: 5, name: 'Ops & GTM', description: 'Testing, deployment, security, and launch playbooks.', range: [77, 102] },
];

export const ENCOURAGING_MESSAGES = [
  "Aligning the stars for your product launch...",
  "Synthesizing your genius into structured data...",
  "Drafting the blueprint of the future...",
  "Configuring platform rules for your IDE...",
  "Optimizing for maximum vibe...",
  "Applying architectural patterns...",
  "Refining the edge cases...",
  "Your vision is becoming reality...",
  "Generating .cursorrules for precision coding...",
  "Checking for logical consistency...",
  "This is going to be a great product.",
  "Constructing the knowledge graph...",
  "Polishing the user experience specs..."
];

export const TIER_LIMITS = {
    free: {
        maxProjects: 1,
        canExport: false,
        generationSpeed: 'slow', 
        storageLimit: 5 * 1024 * 1024,
    },
    starter: {
        maxProjects: 3,
        canExport: true,
        generationSpeed: 'fast',
        storageLimit: 50 * 1024 * 1024,
    },
    pro: {
        maxProjects: 100,
        canExport: true,
        generationSpeed: 'turbo',
        storageLimit: 1024 * 1024 * 1024,
    },
    admin: {
        maxProjects: 9999,
        canExport: true,
        generationSpeed: 'turbo',
        storageLimit: 1024 * 1024 * 1024 * 100,
    }
};

export const ADMIN_EMAILS = ['admin@contextark.com', 'founder@startup.com'];

export const PROJECT_TEMPLATES: ProjectTemplate[] = [
    {
        id: 'saas-mvp',
        name: 'B2B SaaS Starter',
        description: 'Classic SaaS setup: Auth, Dashboard, Stripe Billing, and Settings.',
        intakeData: {
            projectName: 'Acme SaaS',
            description: 'A B2B SaaS application designed to help teams collaborate on projects. Features include user authentication, multi-tenant workspaces, subscription billing via Stripe, and a real-time dashboard for analytics.',
            targetAudience: 'Remote teams, Project Managers, SMBs',
            coreOffer: 'Streamlined project management with automated reporting.',
            constraints: 'Must ship in 4 weeks. Low infrastructure cost.',
            techStackPrefs: 'Next.js, Supabase (Auth/DB), Tailwind CSS, Stripe',
            targetPlatforms: ['cursor', 'windsurf']
        }
    },
    {
        id: 'ai-agent',
        name: 'AI Voice/Chat Agent',
        description: 'Conversational agent with RAG, voice capability, and tool use.',
        intakeData: {
            projectName: 'OmniAgent',
            description: 'An intelligent AI agent capable of handling customer support queries via voice and chat. It uses RAG to retrieve knowledge from a documentation base and can perform actions like booking appointments via API tools.',
            targetAudience: 'Customer Support Teams, E-commerce stores',
            coreOffer: '24/7 automated support reducing human workload by 80%.',
            constraints: 'Latency under 500ms for voice. Strict data privacy.',
            techStackPrefs: 'Python (FastAPI), LangChain, OpenAI/Anthropic, Pinecone, LiveKit',
            targetPlatforms: ['cursor', 'windsurf']
        }
    },
    {
        id: 'e-commerce',
        name: 'Modern E-commerce',
        description: 'Headless storefront with product catalog, cart, and checkout.',
        intakeData: {
            projectName: 'Luxe Store',
            description: 'A high-performance headless e-commerce storefront. Features include a visual product catalog, shopping cart with persistent state, secure checkout flow, and user order history.',
            targetAudience: 'Fashion brands, D2C startups',
            coreOffer: 'Premium shopping experience with blazing fast page loads.',
            constraints: 'SEO is critical. Mobile-first design.',
            techStackPrefs: 'Next.js, Shopify (Headless) or MedusaJS, Tailwind CSS',
            targetPlatforms: ['cursor', 'windsurf']
        }
    }
];

export const PACKS: Record<string, PackDefinition> = {
  vibe_mvp: {
    id: 'vibe_mvp',
    label: 'Vibe MVP Pack',
    description: 'Optimized for speed-to-MVP. Generates the 30 essential docs needed to ship.',
    core_docs: ["00", "05", "07", "09", "11", "18", "24", "31", "32", "36", "38", "40", "42", "46", "48", "54", "56", "58", "60", "64", "72", "76", "78", "81", "83", "84", "91", "97", "101"],
    optional_docs: ["100", "102", "21", "23", "33", "35"]
  },
  pro_builder: {
    id: 'pro_builder',
    label: 'Pro Builder Pack',
    description: 'Full enterprise-grade spec suite. Architecture, risk, compliance, and deep infra.',
    core_docs: ["00", "05", "07", "09", "11", "12", "14", "16", "18", "20", "21", "22", "23", "24", "26", "28", "30", "32", "33", "34", "35", "36", "38", "40", "42", "44", "46", "48", "50", "52", "54", "56", "58", "60", "62", "64", "66", "68", "70", "72", "74", "76", "78", "79", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "100", "101", "102"],
    optional_docs: []
  }
};

export const PLATFORM_TEMPLATES: Record<string, string> = {
  cursor: `
# Cursor Rules Template – Spec-Driven Development

You are an expert AI engineer working on this repository.

1. Your primary Source of Truth is \`./AGENTS.md\` (Doc 00). READ IT FIRST.
2. Also prioritize these docs when available:
   - 07_problem_pain_landscape.md
   - 11_quickstart_implementation_guide.md
   - 18_user_journeys_flows.md
   - 31_design_system_ui_components.md
   - 83_project_kernel_config_spec.md

3. Always follow the Spec-Driven loop:
   - Read the spec and relevant docs.
   - Propose a short plan in the chat.
   - Implement changes in small, reviewable steps.

Use this file as \`.cursorrules\` in the repo root.
`,
  windsurf: `
# Windsurf Rules Template – Spec-Driven Development

You are an expert AI engineer in Windsurf Cascade.

- ALWAYS reference \`@AGENTS.md\` for project context.
- When possible, also load: 11_quickstart.md, 18_user_journeys.md, 31_design_system.md.

Workflow:
1. When the user types \`/plan\`:
   - Read AGENTS.md and any relevant docs.
   - Generate a checklist in \`current_task.md\` with small, executable steps.

Use this as \`.windsurfrules\` in the repo root.
`,
  bolt: `
[PHASE 0: PROJECT KNOWLEDGE]

You are building this app using Spec-Driven Development.
The main spec documents in the repo are:
- 00_agents_master_spec.md
- 11_quickstart_implementation_guide.md
- 31_design_system_ui_components.md

You MUST treat these as the Source of Truth.
`,
  replit: `
# Replit Agent Rules – SDD Mode

1. Read AGENTS.md and key docs:
- 00_agents_master_spec.md
- 11_quickstart_implementation_guide.md
- 31_design_system_ui_components.md

2. Before large changes, summarize the plan and how it aligns with the spec.
3. Prefer incremental diffs and explain them.
`,
  lovable: `
# Lovable Knowledge – SDD Core

This project uses Spec-Driven Development. The main docs are:
- 00_agents_master_spec.md
- 11_quickstart_implementation_guide.md
- 31_design_system_ui_components.md

Rules:
- Treat AGENTS.md as the master spec.
- Keep generated code and UIs aligned with the docs above.
`,
  cline: `
# Cline Rules Template – Spec-Driven Development

SYSTEM INSTRUCTIONS:

1. Immediately read \`./AGENTS.md\` and any core docs you can find.
2. Before modifying code:
   - Update or create \`./progress.md\` with your plan.
3. If a user request conflicts with AGENTS.md, ask for clarification.

Use this as \`.clinerules\` in the repo root.
`,
  continue: `
# Continue Spec-Driven Prompt

You are an AI assistant following the project specs.
Always verify your plan against \`AGENTS.md\` before suggesting code.
`,
  copilot: `
# GitHub Copilot Instructions

You are an expert AI engineer.
1. Read AGENTS.md for project context.
2. Ensure code suggestions align with the defined tech stack and architecture.
`,
  blackbox: `
# Blackbox Cache Context

- Project: {{project_name}}
- Spec: AGENTS.md
- Tech Stack: {{tech_stack_summary}}

Use this context for all generation tasks.
`,
  firebase: `
# Firebase IDX Instructions

This project is defined by \`AGENTS.md\`.
Please read it to understand the architecture and authorized features.
`,
  v0: `
# v0.dev Block Prompting Guide

You are editing specific blocks of a Spec-Driven project.
Read \`AGENTS.md\` and \`31_design_system.md\` for style guidelines.
Do not reinvent the design system.
`
};