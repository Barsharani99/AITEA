// Internationalization (i18n) Engine for AITEA Website
let currentLang = 'en';
let translations = {};

// Helper to get nested properties by dot notation (e.g., 'nav.about')
function getNestedValue(obj, keyPath) {
  return keyPath.split('.').reduce((prev, curr) => {
    return prev ? prev[curr] : null;
  }, obj);
}

// Fetch translation file for a specific language
async function loadTranslations(lang) {
  try {
    const response = await fetch(`/locales/${lang}.json`);
    if (!response.ok) {
      throw new Error(`Failed to load translation: ${lang}`);
    }
    return await response.json();
  } catch (error) {
    console.error('i18n translation load error:', error);
    // Return empty fallback
    return {};
  }
}

// Perform document-wide translation
export function translatePage() {
  if (!translations[currentLang]) return;

  const currentTranslations = translations[currentLang];

  // 1. Translate elements with data-i18n
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    const translatedText = getNestedValue(currentTranslations, key);

    if (translatedText !== null && translatedText !== undefined) {
      // Support innerHTML if data-i18n-html="true" is set, otherwise default to textContent
      if (el.getAttribute('data-i18n-html') === 'true') {
        el.innerHTML = translatedText;
      } else {
        el.textContent = translatedText;
      }
    }
  });

  // 2. Translate attributes with data-i18n-attr (e.g. placeholder:contact.placeholder_name)
  const attrElements = document.querySelectorAll('[data-i18n-attr]');
  attrElements.forEach(el => {
    const attrSpecs = el.getAttribute('data-i18n-attr').split(',');
    attrSpecs.forEach(spec => {
      const [attrName, key] = spec.split(':').map(str => str.trim());
      if (attrName && key) {
        const translatedValue = getNestedValue(currentTranslations, key);
        if (translatedValue !== null && translatedValue !== undefined) {
          el.setAttribute(attrName, translatedValue);
        }
      }
    });
  });

  // Set the lang attribute on html tag
  document.documentElement.lang = currentLang;
}

// Change system language
export async function changeLanguage(lang) {
  if (lang !== 'en' && lang !== 'de' && lang !== 'hi') {
    lang = 'en';
  }

  currentLang = lang;
  localStorage.setItem('aitea_lang', lang);

  // Load translations if not already fetched
  if (!translations[lang]) {
    translations[lang] = await loadTranslations(lang);
  }

  translatePage();

  // Dispatch global event for Web Components to re-render or translate themselves
  window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
}

// Initialize translation engine
export async function initI18n() {
  // Detect language: LocalStorage -> Navigator Language -> English
  let detectedLang = localStorage.getItem('aitea_lang');
  
  if (!detectedLang) {
    const browserLang = navigator.language || navigator.userLanguage;
    if (browserLang.startsWith('de')) {
      detectedLang = 'de';
    } else if (browserLang.startsWith('hi')) {
      detectedLang = 'hi';
    } else {
      detectedLang = 'en';
    }
  }

  currentLang = detectedLang;
  
  // Load and apply translations
  translations[currentLang] = await loadTranslations(currentLang);
  translatePage();

  // Expose internationally to window context
  window.aitea_i18n = {
    currentLang: () => currentLang,
    changeLanguage,
    translatePage
  };
}
