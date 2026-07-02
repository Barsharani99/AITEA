import { translatePage } from '../i18n.js';

class AppHeader extends HTMLElement {
  connectedCallback() {
    this.render();
    this.setupLanguageSwitcher();
    this.setupMobileMenu();
    this.setupNavigationHints();
    this.highlightActiveLink();
    
    // Listen for language changes to update translation placeholders if rendering again
    window.addEventListener('languageChanged', this.handleLangChange);
  }

  disconnectedCallback() {
    window.removeEventListener('languageChanged', this.handleLangChange);
  }

  handleLangChange = () => {
    this.updateLanguageDisplay();
  }

  route(path) {
    return path === 'index' ? './index.html' : `./${path}.html`;
  }

  render() {
    this.innerHTML = `
      <header class="main-header glass">
        <div class="container header-container">
          <!-- Logo -->
          <a href="${this.route('index')}" class="logo-link" id="header-logo">
            <svg class="logo-svg" width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="45" stroke="var(--color-primary)" stroke-width="6" />
              <!-- Austria Red Stripes -->
              <path d="M15 35 H85 M15 45 H85" stroke="#ef4444" stroke-width="4" />
              <!-- India Saffron & Green Stripes -->
              <path d="M15 55 H85" stroke="#f97316" stroke-width="4" />
              <path d="M15 65 H85" stroke="#22c55e" stroke-width="4" />
              <!-- Connecting Bridge -->
              <path d="M30 50 C40 30, 60 30, 70 50" stroke="var(--color-accent)" stroke-width="5" stroke-linecap="round" fill="none" />
            </svg>
            <div class="logo-text">
              <span class="logo-title">AITEA</span>
              <span class="logo-subtitle">Austria India Trade & Edu</span>
            </div>
          </a>

          <!-- Desktop Navigation -->
          <nav class="desktop-nav" aria-label="Main Navigation">
            <ul class="nav-list">
              <li><a href="${this.route('index')}" class="nav-link" data-i18n="nav.home">Home</a></li>
              
              <!-- About Dropdown -->
              <li class="dropdown-item">
                <a href="#" class="nav-link dropdown-toggle" aria-haspopup="true">
                  <span data-i18n="nav.about">About Us</span> <span class="dropdown-arrow">▼</span>
                </a>
                <ul class="dropdown-menu">
                  <li><a href="${this.route('about')}" class="dropdown-link" data-i18n="nav.about">About AITEA</a></li>
                  <li><a href="${this.route('founders')}" class="dropdown-link" data-i18n="nav.founders">Founders</a></li>
                  <li><a href="${this.route('leadership')}" class="dropdown-link" data-i18n="nav.leadership">Board & Advisors</a></li>
                </ul>
              </li>

              <!-- Sectors Dropdown -->
              <li class="dropdown-item">
                <a href="#" class="nav-link dropdown-toggle" aria-haspopup="true">
                  <span data-i18n="nav.sectors">Sectors</span> <span class="dropdown-arrow">▼</span>
                </a>
                <ul class="dropdown-menu">
                  <li><a href="${this.route('culture')}" class="dropdown-link" data-i18n="nav.culture">Culture</a></li>
                  <li><a href="${this.route('education')}" class="dropdown-link" data-i18n="nav.education">Education</a></li>
                  <li><a href="${this.route('sports')}" class="dropdown-link" data-i18n="nav.sports">Sports</a></li>
                  <li><a href="${this.route('tourism')}" class="dropdown-link" data-i18n="nav.tourism">Tourism</a></li>
                  <li><a href="${this.route('gastronomy')}" class="dropdown-link" data-i18n="nav.gastronomy">Gastronomy</a></li>
                  <li><a href="${this.route('technology')}" class="dropdown-link" data-i18n="nav.technology">Technology</a></li>
                </ul>
              </li>

              <!-- Resources Dropdown -->
              <li class="dropdown-item">
                <a href="#" class="nav-link dropdown-toggle" aria-haspopup="true">
                  <span>Resources</span> <span class="dropdown-arrow">▼</span>
                </a>
                <ul class="dropdown-menu">
                  <li><a href="${this.route('news')}" class="dropdown-link" data-i18n="nav.news">News & Updates</a></li>
                  <li><a href="${this.route('events')}" class="dropdown-link" data-i18n="nav.events">Events</a></li>
                  <li><a href="${this.route('downloads')}" class="dropdown-link" data-i18n="nav.downloads">Downloads</a></li>
                </ul>
              </li>

              <li><a href="${this.route('membership')}" class="nav-link" data-i18n="nav.membership">Membership</a></li>
              <li><a href="${this.route('contact')}" class="nav-link btn-nav-contact" data-i18n="nav.contact">Contact Us</a></li>
            </ul>
          </nav>

          <!-- Utilities (Language + Hamburger) -->
          <div class="header-utils">
            <!-- Language Selector -->
            <div class="lang-selector" id="lang-selector-dropdown">
              <button class="lang-btn" aria-expanded="false" id="lang-menu-btn">
                <span class="lang-globe">🌐</span>
                <span class="current-lang-text">EN</span>
                <span class="dropdown-arrow-mini">▼</span>
              </button>
              <ul class="lang-dropdown">
                <li><button class="lang-opt" data-lang="en">English (EN)</button></li>
                <li><button class="lang-opt" data-lang="de">Deutsch (DE)</button></li>
                <li><button class="lang-opt" data-lang="hi">हिन्दी (HI)</button></li>
              </ul>
            </div>

            <!-- Hamburger Button -->
            <button class="mobile-toggle" aria-label="Toggle Navigation" id="mobile-toggle-btn">
              <span class="hamburger-bar"></span>
              <span class="hamburger-bar"></span>
              <span class="hamburger-bar"></span>
            </button>
          </div>
        </div>
      </header>

      <!-- Mobile Navigation Drawer -->
      <div class="mobile-drawer" id="mobile-nav-drawer" aria-hidden="true">
        <div class="drawer-header">
          <div class="drawer-logo-container">
            <span class="drawer-logo-text">AITEA MENU</span>
          </div>
          <button class="drawer-close" aria-label="Close Navigation" id="drawer-close-btn">&times;</button>
        </div>
        <div class="drawer-body">
          <ul class="mobile-nav-list">
            <li><a href="${this.route('index')}" class="mobile-nav-link" data-i18n="nav.home">Home</a></li>
            
            <li class="mobile-collapsible">
              <button class="mobile-collapsible-btn">
                <span data-i18n="nav.about">About Us</span> <span class="collapsible-icon">+</span>
              </button>
              <ul class="mobile-submenu">
                <li><a href="${this.route('about')}" class="mobile-nav-link" data-i18n="nav.about">About AITEA</a></li>
                <li><a href="${this.route('founders')}" class="mobile-nav-link" data-i18n="nav.founders">Founders</a></li>
                <li><a href="${this.route('leadership')}" class="mobile-nav-link" data-i18n="nav.leadership">Board & Advisors</a></li>
              </ul>
            </li>

            <li class="mobile-collapsible">
              <button class="mobile-collapsible-btn">
                <span data-i18n="nav.sectors">Sectors</span> <span class="collapsible-icon">+</span>
              </button>
              <ul class="mobile-submenu">
                <li><a href="${this.route('culture')}" class="mobile-nav-link" data-i18n="nav.culture">Culture</a></li>
                <li><a href="${this.route('education')}" class="mobile-nav-link" data-i18n="nav.education">Education</a></li>
                <li><a href="${this.route('sports')}" class="mobile-nav-link" data-i18n="nav.sports">Sports</a></li>
                <li><a href="${this.route('tourism')}" class="mobile-nav-link" data-i18n="nav.tourism">Tourism</a></li>
                <li><a href="${this.route('gastronomy')}" class="mobile-nav-link" data-i18n="nav.gastronomy">Gastronomy</a></li>
                <li><a href="${this.route('technology')}" class="mobile-nav-link" data-i18n="nav.technology">Technology</a></li>
              </ul>
            </li>

            <li class="mobile-collapsible">
              <button class="mobile-collapsible-btn">
                <span>Resources</span> <span class="collapsible-icon">+</span>
              </button>
              <ul class="mobile-submenu">
                <li><a href="${this.route('news')}" class="mobile-nav-link" data-i18n="nav.news">News & Updates</a></li>
                <li><a href="${this.route('events')}" class="mobile-nav-link" data-i18n="nav.events">Events</a></li>
                <li><a href="${this.route('downloads')}" class="mobile-nav-link" data-i18n="nav.downloads">Downloads</a></li>
              </ul>
            </li>

            <li><a href="${this.route('membership')}" class="mobile-nav-link" data-i18n="nav.membership">Membership</a></li>
            <li><a href="${this.route('contact')}" class="mobile-nav-link mobile-contact-btn" data-i18n="nav.contact">Contact Us</a></li>
          </ul>
        </div>
      </div>
      <div class="mobile-drawer-overlay" id="mobile-drawer-overlay"></div>
    `;
    
    // Inject header styles directly
    this.injectStyles();
  }

