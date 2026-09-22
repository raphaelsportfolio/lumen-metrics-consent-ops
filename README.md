# Lumen Metrics — Consent Management & Compliance Operations

A portfolio project demonstrating a practical, end-to-end consent-management
system for a marketing database, built entirely on free-tier tools.

**Core question this project answers:**
> Can this marketing database actually be used legally and safely for marketing?

## Live demo
https://raphaelsportfolio.github.io/lumen-metrics-consent-ops/

## What this is
A working (if intentionally modest) implementation of:
1. Consent capture at the front door (cookie/tracking consent + form-level
   marketing opt-in, kept separate from each other)
2. Consent storage in HubSpot (legal basis, subscription status, custom
   consent properties)
3. A preference center contacts can actually use
4. Suppression logic that keeps invalid or withdrawn contacts out of
   marketing sends

## What this is NOT
This is an educational portfolio project. It does not make any real company
legally GDPR/CCPA compliant, and it is not legal advice. See
[`docs/01-consent-policy-assumptions.md`](docs/01-consent-policy-assumptions.md)
for the full scope and limitations.

## Stack
GitHub Pages · Google Tag Manager · GA4 · HubSpot Free CRM — $0 budget,
documented throughout.

## Project structure
- `index.html`, `demo.html`, `resources.html`, `preferences.html`,
  `privacy.html`, `cookies.html`, `style.css`, `script.js` — the live demo
  website, published from the repo root via GitHub Pages
- `/docs` — architecture, data model, and compliance documentation
- `/evidence` — screenshots and configuration evidence
