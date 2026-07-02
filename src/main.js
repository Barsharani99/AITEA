// AITEA Web Application Entry Point
import { initI18n } from './i18n.js';

// Import Web Components
import './components/AppHeader.js';
import './components/AppFooter.js';
import './components/CtaSection.js';
import './components/PartnerSection.js';
import './components/NewsCard.js';
import './components/EventCard.js';
import './components/DownloadCard.js';

// Initialize i18n and service worker
function initializeApp() {
  initI18n().then(() => {
    console.log('AITEA Localization initialized for language:', window.aitea_i18n?.currentLang());
  });

  // Register Service Worker for caching Unsplash images
  if ('serviceWorker' in navigator && window.isSecureContext && location.protocol !== 'file:') {
    // If the window has already loaded, register immediately
    if (document.readyState === 'complete') {
      navigator.serviceWorker.register('./sw.js')
        .then((reg) => console.log('AITEA SW registered with scope:', reg.scope))
        .catch((err) => console.error('AITEA SW registration failed:', err));
    } else {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
          .then((reg) => console.log('AITEA SW registered with scope:', reg.scope))
          .catch((err) => console.error('AITEA SW registration failed:', err));
      });
    }
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}
