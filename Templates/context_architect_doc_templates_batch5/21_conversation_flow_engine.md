# 21 – Conversation / Flow Engine Specification

> How multi-step flows, wizards, or conversational journeys are modeled and executed.
> Audience: backend, AI engineers, AI tools building orchestrators or agents.

## 1. Purpose

- **What kinds of flows this engine must support (onboarding, Q&A, doc review, etc.):**
  - {{flow_engine_purpose}}

## 2. Core Concepts

- **Node or step structure (states, prompts, actions):**
  - {{flow_engine_nodes}}
- **Transitions (how we move between steps):**
  - {{flow_engine_transitions}}
- **Context (what data is carried between steps):**
  - {{flow_engine_context}}

## 3. Representation

- **How flows are represented (JSON, YAML, DB records, code):**
  - {{flow_engine_representation}}

## 4. Execution Model

- **How a flow run starts, progresses, and ends:**
  - {{flow_engine_execution_model}}
- **How to handle errors or missing info (backtracking, clarifications):**
  - {{flow_engine_error_handling}}

## 5. Authoring & Editing

- **How humans or AI modify flows (UI, config files, etc.):**
  - {{flow_engine_authoring}}

## 6. Notes for AI Tools

- When creating or modifying flows:
  - Follow these concepts and representation formats.
  - Keep flows debuggable and explainable.
