# Preference Management Specification

This project uses three layered mechanisms rather than one, matching the
Phase 1 principle that consent should never be a single field.

## Layer 1 — Native subscription status (legal enforcement)
The unconditional, platform-enforced switch. Set automatically when a
contact clicks "unsubscribe"/"manage preferences" in a real marketing
email footer, landing on HubSpot's native subscription preferences page.
Verified live in Phase 8 (real send, real click, real status change) and
Phase 11 (a suppressed contact provably received zero marketing).
**PAID LIMITATION:** the visual template of this native page cannot be
custom-branded on Free — that requires Marketing/Content Hub Starter+.
The underlying logic is fully free and fully enforced regardless.

## Layer 2 — Custom category audit property
`Marketing Consent - Communication Categories`, our free workaround for
HubSpot's paid-only custom Subscription Types feature. Records which
specific categories a contact agreed to, for segmentation and audit
purposes. Updated via any of the three forms.

## Layer 3 — Native GDPR checkbox on the Manage Preferences form
Added in Phase 8: a native "Data Privacy" form element, configured in
"Implicit processing consent and individual checkboxes for communications"
mode, tied to the Marketing Information subscription type. This means the
Manage Preferences form doesn't just update our audit property — it can
also flip real subscription status directly, without requiring the
contact to have received an email first.

## Data subject rights
The Manage Preferences form's free-text Message field captures requests
(e.g., "please delete my data"). Fulfillment is manual: locate the
contact, use HubSpot's native GDPR delete-contact functionality (free on
all plans), and log the action per the audit SOP in
`03-suppression-logic.md`.

## What a paid plan would add
Custom subscription types (true native category-level subscribe/unsubscribe
rather than our audit-property workaround), and a branded, multi-page
subscription center — both Marketing/Content Hub Starter+ features.
