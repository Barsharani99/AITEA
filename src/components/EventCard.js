class EventCard extends HTMLElement {
  connectedCallback() {
    const titleKey = this.getAttribute('title-key') || '';
    const dateKey = this.getAttribute('date-key') || '';
    const locationKey = this.getAttribute('location-key') || '';
    const descKey = this.getAttribute('desc-key') || '';
    const link = this.getAttribute('link') || '/events.html';
    const regLink = this.getAttribute('reg-link') || `/event-registration?event=${titleKey}`;
    const image = this.getAttribute('image') || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=500&q=70&fm=webp';

    this.innerHTML = `
      <div class="card event-card-el">
        <div class="event-img-container">
          <img src="${image}" alt="Event visual" class="event-card-img" loading="lazy" decoding="async">
        </div>
        <div class="event-content-body">
          <div>
            <div class="event-meta">
              <div class="event-date-badge">
                <span class="event-calendar-icon">📅</span>
                <span data-i18n="${dateKey}"></span>
              </div>
              <div class="event-location">
                <span class="event-pin-icon">📍</span>
                <span data-i18n="${locationKey}"></span>
              </div>
            </div>
            <h3 class="event-title-text" data-i18n="${titleKey}"></h3>
            <p class="event-description-text" data-i18n="${descKey}"></p>
          </div>
          <div class="event-actions-flex">
            <a href="${regLink}" class="btn btn-primary btn-sm event-btn-reg" data-i18n="events.register_btn">Register Now</a>
            <a href="${link}" class="btn btn-outline btn-sm event-btn-details" data-i18n="events.details_btn">View Details</a>
          </div>
        </div>
      </div>
    `;

    this.injectStyles();
  }

  injectStyles() {
    if (document.getElementById('eventcard-component-styles')) return;

    const style = document.createElement('style');
    style.id = 'eventcard-component-styles';
    style.textContent = `
      .event-card-el {
        display: flex;
        flex-direction: column;
        height: 100%;
        justify-content: space-between;
        padding: 0 !important;
        overflow: hidden;
      }

      .event-img-container {
        height: 160px;
        width: 100%;
        overflow: hidden;
        position: relative;
        background: linear-gradient(135deg, var(--color-primary), var(--color-primary-light));
      }

      .event-card-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform var(--transition-normal);
      }

      .event-card-el:hover .event-card-img {
        transform: scale(1.05);
      }

      .event-content-body {
        padding: var(--space-6);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        flex-grow: 1;
      }

      .event-meta {
        display: flex;
        flex-direction: column;
        gap: var(--space-1);
        margin-bottom: var(--space-4);
        font-size: var(--fs-xs);
        color: var(--color-text-muted);
        font-weight: 500;
      }

      @media (min-width: 480px) {
        .event-meta {
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
        }
      }

      .event-date-badge, .event-location {
        display: inline-flex;
        align-items: center;
        gap: var(--space-1);
      }

      .event-title-text {
        font-size: var(--fs-md);
        line-height: var(--lh-snug);
        margin-bottom: var(--space-3);
        color: var(--color-primary);
        font-weight: 700;
      }

      .event-description-text {
        font-size: var(--fs-sm);
        margin-bottom: var(--space-6);
        flex-grow: 1;
      }

      .event-actions-flex {
        display: flex;
        gap: var(--space-2);
        width: 100%;
      }

      .event-actions-flex .btn {
        padding: 0.5rem 1rem;
        font-size: var(--fs-xs);
        flex: 1;
      }
    `;
    document.head.appendChild(style);
  }
}

customElements.define('event-card', EventCard);
