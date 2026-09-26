# Implementation Guide

## Build order and dependencies
1. Privacy & Consent settings must be turned on before Legal basis or
   subscription-related fields are usable.
2. The `Consent & Privacy` property group must exist before creating any
   of the six custom properties (created via the Groups tab, not inline
   during property creation).
3. All six properties must exist before building forms that reference
   them.
4. The site domain must be allowlisted before any form embed will accept
   real submissions.
5. `Suppressed - Consent Not Valid` must be built before the two "Valid"
   segments, since they reference it via a membership filter.
6. Test contacts should be created only after every property, form, and
   segment exists, so their data exercises the complete system at once.

## Free-tier gotchas encountered during this build
- Custom properties are capped at 10 **portal-wide**, not per project —
  budget for this across every portfolio project sharing one account.
- Active segments also have a portal-wide cap; this project used 4,
  intentionally leaving headroom.
- HubSpot renamed "Lists" to "Segments" (Sept 2025) and the form GDPR
  element from "Consent checkbox" to "Data Privacy" — both changed the UI
  labels referenced in older tutorials without changing functionality.
- Property groups are created via a separate "Groups" tab on the
  Properties settings page, not inline while creating a property.
- Getting a form's full editor (needed to set internal names and groups)
  requires clicking "Edit more options" after the initial basic panel.

## Maintenance
See `03-suppression-logic.md` for the weekly manual audit checklist that
substitutes for paid Workflow automation.
