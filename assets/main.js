/* main.js — Cloudforce Blog */
(function () {
  'use strict';

  /* ── Mobile nav toggle ── */
  const toggle = document.getElementById('nav-toggle');
  const nav    = document.getElementById('site-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      const open = nav.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', open);
    });
  }

  /* ── Mobile: tap on "Topics" opens dropdown ── */
  document.querySelectorAll('.has-dropdown > .nav-link').forEach(function (link) {
    link.addEventListener('click', function (e) {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        const dropdown = link.nextElementSibling;
        if (dropdown) dropdown.classList.toggle('mobile-open');
      }
    });
  });

  /* ── Close nav on outside click ── */
  document.addEventListener('click', function (e) {
    if (nav && toggle && !nav.contains(e.target) && !toggle.contains(e.target)) {
      nav.classList.remove('nav-open');
      toggle.setAttribute('aria-expanded', false);
    }
  });

  /* ── Sticky header shadow on scroll ── */
  const header = document.getElementById('site-header');
  if (header) {
    window.addEventListener('scroll', function () {
      header.style.boxShadow = window.scrollY > 8
        ? '0 2px 24px rgba(0,0,0,0.38)'
        : '0 2px 16px rgba(0,0,0,0.25)';
    }, { passive: true });
  }

  /* ── Active TOC on article page ── */
  const tocLinks = document.querySelectorAll('.toc-list a');
  if (tocLinks.length) {
    const headings = [];
    tocLinks.forEach(function (a) {
      const id = a.getAttribute('href').replace('#', '');
      const el = document.getElementById(id);
      if (el) headings.push({ el, a });
    });

    const onScroll = function () {
      let current = null;
      headings.forEach(function ({ el }) {
        if (el.getBoundingClientRect().top < 120) current = el.id;
      });
      headings.forEach(function ({ el, a }) {
        a.classList.toggle('toc-active', el.id === current);
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ── Newsletter form (placeholder) ── */
  document.querySelectorAll('.newsletter-form').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const input = form.querySelector('.email-input');
      const btn   = form.querySelector('button[type=submit]');
      if (!input.value) return;
      btn.textContent = 'Subscribed ✓';
      btn.disabled = true;
      btn.style.background = '#1B9E5F';
      input.value = '';
    });
  });

})();
