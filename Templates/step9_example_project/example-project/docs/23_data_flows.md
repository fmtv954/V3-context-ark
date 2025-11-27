# 23 – Data Flows & Storage

## Data Entities

- **Lead**
  - name, contact, intent, budget, timeline
  - campaign_id, call_id

- **Call Session**
  - start_time, end_time, duration
  - transcript_summary
  - recording_url (optional / later)

- **Campaign**
  - name, description
  - qr_url, call_page_url
  - owner_id

## Flow Summary

1. Caller scans QR → redirected to call page (campaign_id in URL).
2. Call session row created in DB.
3. During call, agent builds in-memory lead object.
4. At end of call:
   - Lead is stored in `leads` table.
   - Call session updated with summary.
   - Asana task created with key fields.
   - Email summary sent to campaign owner.
