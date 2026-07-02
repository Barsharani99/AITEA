class PartnerSection extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <section class="partner-logos-section section-alt">
        <div class="container">
          <div class="section-header">
            <h2 data-i18n="partners.title">Our Collaboration & Strategic Partners</h2>
            <p data-i18n="partners.subtitle">Connecting leading organizations and government bodies across Austria and India.</p>
          </div>
          
          <div class="partner-carousel">
            <div class="partner-grid">
              <!-- Partner 1 -->
              <div class="partner-logo-card">
                <svg width="45" height="45" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="50" height="50" rx="8" fill="#1e293b" />
                  <path d="M15 15 H35 V20 H25 V35 H20 V20 H15 Z" fill="#d97706" />
                  <circle cx="32" cy="27" r="4" fill="#0284c7" />
                </svg>
                <div class="partner-name">Austrian Trade Council</div>
              </div>
              
              <!-- Partner 2 -->
              <div class="partner-logo-card">
                <svg width="45" height="45" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="50" height="50" rx="8" fill="#1e293b" />
                  <path d="M12 25 L25 12 L38 25 L25 38 Z" stroke="#ef4444" stroke-width="3" fill="none" />
                  <path d="M22 25 H28" stroke="#ffffff" stroke-width="3" />
                </svg>
                <div class="partner-name">EU-India Business Forum</div>
              </div>

              <!-- Partner 3 -->
              <div class="partner-logo-card">
                <svg width="45" height="45" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="50" height="50" rx="8" fill="#1e293b" />
                  <circle cx="25" cy="25" r="12" stroke="#22c55e" stroke-width="3" fill="none" />
                  <path d="M20 22 L25 28 L32 18" stroke="#ffffff" stroke-width="3" stroke-linecap="round" fill="none" />
                </svg>
                <div class="partner-name">Indo-Austrian Science Fndn</div>
              </div>

              <!-- Partner 4 -->
              <div class="partner-logo-card">
                <svg width="45" height="45" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="50" height="50" rx="8" fill="#1e293b" />
                  <path d="M15 15 H35 V35 H15 Z" stroke="#3b82f6" stroke-width="3" fill="none" />
                  <path d="M15 25 H35" stroke="#3b82f6" stroke-width="1.5" />
                  <path d="M25 15 V35" stroke="#3b82f6" stroke-width="1.5" />
                </svg>
                <div class="partner-name">Viennese Academic Exchange</div>
              </div>

              <!-- Partner 5 -->
              <div class="partner-logo-card">
                <svg width="45" height="45" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="50" height="50" rx="8" fill="#1e293b" />
                  <path d="M25 10 L37 32 H13 Z" fill="none" stroke="#f59e0b" stroke-width="3" />
                  <circle cx="25" cy="24" r="3" fill="#ffffff" />
                </svg>
                <div class="partner-name">Ministry of Skills & Tech</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;

    this.injectStyles();
  }

  injectStyles() {
    if (document.getElementById('partner-component-styles')) return;

    const style = document.createElement('style');
    style.id = 'partner-component-styles';
    style.textContent = `
      .partner-logos-section {
        padding: var(--space-16) 0;
      }

      .partner-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: var(--space-4);
      }

      @media (min-width: 640px) {
        .partner-grid {
          grid-template-columns: repeat(3, 1fr);
        }
      }

      @media (min-width: 1024px) {
        .partner-grid {
          grid-template-columns: repeat(5, 1fr);
        }
      }

      .partner-logo-card {
        background-color: var(--color-bg-white);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        padding: var(--space-6) var(--space-4);
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        gap: var(--space-3);
        transition: all var(--transition-normal);
        box-shadow: var(--shadow-sm);
      }

      .partner-logo-card:hover {
        transform: translateY(-3px);
        box-shadow: var(--shadow-md);
        border-color: var(--color-secondary-light);
      }

      .partner-logo-card svg {
        transition: transform var(--transition-normal);
      }

      .partner-logo-card:hover svg {
        transform: scale(1.1) rotate(5deg);
      }

      .partner-name {
        font-family: var(--font-heading);
        font-size: var(--fs-xs);
        font-weight: 700;
        color: var(--color-text-dark);
        line-height: var(--lh-tight);
      }
    `;
    document.head.appendChild(style);
  }
}

customElements.define('partner-section', PartnerSection);
