# 44 – Error Codes & Response Patterns

> Canonical list of error codes and how they are represented to clients.
> Audience: backend, frontend, support, AI tools handling or generating errors.

## 1. Error Format

- **Standard error JSON shape (fields, types):**
  - {{error_json_shape}}

## 2. Error Code Registry

For each code, define meaning and typical cause.

- **Code: {{error_code_1}}**
  - HTTP status: {{error_code_1_status}}
  - Message: {{error_code_1_message}}
  - Description: {{error_code_1_description}}
  - Suggested user-facing text: {{error_code_1_user_text}}

- **Code: {{error_code_2}}**
  - HTTP status: {{error_code_2_status}}
  - Message: {{error_code_2_message}}
  - Description: {{error_code_2_description}}
  - Suggested user-facing text: {{error_code_2_user_text}}

(Extend as needed.)

## 3. Frontend Handling Patterns

- **Which errors should show banners/modals vs inline messages:**
  - {{frontend_error_handling_patterns}}

## 4. Logging & Alerting

- **Which error codes should trigger alerts or special logging:**
  - {{error_alerting_rules}}

## 5. Notes for AI Tools

- When returning or handling errors, use these codes and formats.
- Do not invent new codes unless you also extend this document.
