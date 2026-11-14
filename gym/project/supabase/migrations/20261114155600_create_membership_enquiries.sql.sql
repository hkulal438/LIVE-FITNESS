/*
# Create membership_enquiries table

1. New Tables
- `membership_enquiries`
  - `id` (uuid, primary key)
  - `full_name` (text, not null) — name of the person enquiring
  - `phone` (text, not null) — contact phone number
  - `fitness_goal` (text, nullable) — optional fitness goal description
  - `callback_time` (text, nullable) — optional preferred callback time
  - `message` (text, nullable) — optional message from the enquirer
  - `created_at` (timestamptz, default now()) — when the enquiry was submitted

2. Security
- Enable RLS on `membership_enquiries`.
- Grant INSERT to `anon, authenticated` so the public enquiry form (no sign-in) can submit.
- No SELECT/UPDATE/DELETE grants for anon or authenticated — enquiries are only readable by the gym staff via the Supabase dashboard (service_role).
- INSERT policy allows anyone (anon + authenticated) to submit an enquiry. This is a public contact form with no sign-in screen.

3. Important Notes
- This is a single-tenant, no-auth app: the website has no sign-in screen.
- The enquiry form is public — any visitor can submit.
- Only INSERT is granted to anon/authenticated. Reading enquiries is restricted to the service_role (dashboard access).
*/

CREATE TABLE IF NOT EXISTS membership_enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  phone text NOT NULL,
  fitness_goal text,
  callback_time text,
  message text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE membership_enquiries ENABLE ROW LEVEL SECURITY;

GRANT INSERT ON membership_enquiries TO anon, authenticated;

DROP POLICY IF EXISTS "anon_can_submit_enquiry" ON membership_enquiries;
CREATE POLICY "anon_can_submit_enquiry"
ON membership_enquiries FOR INSERT
TO anon, authenticated
WITH CHECK (true);
