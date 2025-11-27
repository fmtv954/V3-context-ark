# 62 – Experimentation & A/B Testing

> How we run experiments safely and interpret results.
> Audience: product, growth, data, AI tools proposing experiments.

## 1. Experiment Philosophy

- **When we experiment vs. when we ship directly:**
  - {{experiment_philosophy}}

## 2. Basics

- **What tools or infra we use for experiments:**
  - {{experiment_tools}}
- **How we define variants and control groups:**
  - {{experiment_variants_definition}}

## 3. Design

- **How we define hypotheses (example template):**
  - {{experiment_hypothesis_template}}
- **Success metrics for experiments:**
  - {{experiment_success_metrics}}

## 4. Execution

- **Rollout method (feature flags, % rollout, ramp-up strategy):**
  - {{experiment_rollout_strategy}}

## 5. Analysis

- **How we interpret results (stat sig or directional):**
  - {{experiment_analysis_approach}}

## 6. Notes for AI Tools

- When suggesting tests, tie them to clear hypotheses and metrics.
- Do not run overlapping experiments that conflict on the same user set without flagging it.
