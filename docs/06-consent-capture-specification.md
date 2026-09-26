# Consent Capture Specification

## Cookie/tracking consent (website)
- Categories: Necessary (always on) and Analytics (gated).
- Storage: `localStorage` key `lumen_consent_v1`, holding
  `{ analytics: "granted"|"denied", timestamp }`.
- Signal to GTM: `dataLayer.push({ event: "cookie_consent_update",
  analyticsConsent, consentTimestamp })`.
- GTM: `Consent Initialization - All Pages` sets Consent Mode v2 defaults
  to denied; a custom event trigger on `cookie_consent_update` (condition:
  `analyticsConsent = granted`) fires both the consent update tag and the
  GA4 configuration tag. GA4 has no other trigger, so it cannot fire
  without explicit consent — proven live in Phase 11.
- Reopenable anytime via the "Cookie Settings" button in the site footer.

## Form 1 — Demo Request Form
- Fields: First name, Last name, Email (required), Company name,
  Marketing Consent - Communication Categories (optional, unchecked by
  default).
- Consent language: "Requesting a demo doesn't sign you up for marketing
  emails. If you'd also like us to send you product updates, promotions,
  or sales outreach, choose which below — totally optional..."
- Hidden field: Marketing Consent Source = "Demo Request Form" (static).
- Embedded on: `demo.html`.

## Form 2 — Newsletter & Ebook Form
- Fields: Email (required), First name, Marketing Consent - Communication
  Categories (optional).
- Hidden field: Marketing Consent Source = "Newsletter & Ebook Form".
- Embedded on: `resources.html`.

## Form 3 — Manage Preferences Form
- Fields: Email (required), Marketing Consent - Communication Categories
  (optional, pre-populates for returning visitors), Message (free text,
  for privacy/deletion requests), native GDPR Data Privacy consent
  checkbox tied to the "Marketing Information" subscription type
  (implicit processing consent mode — see `08-preference-management.md`).
- Hidden field: Marketing Consent Source = "Manage Preferences Form".
- Embedded on: `preferences.html`.

## Prerequisite: domain allowlisting
All three forms require the site's domain
(`<username>.github.io`) to be added under Settings -> Tracking Code ->
Advanced Tracking -> Additional site domains, or submissions are marked
as spam and silently dropped.
