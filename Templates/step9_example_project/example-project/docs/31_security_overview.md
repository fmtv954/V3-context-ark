# 31 – Security Overview

## Authentication & Authorization

- Admin users authenticate via Supabase Auth (email or magic link).
- Each campaign is scoped to an account / workspace.
- Call pages are public but only allow creating leads, not reading data.

## Data Protection

- Secrets stored in environment variables.
- DB access limited via RLS (Row-Level Security) in Supabase.
- Audit logging for:
  - New campaigns
  - New leads
  - Failed Asana / email deliveries (for debugging).

## Future Enhancements

- IP rate limiting on call entry.
- Optional OTP for accessing sensitive dashboards.
