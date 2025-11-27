# 40 – Testing Strategy & Quality Assurance

> Defines how we ensure the system works and stays working.
> Audience: engineers, QA, AI tools writing or updating tests.

## 1. Testing Philosophy

- **Overall approach (pragmatic, TDD, coverage targets, etc.):**
  - {{testing_philosophy}}

## 2. Types of Tests

- **Unit tests:**
  - {{unit_test_scope}}
- **Integration tests:**
  - {{integration_test_scope}}
- **End-to-end (E2E) tests:**
  - {{e2e_test_scope}}
- **Other tests (load, security, regression):**
  - {{other_test_types}}

## 3. Critical Paths

- **User journeys that MUST always work (happy paths):**
  - {{critical_paths}}

## 4. Tools & Frameworks

- **Testing tools and libraries (per stack):**
  - {{testing_tools}}

## 5. Test Data & Fixtures

- **How we manage realistic test data:**
  - {{test_data_strategy}}
- **Guidelines for fixtures and factories:**
  - {{fixture_guidelines}}

## 6. Definition of Done (Quality)

- **Requirements for a feature to be “done”:**
  - {{definition_of_done}}

## 7. Notes for AI Tools

- When adding or changing features, also:
  - Add/update tests that cover critical paths.
  - Follow the tools and patterns defined here.