  injectStyles() {
    if (document.getElementById('header-component-styles')) return;

    const style = document.createElement('style');
    style.id = 'header-component-styles';
    style.textContent = `
      .main-header {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        height: 80px;
        z-index: 1000;
        border-bottom: 1px solid var(--glass-border);
        transition: background var(--transition-normal), box-shadow var(--transition-normal);
      }

      .header-container {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .logo-link {
        display: flex;
        align-items: center;
        gap: var(--space-3);
        text-decoration: none;
      }

      .logo-svg {
        flex-shrink: 0;
      }

      .logo-text {
        display: flex;
        flex-direction: column;
      }

      .logo-title {
        font-family: var(--font-heading);
        font-weight: 800;
        font-size: var(--fs-lg);
        color: var(--color-primary);
        line-height: 1;
        letter-spacing: 1px;
      }

      .logo-subtitle {
        font-size: 0.65rem;
        font-weight: 600;
        color: var(--color-text-muted);
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin-top: 2px;
      }

      .desktop-nav {
        display: none;
      }

      .nav-list {
        display: flex;
        align-items: center;
        list-style: none;
        gap: var(--space-6);
      }

      .nav-link {
        font-family: var(--font-heading);
        font-weight: 600;
        font-size: var(--fs-sm);
        color: var(--color-text-dark);
        padding: var(--space-2) var(--space-1);
        position: relative;
      }

      .nav-link::after {
        display: none;
        content: none;
      }

      .nav-link:hover::after,
      .nav-link.active::after {
        width: 0;
      }

      .dropdown-item {
        position: relative;
      }

      .dropdown-toggle {
        display: flex;
        align-items: center;
        gap: var(--space-1);
      }

      .dropdown-arrow {
        font-size: 0.55rem;
        transition: transform var(--transition-fast);
      }

      .dropdown-item:hover .dropdown-arrow {
        transform: rotate(180deg);
      }

      .dropdown-menu {
        position: absolute;
        top: 100%;
        left: 0;
        background-color: var(--color-bg-white);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        box-shadow: var(--shadow-lg);
        list-style: none;
        min-width: 200px;
        opacity: 0;
        visibility: hidden;
        transform: translateY(10px);
        transition: all var(--transition-normal);
        padding: var(--space-2) 0;
        z-index: 1010;
      }

      .dropdown-item:hover .dropdown-menu {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
      }

      .dropdown-link {
        display: block;
        padding: var(--space-2) var(--space-4);
        font-size: var(--fs-sm);
        color: var(--color-text-dark);
        font-weight: 500;
        transition: background-color var(--transition-fast), color var(--transition-fast);
      }

      .dropdown-link:hover {
        background-color: var(--color-bg-light);
        color: var(--color-secondary);
      }

      .btn-nav-contact {
        background-color: var(--color-primary);
        color: white !important;
        padding: 0.5rem 1.25rem !important;
        border-radius: var(--radius-md);
        transition: all var(--transition-fast);
      }

      .btn-nav-contact::after {
        display: none !important;
      }

      .btn-nav-contact:hover {
        background-color: var(--color-secondary);
        transform: translateY(-1px);
        box-shadow: var(--shadow-md);
      }

      /* Utilities */
      .header-utils {
        display: flex;
        align-items: center;
        gap: var(--space-4);
      }

      .lang-selector {
        position: relative;
      }

      .lang-btn {
        background: transparent;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-full);
        padding: 0.4rem 0.8rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: var(--space-2);
        font-family: var(--font-heading);
        font-weight: 600;
        font-size: var(--fs-xs);
        color: var(--color-text-dark);
        transition: all var(--transition-fast);
      }

      .lang-btn:hover {
        background-color: var(--color-bg-white);
        border-color: var(--color-text-muted);
      }

      .dropdown-arrow-mini {
        font-size: 0.5rem;
      }

      .lang-dropdown {
        position: absolute;
        top: calc(100% + 5px);
        right: 0;
        background-color: var(--color-bg-white);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        box-shadow: var(--shadow-lg);
        list-style: none;
        min-width: 130px;
        padding: var(--space-2) 0;
        display: none;
        z-index: 1010;
      }

      .lang-dropdown.show {
        display: block;
      }

      .lang-opt {
        width: 100%;
        background: none;
        border: none;
        text-align: left;
        padding: var(--space-2) var(--space-4);
        font-family: var(--font-body);
        font-size: var(--fs-sm);
        font-weight: 500;
        cursor: pointer;
        color: var(--color-text-dark);
        transition: background-color var(--transition-fast), color var(--transition-fast);
      }

      .lang-opt:hover {
        background-color: var(--color-bg-light);
        color: var(--color-secondary);
      }

      .mobile-toggle {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 24px;
        height: 18px;
        background: none;
        border: none;
        cursor: pointer;
        z-index: 1020;
      }

      .hamburger-bar {
        width: 100%;
        height: 2.5px;
        background-color: var(--color-text-dark);
        border-radius: var(--radius-full);
        transition: all var(--transition-fast);
      }

      /* Mobile Navigation Drawer */
      .mobile-drawer {
        position: fixed;
        top: 0;
        right: -300px;
        width: 300px;
        height: 100vh;
        background-color: var(--color-bg-white);
        box-shadow: var(--shadow-xl);
        z-index: 1050;
        transition: right var(--transition-normal);
        display: flex;
        flex-direction: column;
      }

      .mobile-drawer.open {
        right: 0;
      }

      .drawer-header {
        padding: var(--space-6) var(--space-6) var(--space-4) var(--space-6);
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid var(--color-border);
      }

      .drawer-logo-text {
        font-family: var(--font-heading);
        font-weight: 800;
        font-size: var(--fs-md);
        color: var(--color-primary);
        letter-spacing: 0.5px;
      }

      .drawer-close {
        font-size: 2rem;
        background: none;
        border: none;
        cursor: pointer;
        color: var(--color-text-dark);
        line-height: 1;
      }

      .drawer-body {
        padding: var(--space-6);
        overflow-y: auto;
        flex: 1;
      }

      .mobile-nav-list {
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: var(--space-4);
      }

      .mobile-nav-link {
        font-family: var(--font-heading);
        font-weight: 600;
        font-size: var(--fs-base);
        color: var(--color-text-dark);
        display: block;
        padding: var(--space-1) 0;
        text-decoration: none;
      }

      .mobile-collapsible-btn {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: none;
        border: none;
        text-align: left;
        font-family: var(--font-heading);
        font-weight: 600;
        font-size: var(--fs-base);
        color: var(--color-text-dark);
        padding: var(--space-1) 0;
        cursor: pointer;
      }

      .collapsible-icon {
        font-weight: 400;
        font-size: var(--fs-md);
      }

      .mobile-submenu {
        list-style: none;
        padding-left: var(--space-4);
        margin-top: var(--space-2);
        display: none;
        flex-direction: column;
        gap: var(--space-2);
        border-left: 1px solid var(--color-border);
      }

      .mobile-submenu.show {
        display: flex;
      }

      .mobile-submenu .mobile-nav-link {
        font-size: var(--fs-sm);
        font-weight: 500;
        color: var(--color-text-muted);
      }

      .mobile-contact-btn {
        background-color: var(--color-primary);
        color: white;
        text-align: center;
        padding: 0.75rem var(--space-4);
        border-radius: var(--radius-md);
        margin-top: var(--space-4);
      }

      .mobile-drawer-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(15, 23, 42, 0.4);
        backdrop-filter: blur(4px);
        z-index: 1040;
        opacity: 0;
        visibility: hidden;
        transition: all var(--transition-normal);
      }

      .mobile-drawer-overlay.show {
        opacity: 1;
        visibility: visible;
      }

      /* Desktop Expansion Query */
      @media (min-width: 1024px) {
        .desktop-nav {
          display: block;
        }

        .mobile-toggle {
          display: none;
        }
      }
    `;
    document.head.appendChild(style);
  }

