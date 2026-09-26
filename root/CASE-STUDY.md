# Case Study: Consent Management & Compliance Operations

**A Marketing Operations portfolio project — built entirely on free-tier
tools for a fictional B2B SaaS company.**

## The business problem

Lumen Metrics, a small e-commerce analytics SaaS company, had spent eight
months growing its contact database with no consent discipline: every
demo request, ebook download, and imported conference lead was emailed
the same way, with no record of who had actually agreed to marketing
contact. As the company's first Marketing Operations hire, my task was to
answer one question with evidence, not assumptions: **can this database
actually be used legally and safely for marketing?**

## Compliance and operational risk

Without a consent system, the company had no way to answer:
why a given contact was in the database, what they'd actually agreed to,
or what should happen the moment someone withdrew consent. The website
also had zero cookie consent — analytics tracking fired unconditionally
on every page load. With the company beginning to target EU prospects,
this exposure was real, not theoretical.

## System architecture

![Architecture diagram](docs/05-consent-architecture.md)

A GitHub Pages site with a custom-built cookie consent banner feeds
Google Tag Manager, which enforces Google Consent Mode v2 — Google
Analytics 4 cannot fire until a visitor explicitly grants analytics
consent, proven live in testing (Phase 5 and Phase 11). Three HubSpot
forms capture marketing consent as a separate, non-required, unbundled
choice from whatever the visitor actually came for. HubSpot Free CRM
stores consent as five distinct signals rather than one flag, and a
segment-based suppression system — architected around a single
"source of truth" exclusion segment — determines live marketing
eligibility.

Full technical detail: [`docs/05-consent-architecture.md`](docs/05-consent-architecture.md)

## Consent data model

Consent is deliberately modeled as five separate concepts rather than one
"consented: yes/no" field: cookie/tracking consent, marketing email
consent (at the category level), legal basis for processing, native
subscription/unsubscribe status, and data subject rights requests.
Full spec: [`docs/02-consent-data-model.md`](docs/02-consent-data-model.md)

## Implementation highlights

- Built and gated GA4 tracking behind real Consent Mode v2 signals, with
  no tag firing possible until explicit consent — not just delayed, but
  architecturally incapable of firing early.
- Discovered and worked around HubSpot Free's 10-custom-property,
  portal-wide cap (not project-specific) by auditing and archiving unused
  properties from an earlier project — a real property-governance action.
- Redesigned the suppression logic mid-build into a cleaner
  single-source-of-truth pattern: one "Suppressed" segment as the
  authority, referenced by every other eligibility segment via membership
  filters, rather than duplicating rules across segments.
- Added a native HubSpot GDPR consent element to the preference form,
  layering real, platform-enforced subscription control on top of a
  custom audit property — most builds stop at the custom property alone.
- Verified suppression with a real campaign send (not a simulation):
  confirmed exactly 2 of 5 test contacts received it, and checked each
  suppressed contact's individual record to confirm zero delivery
  attempt, distinguishing "never sent" from "sent but bounced."

## HubSpot configuration
[`docs/07-hubspot-configuration.md`](docs/07-hubspot-configuration.md)

## Tracking/GTM configuration
[`docs/06-consent-capture-specification.md`](docs/06-consent-capture-specification.md)

## Preference management
[`docs/08-preference-management.md`](docs/08-preference-management.md)

## Suppression logic
[`docs/03-suppression-logic.md`](docs/03-suppression-logic.md)

## Test scenarios and results
Five contacts, each representing a distinct edge case (full consent,
demo-only/no marketing consent, withdrawn consent, unknown/legacy
consent, and partial category consent), tested against predicted outcomes
and matched exactly. Full plan and results:
[`docs/04-qa-test-plan.md`](docs/04-qa-test-plan.md)

## Limitations

This is an educational portfolio project, not a certified compliance
system, and does not make any real company legally compliant with GDPR,
CCPA, or any other regulation. Specific technical limitations:
- Several native HubSpot GDPR features (custom subscription types,
  Workflow-based automation, branded preference pages) require a paid
  plan and were substituted with documented free workarounds.
- Two consent-context properties are populated manually rather than
  automatically, due to Free tier's lack of Workflow automation.
- Test contacts used non-deliverable reserved email domains, so real
  inbox delivery was not verified — only HubSpot's internal send
  eligibility logic was.

Full list: [`docs/01-consent-policy-assumptions.md`](docs/01-consent-policy-assumptions.md)

## Recommendations for a production version

A real implementation would need: legal review in every operating
jurisdiction, Marketing Hub Starter or above to unlock true custom
subscription types and Workflow automation, a real verified sending
domain, Data Processing Agreements with HubSpot and Google, and
real-address testing before any live send.

## Lessons learned

The free-tier constraints turned out to be the most valuable part of
this project, not an obstacle to it. Hitting the property cap forced a
real property-governance decision instead of an abstract one. The lack of
Workflows forced an honest choice between a fragile automation hack and a
documented manual process — and the manual process was, genuinely, the
more defensible operational choice. Building within real limits produced
better design decisions than an unconstrained build would have.
