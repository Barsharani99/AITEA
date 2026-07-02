class CtaSection extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <section class="cta-banner-section">
        <div class="container">
          <div class="cta-card glass">
            <div class="cta-content">
              <h2 class="cta-title" data-i18n="cta.title">Shape the Future of Indo-Austrian Relations</h2>
              <p class="cta-description" data-i18n="cta.description">
                Join AITEA today to unlock exclusive networking opportunities, strategic partnerships, and access to cross-border initiatives in education, technology, and trade.
              </p>
            </div>
            <div class="cta-actions">
              <a href="/membership#categories" class="btn btn-accent cta-btn-primary" data-i18n="cta.btn_apply">Apply for Membership</a>
              <a href="/contact" class="btn btn-outline cta-btn-secondary" data-i18n="cta.btn_contact">Get in Touch</a>
            </div>
          </div>
        </div>
      </section>
    `;

    this.injectStyles();
  }

  injectStyles() {
    if (document.getElementById('cta-component-styles')) return;

    const style = document.createElement('style');
    style.id = 'cta-component-styles';
    style.textContent = `
      .cta-banner-section {
        padding-top: var(--space-8);
        padding-bottom: var(--space-16);
      }

      .cta-card {
        padding: var(--space-8) var(--space-6);
        border-radius: var(--radius-xl);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        gap: var(--space-8);
        text-align: center;
        position: relative;
        overflow: hidden;
      }

      .cta-card::before {
        content: '';
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: radial-gradient(circle at center, rgba(15, 118, 110, 0.05) 0%, transparent 60%),
                    radial-gradient(circle at 75% 75%, rgba(245, 158, 11, 0.03) 0%, transparent 60%);
        pointer-events: none;
        z-index: 0;
      }

      .cta-content {
        position: relative;
        z-index: 1;
        max-width: 700px;
      }

      .cta-title {
        font-size: var(--fs-xl);
        font-family: var(--font-heading);
        color: var(--color-primary);
        margin-bottom: var(--space-3);
        line-height: var(--lh-tight);
      }

      .cta-description {
        font-size: var(--fs-base);
        color: var(--color-text-muted);
        margin-bottom: 0;
      }

      .cta-actions {
        position: relative;
        z-index: 1;
        display: flex;
        flex-direction: column;
        gap: var(--space-3);
        width: 100%;
      }

      @media (min-width: 480px) {
        .cta-actions {
          flex-direction: row;
          justify-content: center;
          width: auto;
        }
      }

      .cta-btn-primary {
        box-shadow: var(--shadow-md);
      }

      .cta-btn-secondary {
        border-color: var(--color-primary);
        color: var(--color-primary);
      }
      .cta-btn-secondary:hover {
        background-color: var(--color-primary);
        color: white;
      }

      @media (min-width: 1024px) {
        .cta-card {
          flex-direction: row;
          text-align: left;
          padding: var(--space-12) var(--space-12);
        }

        .cta-actions {
          flex-shrink: 0;
        }

        .cta-title {
          font-size: var(--fs-2xl);
        }
      }
    `;
    document.head.appendChild(style);
  }
}

customElements.define('cta-section', CtaSection);
