# Consent Policy Assumptions & Limitations

**Status:** Living document — updated as the project progresses.
**Owner (in scenario):** Marketing Operations Specialist (you).

## Purpose
This document states what this project assumes, what standard it holds
itself to, and — critically — what it does NOT claim. Every later phase
(data model, forms, suppression logic) is built to satisfy the assumptions
below.

## This is not legal advice
This is an educational portfolio project built by a Marketing Operations
Specialist, not a lawyer. Nothing here should be read as a certification
that any real company is compliant with any law. A real implementation
would require review by qualified legal counsel in every relevant
jurisdiction.

## Jurisdictional scope (assumption)
Lumen Metrics is treated as a US-based company with an active EU/UK
customer base. Rather than build separate logic per jurisdiction, this
project uses **GDPR's consent standard as the baseline** for the whole
system, since it is currently one of the stricter global standards:
explicit, freely given, specific, informed, and unambiguous consent,
collected via opt-in (never a pre-checked box), and withdrawable as easily
as it was given. Meeting this baseline is treated as a reasonable proxy for
also covering lighter-touch regimes (e.g., US state laws like CCPA/CPRA),
though a real company would still need a jurisdiction-by-jurisdiction
legal review rather than relying on a single baseline.

## Consent is modeled as multiple distinct signals, not one flag
This project deliberately separates:
- Cookie/tracking consent (can we track this browser's behavior)
- Marketing email consent, at the category level (product updates vs.
  promotions vs. sales outreach)
- Legal basis for processing (why we may store the data at all)
- Subscription/unsubscribe status (the current, live opt-in/opt-out state)
- Data subject rights requests (access, correction, deletion)

A single "consented: yes/no" field cannot represent any of this accurately,
and collapsing them is treated as a design flaw this project exists to
avoid.

## Known limitations of this implementation
- No real Data Processing Agreements with sub-processors (HubSpot, Google)
  are drafted or reviewed here — a real company would need these.
- No professional cookie-scanning/audit tooling is used; the cookie
  inventory in this project's Cookie Policy is manually documented, not
  automatically scanned.
- The HubSpot Forms embed script is treated, for this project, as strictly
  necessary to the site's core function (delivering a requested demo or
  ebook) and is therefore not gated behind analytics consent, while GA4 is
  gated. A real company would confirm this classification with legal
  counsel rather than assume it.
- Built entirely on free-tier tools; several native HubSpot GDPR features
  (custom subscription types, Workflows-based automation) are paid-only and
  are substituted with documented free workarounds. Each substitution is
  called out explicitly where it occurs.
- Tested with five synthetic contacts, not real traffic or real regulatory
  scrutiny.

## Revisit triggers
This document should be re-read (and updated if needed) at the start of
every phase from here forward, particularly Phase 2 (data model) and
Phase 9 (suppression logic), to confirm nothing built since contradicts an
assumption stated here.
