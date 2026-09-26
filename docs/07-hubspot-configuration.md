# HubSpot Configuration Documentation

## Privacy & Consent settings
- Data privacy settings: ON
- "Send emails to contacts with legal basis" (native enforcement,
  auto-excludes contacts with no recorded legal basis from marketing
  sends): ON

## Property group
`Consent & Privacy`, created via Settings -> Properties -> Contact
properties -> Groups tab -> Create group.

## Custom contact properties
| Label | Internal name | Type | Options |
|---|---|---|---|
| Cookie/Tracking Consent Status | cookie_tracking_consent_status | Dropdown select | Granted / Denied / Not Yet Presented |
| Tracking Consent Captured Date | tracking_consent_captured_date | Date picker | - |
| Marketing Consent - Communication Categories | marketing_consent_categories | Multiple checkboxes | Product Updates & Tips / Promotions & Offers / Sales Outreach |
| Marketing Consent Captured Date | marketing_consent_captured_date | Date picker | - |
| Marketing Consent Source | marketing_consent_source | Dropdown select | Demo Request Form / Newsletter & Ebook Form / Manage Preferences Form / Manual (Sales) / Manual (Import) |
| Suppression Reason | suppression_reason | Dropdown select | No Consent Captured / Withdrew Consent / Unsubscribed / Consent Unknown - Legacy Import |

**Free-tier constraint encountered:** HubSpot Free caps custom properties
at 10, portal-wide (not per-project). Four legacy properties from an
earlier portfolio project had to be archived to make room for this
project's six.

## Native properties used
- Legal basis for processing contact's data (options used: "Freely given
  consent from contact," "Legitimate interest - Lead")
- Unsubscribed from all email
- Opted out of email: Marketing Information
- Marketing contact status

## Subscription types (default, Free tier — custom types require Starter+)
- Marketing Email | Marketing Information
- Sales Email | One to One

## Segments
| Name | Type | Logic |
|---|---|---|
| Suppressed - Consent Not Valid | Active | Suppression Reason known OR Unsubscribed from all email = Yes OR Opted out of email: Marketing Information = Yes OR Marketing Consent Categories unknown |
| Consent Unknown - Needs Review | Active | Legal basis is unknown |
| Valid Marketing Contacts - Product Updates & Tips | Active | Category includes "Product Updates & Tips" AND not a member of Suppressed |
| Valid Marketing Contacts - Promotions & Offers | Active | Category includes "Promotions & Offers" AND not a member of Suppressed |
| QA Test Contacts - Consent Scenarios A-E | Static | Manually assigned, five test contacts |

## Forms
Demo Request Form, Newsletter & Ebook Form, Manage Preferences Form — full
specification in `06-consent-capture-specification.md`.

## Tracking settings
Site domain (`<username>.github.io`) added to Additional site domains to
prevent external form submissions being marked as spam.
