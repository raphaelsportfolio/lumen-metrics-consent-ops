# QA Test Plan & Results

## Test 1 — Suppression enforcement on a real send
**Method:** Sent a real marketing campaign to the "Valid Marketing Contacts -
Product Updates & Tips" segment, with "Suppressed - Consent Not Valid"
explicitly excluded.
**Expected:** Only Sarah Chen (Contact A) and David Osei (Contact E) receive
the campaign; Marcus Webb, Priya Patel, and the legacy import contact do not.
**Result:** [Fill in: PASS/FAIL, with screenshot reference]
**Verification method:** Checked recipient count at send time (2), and
confirmed presence/absence of the campaign on each individual contact's
record — the most reliable proof, since the test contacts' example.com
addresses bounce regardless of eligibility, making bounce status alone
insufficient evidence.

## Test 2 — Consent-gated analytics tracking
**Method:** Fresh incognito session, declined analytics, confirmed GA4
Realtime showed 0 users; re-opened banner, granted analytics, confirmed
GA4 Realtime showed 1 active user.
**Expected:** Zero tracking before consent, tracking begins immediately
after consent.
**Result:** [Fill in]

## Test 3 — Full front-to-back pipeline
**Method:** One continuous live pass — cookie banner → GTM/GA4 →
demo form submission → HubSpot contact creation → automatic segment
placement.
**Expected:** A newly submitted contact lands in the correct
"Valid Marketing Contacts" segment within about a minute, with no manual
intervention.
**Result:** [Fill in]

## Known limitations surfaced during testing
- Test contact email addresses use reserved, non-deliverable domains
  (example.com), so real inbox delivery could not be verified — only
  HubSpot's internal recipient selection and per-contact send logs were
  used as evidence. A production system would need real-address testing
  before launch.
- No automated regression testing exists; this test plan is a manual
  checklist to be re-run after any change to properties, segments, or
  forms.
