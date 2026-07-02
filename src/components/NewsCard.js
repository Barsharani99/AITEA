class NewsCard extends HTMLElement {
  connectedCallback() {
    const titleKey = this.getAttribute('title-key') || '';
    const dateKey = this.getAttribute('date-key') || '';
    const descKey = this.getAttribute('desc-key') || '';
    const link = this.getAttribute('link') || '/news.html';
    const image = this.getAttribute('image') || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=500&q=70&fm=webp';

    this.innerHTML = `
      <div class="card news-card-el">
        <div class="news-img-container">
          <img src="${image}" alt="News visual" class="news-card-img" loading="lazy" decoding="async">
        </div>
        <div class="news-content-body">
          <div>
            <div class="news-meta">
              <span class="badge badge-primary" data-i18n="nav.news">News</span>
              <span class="news-date" data-i18n="${dateKey}"></span>
            </div>
            <h3 class="news-title-text" data-i18n="${titleKey}"></h3>
            <p class="news-description-text" data-i18n="${descKey}"></p>
          </div>
          <a href="${link}" class="news-read-more-link">
            <span data-i18n="news.read_more">Read Article</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="arrow-icon"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </a>
        </div>
      </div>
    `;

    this.injectStyles();
  }

  injectStyles() {
    if (document.getElementById('newscard-component-styles')) return;

    const style = document.createElement('style');
    style.id = 'newscard-component-styles';
    style.textContent = `
      .news-card-el {
        display: flex;
        flex-direction: column;
        height: 100%;
        justify-content: space-between;
        padding: 0 !important;
        overflow: hidden;
      }

      .news-img-container {
        height: 160px;
        width: 100%;
        overflow: hidden;
        position: relative;
        background: linear-gradient(135deg, var(--color-primary), var(--color-primary-light));
      }

      .news-card-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform var(--transition-normal);
      }

      .news-card-el:hover .news-card-img {
        transform: scale(1.05);
      }

      .news-content-body {
        padding: var(--space-6);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        flex-grow: 1;
      }

      .news-meta {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: var(--space-4);
      }

      .news-date {
        font-size: var(--fs-xs);
        color: var(--color-text-muted);
        font-weight: 500;
      }

      .news-title-text {
        font-size: var(--fs-md);
        line-height: var(--lh-snug);
        margin-bottom: var(--space-3);
        color: var(--color-primary);
        font-weight: 700;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      .news-description-text {
        font-size: var(--fs-sm);
        margin-bottom: var(--space-6);
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        flex-grow: 1;
      }

      .news-read-more-link {
        font-family: var(--font-heading);
        font-size: var(--fs-xs);
        font-weight: 700;
        color: var(--color-secondary);
        display: inline-flex;
        align-items: center;
        gap: var(--space-1);
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .news-read-more-link:hover {
        color: var(--color-secondary-light);
      }

      .arrow-icon {
        transition: transform var(--transition-fast);
      }

      .news-read-more-link:hover .arrow-icon {
        transform: translateX(3px);
      }
    `;
    document.head.appendChild(style);
  }
}

customElements.define('news-card', NewsCard);
