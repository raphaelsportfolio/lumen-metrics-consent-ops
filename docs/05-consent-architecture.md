# Consent Architecture

## System diagram
```
 VISITOR
    |
    v
GitHub Pages: Lumen Metrics
Custom JS Consent Banner [Necessary | Analytics]
    | consent choice -> dataLayer
    v
Google Tag Manager
Consent Mode v2 defaults (analytics_storage gated)
    |-- if granted --> GA4
    |-- always -----> HubSpot Forms (Demo / Ebook / Manage Preferences)
                            | submission
                            v
                      HubSpot Free CRM
                Legal basis . Tracking consent
                Marketing consent . Native subscription status
                            |
        +-------------------+--------------------+
        v                                         v
Suppressed - Consent Not Valid          Consent Unknown - Needs Review
(single source of truth)                (review queue)
        |
        v (referenced via Segment membership filter)
Valid Marketing Contacts - [Category] x2
        |
        v
Marketing sends / campaign eligibility / audit reporting
```

## Design decisions that changed during implementation

- **Lists -> Segments:** HubSpot renamed this feature (Contacts -> Segments)
  partway through the build. All documentation uses "Segments."
- **Suppression logic redesign (Phase 9):** rather than each "Valid" segment
  re-checking every consent condition independently (the original Phase 2
  draft), the final design uses one segment (`Suppressed - Consent Not
  Valid`) as the single source of truth, referenced by the "Valid" segments
  via a Segment membership filter. This avoids duplicated logic drifting
  out of sync across multiple segments.
- **Deferred fields (PAID LIMITATION):** `Cookie/Tracking Consent Status`
  and both "captured date" properties were originally meant to auto-fill
  from hidden form fields. Reliable, dynamic auto-population of a hidden
  field from a visitor's live browser state requires either a paid
  Workflow or fragile custom JavaScript with no guaranteed match to
  HubSpot's internal field format. These are set manually per contact
  instead (see `04-qa-test-plan.md` for how this was handled for the five
  test contacts).
- **Layered preference management (Phase 8):** a native HubSpot GDPR
  "Data Privacy" checkbox element was added directly to the Manage
  Preferences form, tying a real, platform-enforced subscribe/unsubscribe
  toggle to the same form that manages our custom audit categories — see
  `08-preference-management.md`.

## Data flow narrative
A visitor lands on the site and sees the consent banner before any
non-essential script runs. Their choice is written to `localStorage` and
pushed to the GTM dataLayer, which conditionally unlocks GA4. If they
submit a form, that submission is a separate, explicit act of marketing
consent, captured with its own timestamp and source. HubSpot Segments
continuously recalculate who is currently eligible, referencing one
suppression segment as the single source of truth rather than duplicating
rules. Native HubSpot subscription status is the unconditional legal
enforcement layer beneath all of this — verified directly in Phase 11 by
sending a real campaign and confirming suppressed contacts received
nothing.
