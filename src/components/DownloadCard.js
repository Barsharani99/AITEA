class DownloadCard extends HTMLElement {
  connectedCallback() {
    const titleKey = this.getAttribute('title-key') || '';
    const descKey = this.getAttribute('desc-key') || '';
    const file = this.getAttribute('file') || '#';
    const image = this.getAttribute('image') || '';

    const visualHtml = image 
      ? `<div class="download-image-container">
           <img src="${image}" alt="Document visual" class="download-card-img-visual" loading="lazy" decoding="async">
         </div>`
      : `<div class="download-icon-container">
           <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--color-secondary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="file-icon"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
         </div>`;

    this.innerHTML = `
      <div class="card download-card-el">
        ${visualHtml}
        <div class="download-content">
          <h3 class="download-title-text" data-i18n="${titleKey}"></h3>
          <p class="download-description-text" data-i18n="${descKey}"></p>
          <div class="download-info-flex">
            <span class="badge badge-primary" data-i18n="downloads.file_size">Size: 1.8 MB</span>
            <a href="${file}" class="btn btn-outline btn-sm download-trigger-btn" download>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              <span data-i18n="downloads.download_btn">Download</span>
            </a>
          </div>
        </div>
      </div>
    `;

    this.injectStyles();
  }

  injectStyles() {
    if (document.getElementById('downloadcard-component-styles')) return;

    const style = document.createElement('style');
    style.id = 'downloadcard-component-styles';
    style.textContent = `
      .download-card-el {
        display: flex;
        gap: var(--space-4);
        align-items: flex-start;
      }

      .download-icon-container {
        background-color: rgba(217, 169, 78, 0.08);
        border-radius: var(--radius-md);
        padding: var(--space-3);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }

      .download-image-container {
        width: 70px;
        height: 90px;
        border-radius: var(--radius-sm);
        overflow: hidden;
        box-shadow: var(--shadow-md);
        border: 1px solid var(--color-border);
        flex-shrink: 0;
        transition: transform var(--transition-fast);
      }

      .download-card-el:hover .download-image-container {
        transform: translateY(-2px);
      }

      .download-card-img-visual {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .download-content {
        flex-grow: 1;
      }

      .download-title-text {
        font-size: var(--fs-md);
        line-height: var(--lh-snug);
        margin-bottom: var(--space-2);
        color: var(--color-primary);
        font-weight: 700;
      }

      .download-description-text {
        font-size: var(--fs-sm);
        margin-bottom: var(--space-4);
      }

      .download-info-flex {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--space-4);
        flex-wrap: wrap;
      }

      .download-trigger-btn {
        padding: 0.4rem 0.8rem !important;
        font-size: var(--fs-xs) !important;
        display: inline-flex;
        align-items: center;
        gap: var(--space-2);
      }
    `;
    document.head.appendChild(style);
  }
}

customElements.define('download-card', DownloadCard);