  setupLanguageSwitcher() {
    const btn = this.querySelector('#lang-menu-btn');
    const dropdown = this.querySelector('.lang-dropdown');
    
    // Toggle dropdown
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', !isExpanded);
      dropdown.classList.toggle('show');
    });

    // Close on click outside
    document.addEventListener('click', () => {
      btn.setAttribute('aria-expanded', 'false');
      dropdown.classList.remove('show');
    });

    // Language select option clicks
    const options = this.querySelectorAll('.lang-opt');
    options.forEach(opt => {
      opt.addEventListener('click', () => {
        const selectedLang = opt.getAttribute('data-lang');
        if (window.aitea_i18n) {
          window.aitea_i18n.changeLanguage(selectedLang);
        }
      });
    });

    this.updateLanguageDisplay();
  }

  updateLanguageDisplay() {
    const currentLang = window.aitea_i18n ? window.aitea_i18n.currentLang() : 'en';
    const displayElement = this.querySelector('.current-lang-text');
    if (displayElement) {
      displayElement.textContent = currentLang.toUpperCase();
    }
  }

  setupMobileMenu() {
    const toggleBtn = this.querySelector('#mobile-toggle-btn');
    const drawer = this.querySelector('#mobile-nav-drawer');
    const closeBtn = this.querySelector('#drawer-close-btn');
    const overlay = this.querySelector('#mobile-drawer-overlay');

    const openDrawer = () => {
      drawer.classList.add('open');
      overlay.classList.add('show');
      drawer.setAttribute('aria-hidden', 'false');
    };

    const closeDrawer = () => {
      drawer.classList.remove('open');
      overlay.classList.remove('show');
      drawer.setAttribute('aria-hidden', 'true');
    };

    toggleBtn.addEventListener('click', openDrawer);
    closeBtn.addEventListener('click', closeDrawer);
    overlay.addEventListener('click', closeDrawer);

    // Setup mobile collapsible submenu accordions
    const collapsibles = this.querySelectorAll('.mobile-collapsible-btn');
    collapsibles.forEach(btn => {
      btn.addEventListener('click', () => {
        const submenu = btn.nextElementSibling;
        const icon = btn.querySelector('.collapsible-icon');
        const isShow = submenu.classList.toggle('show');
        icon.textContent = isShow ? '−' : '+';
      });
    });
  }

  setupNavigationHints() {
    const preloadPage = (href) => {
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;
      const url = new URL(href, window.location.href);
      if (url.origin !== window.location.origin || document.querySelector(`link[rel="prefetch"][href="${url.href}"]`)) return;

      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = url.href;
      link.as = 'document';
      document.head.appendChild(link);
    };

    this.querySelectorAll('a[href]').forEach(link => {
      link.addEventListener('pointerenter', () => preloadPage(link.getAttribute('href')), { once: true });
      link.addEventListener('focus', () => preloadPage(link.getAttribute('href')), { once: true });
    });
  }

  normalizePath(value) {
    const path = new URL(value, window.location.href).pathname;
    const normalized = path.replace(/\/index\.html$/, '/').replace(/\.html$/, '').replace(/\/$/, '');
    return normalized || '/';
  }

  highlightActiveLink() {
    const url = new URL(window.location.href);
    const path = this.normalizePath(url.href);
    const step = url.searchParams.get('step');
    const links = this.querySelectorAll('.nav-link, .dropdown-link, .mobile-nav-link');
    
    links.forEach(link => {
      const href = link.getAttribute('href');
      if (href) {
        let linkUrl;
        try {
          linkUrl = new URL(href, window.location.href);
        } catch (e) {
          return;
        }
        const normalizedHref = this.normalizePath(linkUrl.href);
        const linkStep = linkUrl.searchParams.get('step');
        
        const pathMatches = path === normalizedHref;
        const stepMatches = !linkStep || linkStep === step;
        
        if (pathMatches && stepMatches) {
          link.classList.add('active');
          
          // If inside a dropdown, highlight the parent too
          const dropdownParent = link.closest('.dropdown-item, .mobile-collapsible');
          if (dropdownParent) {
            const toggle = dropdownParent.querySelector('.nav-link, .mobile-collapsible-btn');
            if (toggle) toggle.classList.add('active');
          }
        }
      }
    });
  }
}

customElements.define('app-header', AppHeader);
