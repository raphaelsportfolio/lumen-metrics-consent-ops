# Consent Data Model — Detailed Specification

Builds on `01-consent-policy-assumptions.md`. This is the spec Phase 6
(HubSpot config) and Phase 9 (suppression logic) implement directly.

## Consent Lifecycle

Two independent state machines run per contact:

```
TRACKING CONSENT (per browser, tied to contact once identified)

  [ Not Yet Presented ]
          │  banner shown
          ▼
   ┌─────────────┐        visitor can reopen banner
   │   Granted    │◄──────────────┐   via "Cookie Settings" link
   └──────┬───────┘               │
          │                       │
          ▼                       │
   ┌─────────────┐                │
   │   Denied     │────────────────┘
   └─────────────┘

MARKETING CONSENT (per contact, per category)

  [ No Record ]
       │ submits form, category box(es) checked
       ▼
  [ Opted In — category X ]
       │
       │ clicks unsubscribe / requests removal
       ▼
  [ Withdrawn ] ── suppression_reason = "Withdrew Consent"
       │
       │ contact re-subscribes with documented legal basis (manual, Phase 6/9)
       ▼
  [ Opted In — category X ]  (history of withdrawal stays on record)
```

Design decision: withdrawal **does not clear** the category checkboxes.
The audit trail (what they once agreed to) is preserved; enforcement
happens through `suppression_reason` and native subscription status, not
by erasing history. This is deliberate — being able to show "here's
exactly what changed and when" is the whole point of an auditable system.

## Property Group

`Consent & Privacy` (internal name `consent_and_privacy`) — houses all six
custom properties below. Native GDPR properties (Legal basis, Email
subscription status) stay in HubSpot's own default groups; we don't
re-parent system properties.

## Full Property Table

| Label | Internal name | Type | Options |
|---|---|---|---|
| Cookie/Tracking Consent Status | `cookie_tracking_consent_status` | Dropdown | Granted / Denied / Not Yet Presented |
| Tracking Consent Captured Date | `tracking_consent_captured_date` | Date | — |
| Marketing Consent – Communication Categories | `marketing_consent_categories` | Multi-checkbox | Product Updates & Tips / Promotions & Offers / Sales Outreach |
| Marketing Consent Captured Date | `marketing_consent_captured_date` | Date | — |
| Marketing Consent Source | `marketing_consent_source` | Dropdown | Demo Request Form / Newsletter & Ebook Form / Manage Preferences Form / Manual (Sales) / Manual (Import) |
| Suppression Reason | `suppression_reason` | Dropdown | (blank) / No Consent Captured / Withdrew Consent / Unsubscribed / Consent Unknown – Legacy Import |

Plus native: **Legal basis for processing contact's data**, native **email
subscription status**, default **Marketing Email** subscription type.

## Tracking Consent → Consent Mode Mapping

Only two banner categories exist in this project: **Necessary** (always
on, no consent required) and **Analytics** (gates GA4). Lumen Metrics runs
no advertising in this project, so `ad_storage`, `ad_user_data`, and
`ad_personalization` are set to a permanent `denied` default in Consent
Mode and never re-evaluated — only `analytics_storage` actually responds
to the banner. This keeps the Phase 5 GTM build honest about what this
project does and doesn't demonstrate.

## Eligibility Logic (Active List Filter Definitions)

**Valid Marketing Contacts – [Category]** (built once per category):
```
marketing_consent_categories INCLUDES [Category]
AND native email subscription status != "opted out"
AND suppression_reason IS BLANK
```

**Suppressed – Consent Not Valid** (any ONE of):
```
suppression_reason IS KNOWN
OR native email subscription status = "opted out"
OR marketing_consent_categories IS BLANK
```

**Consent Unknown – Needs Review**:
```
Legal basis for processing contact's data IS BLANK
```

Note: a contact can legitimately appear in more than one list at once
(e.g., both "Suppressed" and "Consent Unknown" for a legacy import with no
data at all). That's expected — "Suppressed" is the enforcement list,
"Consent Unknown" is the review queue.

## Dry-Run: Test Contacts vs. Logic

| Contact | Categories | Legal basis | Suppression reason | → Valid – Product Updates | → Valid – Promotions | → Suppressed | → Unknown |
|---|---|---|---|---|---|---|---|
| A — Sarah Chen | Product Updates, Promotions | Consent | (blank) | ✅ | ✅ | ❌ | ❌ |
| B — Marcus Webb | (none) | Legitimate interest – Lead | No Consent Captured | ❌ | ❌ | ✅ | ❌ |
| C — Priya Patel | Product Updates *(retained)* | Consent | Withdrew Consent | ❌ | ❌ | ✅ | ❌ |
| D — Legacy import | (none) | (blank) | Consent Unknown – Legacy Import | ❌ | ❌ | ✅ | ✅ |
| E — David Osei | Product Updates only | Consent | (blank) | ✅ | ❌ | ❌ | ❌ |

Every row produces the outcome the scenario demands. This confirms the
filter logic before it's built — Phase 11 will confirm it again, live, in
HubSpot.
