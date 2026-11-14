/*
# Lock down membership_enquiries — restrict to INSERT only

1. Security Changes
- Revoke SELECT, UPDATE, DELETE from anon and authenticated roles on membership_enquiries.
- Re-grant only INSERT to anon and authenticated.
- This ensures the public enquiry form can submit data but cannot read, modify, or delete enquiries.
- Reading enquiries is only possible via the service_role (Supabase dashboard).

2. RLS
- RLS remains enabled.
- The INSERT policy "anon_can_submit_enquiry" remains in place — no changes needed.
- No SELECT/UPDATE/DELETE policies exist, so even if grants existed, RLS would block those operations.
- This is defense-in-depth: grant-level restriction + RLS policy absence.
*/

REVOKE SELECT, UPDATE, DELETE ON membership_enquiries FROM anon, authenticated;
GRANT INSERT ON membership_enquiries TO anon, authenticated;
