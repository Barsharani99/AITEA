'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export default function ClientInit() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleGlobalClick = (e) => {
      const anchor = e.target.closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href) return;

      // Ignore external domains, hash tags, email links, tel, and keyboard modifiers (Cmd/Ctrl click)
      if (
        href.startsWith('http') ||
        href.startsWith('//') ||
        href.startsWith('#') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      ) {
        return;
      }

      // Convert relative HTML links (e.g. ./about.html) to clean Next.js paths (e.g. /about)
      let cleanPath = href;
      if (cleanPath.startsWith('./')) {
        cleanPath = '/' + cleanPath.slice(2);
      }
      if (cleanPath.endsWith('.html')) {
        cleanPath = cleanPath.slice(0, -5);
      }
      if (cleanPath === '/index' || cleanPath === 'index') {
        cleanPath = '/';
      }
      if (!cleanPath.startsWith('/')) {
        cleanPath = '/' + cleanPath;
      }

      e.preventDefault();
      router.push(cleanPath);
    };

    document.addEventListener('click', handleGlobalClick);
    return () => {
      document.removeEventListener('click', handleGlobalClick);
    };
  }, [router]);

  useEffect(() => {
    // Expose inline HTML handlers globally on window context to enable inline event attributes (e.g. onclick, onsubmit)
    window.toggleFaq = function(btn) {
      const answer = btn.nextElementSibling;
      const icon = btn.querySelector('.faq-toggle-icon');
      const isShow = answer.classList.toggle('show');
      icon.textContent = isShow ? '−' : '+';
    };

    window.switchTab = function(tab) {
      const btns = document.querySelectorAll('.tab-btn');
      btns.forEach(btn => btn.classList.remove('active'));
      const contents = document.querySelectorAll('.event-tab-content');
      contents.forEach(content => content.classList.remove('active'));

      if (tab === 'upcoming') {
        const btn = document.querySelector('button[onclick="switchTab(\'upcoming\')"]');
        if (btn) btn.classList.add('active');
        const tabEl = document.getElementById('upcoming-events-tab');
        if (tabEl) tabEl.classList.add('active');
      } else {
        const btn = document.querySelector('button[onclick="switchTab(\'past\')"]');
        if (btn) btn.classList.add('active');
        const tabEl = document.getElementById('past-events-tab');
        if (tabEl) tabEl.classList.add('active');
      }
    };

    window.handleContactSubmit = function(e) {
      e.preventDefault();
      const success = document.getElementById('form-success');
      if (success) {
        success.style.display = 'block';
        success.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(() => {
          success.style.display = 'none';
        }, 6000);
      }
      const formEl = document.getElementById('contact-form-el');
      if (formEl) formEl.reset();
    };

    // Dynamically import the main scripts (registers Web Components and initializes i18n)
    import('../src/main.js').then(() => {
      // Execute initial page translation
      if (window.aitea_i18n && typeof window.aitea_i18n.translatePage === 'function') {
        window.aitea_i18n.translatePage();
      }
    });
  }, []);

  useEffect(() => {
    // Whenever client-side route changes, run translation engine on the new page DOM
    if (window.aitea_i18n && typeof window.aitea_i18n.translatePage === 'function') {
      window.aitea_i18n.translatePage();
    }
  }, [pathname]);

  return null;
}
