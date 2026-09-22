// Lumen Metrics — Cookie Consent Banner
// Reads and writes one localStorage entry to remember the visitor's
// choice. Every page load, it either shows the banner (no choice yet)
// or silently re-announces the stored choice by pushing it onto
// window.dataLayer, where Google Tag Manager (Phase 5) will read it.

(function () {
  var STORAGE_KEY = 'lumen_consent_v1';

  window.dataLayer = window.dataLayer || [];

  function getStoredConsent() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  function storeConsent(analyticsGranted) {
    var record = {
      analytics: analyticsGranted ? 'granted' : 'denied',
      timestamp: new Date().toISOString()
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
    } catch (e) {
      // localStorage unavailable (e.g. private browsing) — the choice
      // won't persist across page loads, but this page's dataLayer
      // push still works for the current session.
    }
    return record;
  }

  function pushConsentToDataLayer(record) {
    window.dataLayer.push({
      event: 'cookie_consent_update',
      analyticsConsent: record.analytics,
      consentTimestamp: record.timestamp
    });
  }

  function buildBanner() {
    var banner = document.createElement('div');
    banner.id = 'cookie-consent-banner';
    banner.innerHTML =
      '<div class="cookie-banner-inner">' +
        '<p>We use necessary cookies to run this site, and — only with your permission — analytics cookies to understand how visitors use it. See our <a href="cookies.html">Cookie Policy</a>.</p>' +
        '<div class="cookie-banner-actions">' +
          '<button type="button" id="consent-reject-btn" class="btn btn-secondary">Necessary Only</button>' +
          '<button type="button" id="consent-accept-btn" class="btn">Accept Analytics</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(banner);

    document.getElementById('consent-accept-btn').addEventListener('click', function () {
      var record = storeConsent(true);
      pushConsentToDataLayer(record);
      hideBanner();
    });

    document.getElementById('consent-reject-btn').addEventListener('click', function () {
      var record = storeConsent(false);
      pushConsentToDataLayer(record);
      hideBanner();
    });
  }

  function showBanner() {
    if (!document.getElementById('cookie-consent-banner')) {
      buildBanner();
    }
    document.getElementById('cookie-consent-banner').style.display = 'block';
  }

  function hideBanner() {
    var el = document.getElementById('cookie-consent-banner');
    if (el) el.style.display = 'none';
  }

  function init() {
    var existing = getStoredConsent();

    if (existing) {
      pushConsentToDataLayer(existing);
    } else {
      showBanner();
    }

    var settingsBtn = document.getElementById('cookie-settings-btn');
    if (settingsBtn) {
      settingsBtn.addEventListener('click', function () {
        showBanner();
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
