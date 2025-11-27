# 54 – Backup & Disaster Recovery

> How we protect against data loss and major outages.
> Audience: DevOps, infra, founders, AI tools proposing infra changes.

## 1. Recovery Objectives

- **RPO (Recovery Point Objective) – how much data we can lose:**  
  - {{rpo_target}}
- **RTO (Recovery Time Objective) – how long we can be down:**  
  - {{rto_target}}

## 2. Backup Strategy

- **What we back up (DBs, files, configs):**
  - {{backup_targets}}
- **Frequency & retention policy:**
  - {{backup_frequency_retention}}
- **Where backups are stored (regions, providers):**
  - {{backup_storage_locations}}

## 3. Recovery Procedures

- **High-level steps to restore from backup:**
  - {{recovery_steps}}
- **How we verify a restore was successful:**
  - {{recovery_verification}}

## 4. DR Scenarios

- **Scenario 1 (e.g., region outage):**
  - {{dr_scenario1}}
- **Scenario 2 (e.g., data corruption):**
  - {{dr_scenario2}}

## 5. Testing & Drills

- **How often we test backups / DR and what we simulate:**
  - {{dr_testing_cadence}}

## 6. Notes for AI Tools

- Avoid proposing architectures that break these backup/DR assumptions.
- If you introduce new critical data stores, note how they should be backed up.
