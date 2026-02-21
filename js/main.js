/* Cloudforce Blog — Main JS */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Mobile hamburger ───────────────────────────────── */
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      const open = mobileNav.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', open);
      hamburger.querySelectorAll('span').forEach((s, i) => {
        if (open) {
          if (i === 0) s.style.transform = 'rotate(45deg) translate(5px,5px)';
          if (i === 1) s.style.opacity = '0';
          if (i === 2) s.style.transform = 'rotate(-45deg) translate(5px,-5px)';
        } else {
          s.style.transform = '';
          s.style.opacity = '';
        }
      });
    });
    // Close on outside click
    document.addEventListener('click', e => {
      if (!hamburger.contains(e.target) && !mobileNav.contains(e.target)) {
        mobileNav.classList.remove('open');
        hamburger.setAttribute('aria-expanded', false);
        hamburger.querySelectorAll('span').forEach(s => {
          s.style.transform = ''; s.style.opacity = '';
        });
      }
    });
  }

  /* ── Search overlay ─────────────────────────────────── */
  const searchBtns = document.querySelectorAll('[data-search-open]');
  const searchOverlay = document.querySelector('.search-overlay');
  const searchClose = document.querySelector('.search-close');
  const searchInput = document.querySelector('.search-input');

  function openSearch() {
    if (!searchOverlay) return;
    searchOverlay.classList.add('open');
    setTimeout(() => searchInput && searchInput.focus(), 100);
  }
  function closeSearch() {
    if (!searchOverlay) return;
    searchOverlay.classList.remove('open');
  }

  searchBtns.forEach(btn => btn.addEventListener('click', openSearch));
  if (searchClose) searchClose.addEventListener('click', closeSearch);
  if (searchOverlay) {
    searchOverlay.addEventListener('click', e => {
      if (e.target === searchOverlay) closeSearch();
    });
  }
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeSearch();
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault(); openSearch();
    }
  });

  /* ── Reading progress bar ───────────────────────────── */
  const progressBar = document.querySelector('.reading-progress');
  if (progressBar) {
    const update = () => {
      const el = document.documentElement;
      const pct = (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100;
      progressBar.style.width = Math.min(pct, 100) + '%';
    };
    window.addEventListener('scroll', update, { passive: true });
  }

  /* ── Active nav link (highlight current page) ───────── */
  const navLinks = document.querySelectorAll('.site-nav a, .mobile-nav a');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    const page = href.split('/').pop().split('?')[0];
    const current = location.pathname.split('/').pop().split('?')[0];
    if (page === current && current !== '') {
      link.classList.add('current-page');
    }
  });

  /* ── Smooth fade-up on scroll ───────────────────────── */
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animation = 'fadeUp 0.5s ease forwards';
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.article-card, .article-list-item').forEach(el => {
      el.style.opacity = '0';
      io.observe(el);
    });
  }

  /* ── Newsletter form ────────────────────────────────── */
  document.querySelectorAll('.newsletter-form').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('button');
      const input = form.querySelector('input[type="email"]');
      if (!input || !input.value.includes('@')) {
        input && input.focus();
        return;
      }
      btn.textContent = '✓ Subscribed!';
      btn.style.background = '#2E844A';
      input.value = '';
      setTimeout(() => { btn.textContent = 'Subscribe'; btn.style.background = ''; }, 3000);
    });
  });

  /* ── Copy code blocks ───────────────────────────────── */
  document.querySelectorAll('pre').forEach(pre => {
    const btn = document.createElement('button');
    btn.className = 'copy-btn';
    btn.setAttribute('aria-label', 'Copy code');
    btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> Copy`;
    btn.style.cssText = `
      position:absolute; top:0.7rem; right:0.7rem;
      background:rgba(255,255,255,0.10); border:1px solid rgba(255,255,255,0.18);
      color:rgba(255,255,255,0.65); border-radius:4px; padding:0.3em 0.65em;
      font-size:0.72rem; font-family:'Source Sans 3',sans-serif; font-weight:600;
      cursor:pointer; display:flex; align-items:center; gap:0.3em;
      transition:all 0.18s;
    `;
    pre.style.position = 'relative';
    pre.appendChild(btn);
    btn.addEventListener('click', () => {
      navigator.clipboard.writeText(pre.querySelector('code')?.textContent || pre.textContent).then(() => {
        btn.innerHTML = '✓ Copied';
        btn.style.color = '#C3E88D';
        setTimeout(() => {
          btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> Copy`;
          btn.style.color = '';
        }, 2000);
      });
    });
  });

});
