class AppFooter extends HTMLElement {
  connectedCallback() {
    this.render();
    this.setupNewsletter();
  }

  render() {
    this.innerHTML = `
      <footer class="site-footer">
        <div class="container footer-grid">
          <!-- Column 1: Info -->
          <div class="footer-col footer-col-info">
            <a href="/" class="footer-logo">
              <svg class="footer-logo-svg" width="35" height="35" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="45" stroke="#ffffff" stroke-width="6" />
                <path d="M15 35 H85 M15 45 H85" stroke="#ef4444" stroke-width="4" />
                <path d="M15 55 H85" stroke="#f97316" stroke-width="4" />
                <path d="M15 65 H85" stroke="#22c55e" stroke-width="4" />
                <path d="M30 50 C40 30, 60 30, 70 50" stroke="#f59e0b" stroke-width="5" stroke-linecap="round" fill="none" />
              </svg>
              <span class="footer-logo-text">AITEA</span>
            </a>
            <p class="footer-desc" data-i18n="footer.description">
              Austria India Trade and Education Association (AITEA) promotes bilateral cooperation, cultural understanding, and strategic partnerships between Austria and India.
            </p>            
          </div>
 
          <!-- Column 2: Quick Links -->
          <div class="footer-col">
            <h3 class="footer-col-title" data-i18n="footer.links_title">Quick Links</h3>
            <ul class="footer-links">
              <li><a href="/" data-i18n="nav.home">Home</a></li>
              <li><a href="/about" data-i18n="nav.about">About AITEA</a></li>
              <li><a href="/founders" data-i18n="nav.founders">Founders</a></li>
              <li><a href="/leadership" data-i18n="nav.leadership">Board & Advisors</a></li>
              <li><a href="/membership" data-i18n="nav.membership">Membership</a></li>
            </ul>
          </div>
 
          <!-- Column 3: Sectors -->
          <div class="footer-col">
            <h3 class="footer-col-title" data-i18n="footer.sectors_title">Key Sectors</h3>
            <ul class="footer-links">
              <li><a href="/culture" data-i18n="nav.culture">Culture</a></li>
              <li><a href="/education" data-i18n="nav.education">Education</a></li>
              <li><a href="/sports" data-i18n="nav.sports">Sports</a></li>
              <li><a href="/tourism" data-i18n="nav.tourism">Tourism</a></li>
              <li><a href="/gastronomy" data-i18n="nav.gastronomy">Gastronomy</a></li>
              <li><a href="/technology" data-i18n="nav.technology">Technology</a></li>
            </ul>
          </div>
 
          <!-- Column 4: Newsletter & Legal -->
          <div class="footer-col">
            <h3 class="footer-col-title" data-i18n="footer.newsletter_title">Newsletter</h3>
            <form class="footer-newsletter-form" id="newsletter-form">
              <input type="email" class="form-control footer-input" placeholder="Your email address" data-i18n-attr="placeholder:footer.newsletter_placeholder" required id="newsletter-email" />
              <button type="submit" class="btn btn-secondary footer-btn" data-i18n="footer.newsletter_btn">Subscribe</button>
            </form>
            <span class="newsletter-msg" id="newsletter-msg" data-i18n="footer.newsletter_success">Thank you for subscribing!</span>
 
            <h3 class="footer-col-title footer-legal-header" data-i18n="footer.legal_title">Legal</h3>
            <ul class="footer-links footer-legal-links">
              <li><a href="/privacy-policy" data-i18n="nav.privacy">Privacy Policy</a></li>
              <li><a href="/impressum" data-i18n="nav.impressum">Impressum (Legal Notice)</a></li>
              <li><a href="/data-protection" data-i18n="nav.data_protection">Data Protection</a></li>
              <li><a href="/statutes" data-i18n="nav.statutes">Statutes</a></li>
            </ul>
          </div>
        </div>

        <div class="footer-bottom">
          <div class="container footer-bottom-flex">
            <p class="copyright" data-i18n="footer.copyright">© 2026 AITEA. All Rights Reserved. Built with EU-India values.</p>
            <div class="flag-icons">
              <span class="flag flag-at" title="Austria">🇦🇹</span>
              <span class="flag-bridge">🤝</span>
              <span class="flag flag-in" title="India">🇮🇳</span>
            </div>
          </div>
        </div>
      </footer>
    `;

    this.injectStyles();
  }

