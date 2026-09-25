# Suppression Logic & Manual Audit SOP

## Design principle
`Suppressed - Consent Not Valid` is the single source of truth for exclusion.
Every other marketing-eligibility segment checks membership in that one
segment rather than re-implementing the same rules — this avoids the rules
drifting out of sync across multiple places.

## The four segments

1. **Suppressed - Consent Not Valid** (Active) — any ONE of:
   - Suppression Reason is known
   - Unsubscribed from all email = Yes
   - Opted out of email: Marketing Information = Yes
   - Marketing Consent - Communication Categories is unknown

2. **Consent Unknown - Needs Review** (Active) — Legal basis for processing
   is unknown. Overlaps intentionally with Suppressed — this is a review
   queue, not an enforcement mechanism.

3. **Valid Marketing Contacts - Product Updates & Tips** (Active) —
   category includes "Product Updates & Tips" AND not a member of
   Suppressed.

4. **Valid Marketing Contacts - Promotions & Offers** (Active) — same
   pattern, "Promotions & Offers" category.

## PAID LIMITATION: no automated field sync

On Marketing Hub Starter+, a Workflow would automatically set
`Suppression Reason` the moment a contact unsubscribes or their
consent lapses. Free has no Workflows tool at all, so this project
relies on a manual weekly audit instead.

## Weekly manual audit checklist

Every week (or before any marketing send), a Marketing Operations
Specialist should:

1. Open **Suppressed - Consent Not Valid**. For any contact whose
   `Suppression Reason` is still blank despite matching (i.e., they
   unsubscribed or have no categories checked), manually set the correct
   `Suppression Reason` value.
2. Open **Consent Unknown - Needs Review**. For each contact, either
   locate and record their legal basis, or leave them queued for removal.
3. Spot-check one contact from each **Valid Marketing Contacts** segment
   to confirm they genuinely should be there.
4. Log the audit (date, contacts reviewed, actions taken) in this
   project's `evidence` folder or a simple tracking sheet.

This is a real, common practice at small companies without Marketing Hub
automation — manual, periodic governance instead of automatic enforcement.