  injectStyles() {
    if (document.getElementById('footer-component-styles')) return;

    const style = document.createElement('style');
    style.id = 'footer-component-styles';
    style.textContent = `
      .site-footer {
        background-color: var(--color-primary);
        color: #94a3b8;
        padding-top: var(--space-16);
        border-top: 1px solid var(--color-primary-light);
        font-family: var(--font-body);
      }

      .footer-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: var(--space-12);
        padding-bottom: var(--space-12);
      }

      @media (min-width: 768px) {
        .footer-grid {
          grid-template-columns: repeat(2, 1fr);
        }
      }

      @media (min-width: 1024px) {
        .footer-grid {
          grid-template-columns: 2fr 1fr 1fr 2fr;
        }
      }

      .footer-logo {
        display: inline-flex;
        align-items: center;
        gap: var(--space-2);
        color: #ffffff;
        text-decoration: none;
        margin-bottom: var(--space-4);
      }

      .footer-logo-text {
        font-family: var(--font-heading);
        font-weight: 800;
        font-size: var(--fs-xl);
        letter-spacing: 1px;
      }

      .footer-desc {
        font-size: var(--fs-sm);
        line-height: var(--lh-relaxed);
        color: #94a3b8;
        margin-bottom: var(--space-6);
        max-width: 320px;
      }

      .footer-socials {
        display: flex;
        gap: var(--space-3);
      }

      .social-icon {
        color: #94a3b8;
        background-color: var(--color-primary-light);
        width: 38px;
        height: 38px;
        border-radius: var(--radius-md);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all var(--transition-fast);
      }

      .social-icon:hover {
        color: #ffffff;
        background-color: var(--color-secondary);
        transform: translateY(-2px);
      }

      .footer-col-title {
        color: #ffffff;
        font-family: var(--font-heading);
        font-size: var(--fs-md);
        font-weight: 600;
        margin-bottom: var(--space-6);
        position: relative;
      }

      .footer-links {
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: var(--space-3);
      }

      .footer-links a {
        color: #94a3b8;
        font-size: var(--fs-sm);
        text-decoration: none;
        transition: color var(--transition-fast);
      }

      .footer-links a:hover {
        color: #ffffff;
      }

      .footer-newsletter-form {
        display: flex;
        flex-direction: column;
        gap: var(--space-2);
        margin-bottom: var(--space-4);
      }

      @media (min-width: 480px) {
        .footer-newsletter-form {
          flex-direction: row;
        }
      }

      .footer-input {
        background-color: var(--color-primary-light);
        border-color: rgba(255, 255, 255, 0.1);
        color: #ffffff;
      }

      .footer-input::placeholder {
        color: #64748b;
      }

      .footer-input:focus {
        border-color: var(--color-secondary);
      }

      .footer-btn {
        flex-shrink: 0;
      }

      .newsletter-msg {
        display: none;
        color: #22c55e;
        font-size: var(--fs-xs);
        font-weight: 500;
      }

      .footer-legal-header {
        margin-top: var(--space-8);
      }

      .footer-legal-links {
        flex-direction: row;
        flex-wrap: wrap;
        gap: var(--space-4);
      }

      .footer-bottom {
        border-top: 1px solid var(--color-primary-light);
        padding: var(--space-6) 0;
        background-color: #0b0f19;
      }

      .footer-bottom-flex {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        gap: var(--space-4);
      }

      @media (min-width: 768px) {
        .footer-bottom-flex {
          flex-direction: row;
        }
      }

      .copyright {
        font-size: var(--fs-xs);
        color: #64748b;
        text-align: center;
      }

      .flag-icons {
        display: flex;
        align-items: center;
        gap: var(--space-2);
        font-size: var(--fs-lg);
      }

      .flag-bridge {
        font-size: var(--fs-sm);
      }
    `;
    document.head.appendChild(style);
  }

  setupNewsletter() {
    const form = this.querySelector('#newsletter-form');
    const msg = this.querySelector('#newsletter-msg');
    
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        msg.style.display = 'block';
        form.reset();
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          msg.style.display = 'none';
        }, 5000);
      });
    }
  }
}

customElements.define('app-footer', AppFooter);
