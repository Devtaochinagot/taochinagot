// ============================================================
// TAOCHINAGOT — comportements partagés
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  // --- Lien de nav actif (auto-détection page courante) ---
  const curPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (href.includes('#')) return;
    const page = href.split('/').pop() || 'index.html';
    const match = page === curPage;
    a.classList.toggle('active', match);
    match ? a.setAttribute('aria-current', 'page') : a.removeAttribute('aria-current');
  });

  // --- Menu mobile (burger) ---
  const burger = document.querySelector('.burger');
  const mobileMenu = document.querySelector('.mobile-menu');

  const resetSubMenus = () => {
    document.querySelectorAll('.mobile-has-sub').forEach(el => {
      el.classList.remove('open');
      el.querySelector('.mobile-toggle')?.setAttribute('aria-expanded', 'false');
    });
  };

  if (burger && mobileMenu) {
    burger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      burger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      document.body.style.overflow = isOpen ? 'hidden' : '';
      if (isOpen) resetSubMenus();
    });

    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // Réinitialise le menu si Safari le restaure depuis le BFCache
  window.addEventListener('pageshow', (e) => {
    if (e.persisted) {
      resetSubMenus();
      if (mobileMenu) {
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      }
    }
  });

  // --- Accordéon sous-menus mobile ---
  document.querySelectorAll('.mobile-toggle').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const li = btn.closest('.mobile-has-sub');
      const isOpen = li.classList.contains('open');
      document.querySelectorAll('.mobile-has-sub.open').forEach(el => el.classList.remove('open'));
      if (!isOpen) li.classList.add('open');
      btn.setAttribute('aria-expanded', (!isOpen).toString());
    });
  });

  // --- FAQ accordion ---
  document.querySelectorAll('.faq-item').forEach((item) => {
    const question = item.querySelector('.faq-question');
    if (!question) return;
    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach((openItem) => {
        if (openItem !== item) openItem.classList.remove('open');
      });
      item.classList.toggle('open', !isOpen);
    });
  });

  // --- Dropdown nav (touch uniquement — desktop géré par CSS hover) ---
  document.querySelectorAll('.has-dropdown').forEach((li) => {
    li.querySelector(':scope > a').addEventListener('click', (e) => {
      if (window.innerWidth >= 1024) return; // desktop : laisser naviguer directement
      e.preventDefault();
      const isOpen = li.classList.contains('open');
      document.querySelectorAll('.has-dropdown.open').forEach(el => el.classList.remove('open'));
      if (!isOpen) li.classList.add('open');
    });
  });
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.has-dropdown')) {
      document.querySelectorAll('.has-dropdown.open').forEach(el => el.classList.remove('open'));
    }
  });

  // --- Overlays au tap (mobile/tablette tactile) ---
  // Premier tap = révèle l'overlay ; deuxième tap = navigue (si lien)
  const overlayCards = document.querySelectorAll('.discipline-card--photo, .dojo-card');
  if (overlayCards.length) {
    overlayCards.forEach(card => {
      card.addEventListener('click', function(e) {
        if (window.innerWidth >= 1024) return; // desktop : géré par CSS hover
        if (!this.classList.contains('is-active')) {
          e.preventDefault();
          overlayCards.forEach(c => c.classList.remove('is-active'));
          this.classList.add('is-active');
        }
        // deuxième tap : laisser naviguer normalement
      });
    });
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.discipline-card--photo, .dojo-card')) {
        overlayCards.forEach(c => c.classList.remove('is-active'));
      }
    });
  }

  // --- Header smart (ombre + masquage au scroll bas) + bouton retour en haut ---
  const header = document.querySelector('.site-header');
  if (header) {
    const btt = document.createElement('button');
    btt.className = 'back-to-top';
    btt.setAttribute('aria-label', 'Retour en haut');
    btt.innerHTML = '<svg viewBox="0 0 24 24"><polyline points="18 15 12 9 6 15"/></svg>';
    document.body.appendChild(btt);
    btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    let lastY = 0;
    const onScroll = () => {
      const y = window.scrollY;
      header.style.boxShadow = y > 8 ? '0 6px 18px rgba(0,0,0,0.25)' : 'none';
      if (y > 80) {
        header.classList.toggle('header-hidden', y > lastY);
      } else {
        header.classList.remove('header-hidden');
      }
      lastY = y;
      btt.classList.toggle('visible', y > 400);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // --- Formulaire contact : envoi via client mail (en attendant Formspree) ---
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    const dojoLabels = {
      sene: 'Séné — Complexe sportif Le Derf',
      surzur: 'Surzur — Salle omnisport',
      plaudren: 'Plaudren — Salle Ty An Holl',
    };
    const disciplineLabels = {
      sanda: 'Sanda — Boxe chinoise',
      taolu: 'Taolu — Formes',
      'les-deux': 'Les deux',
    };
    const publicLabels = {
      enfant: 'Enfant (moins de 14 ans)',
      ado: 'Adolescent (14–17 ans)',
      adulte: 'Adulte (18 ans et +)',
    };

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(contactForm);
      const nom = String(data.get('nom') || '').trim();
      const email = String(data.get('email') || '').trim();
      const message = String(data.get('message') || '').trim();
      const dojo = dojoLabels[data.get('dojo')] || 'Non précisé';
      const discipline = disciplineLabels[data.get('discipline')] || 'Non précisé';
      const publicCible = publicLabels[data.get('public')] || 'Non précisé';

      const subject = `Contact Taochinagot — ${nom}`;
      const body = [
        `Nom : ${nom}`,
        `E-mail : ${email}`,
        `Dojo souhaité : ${dojo}`,
        `Discipline : ${discipline}`,
        `Public : ${publicCible}`,
        '',
        message,
      ].join('\n');

      window.location.href = `mailto:contact@taochinagot.fr?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
  }

  // --- Parallax hero (desktop uniquement) ---
  const heroBgTao = document.querySelector('.hero-bg-tao');
  const heroBgSanda = document.querySelector('.hero-bg-sanda');
  if (heroBgTao && heroBgSanda && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const heroEl = heroBgTao.closest('.hero');
    window.addEventListener('scroll', () => {
      if (window.innerWidth < 768) return;
      const rect = heroEl.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      const off = (-rect.top * 0.15).toFixed(1);
      heroBgTao.style.backgroundPositionY  = `calc(30% + ${off}px)`;
      heroBgSanda.style.backgroundPositionY = `calc(40% + ${off}px)`;
    }, { passive: true });
  }

  // --- Timeline : ligne qui se dessine au scroll ---
  const timeline = document.querySelector('.timeline');
  if (timeline && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    new IntersectionObserver((entries, obs) => {
      if (entries[0].isIntersecting) {
        timeline.classList.add('line-visible');
        obs.disconnect();
      }
    }, { threshold: 0.08 }).observe(timeline);
  }

  // --- CTA sticky mobile (hors page contact) ---
  if (!location.pathname.includes('contact')) {
    const isSubpage = location.pathname.includes('/pages/');
    const cta = document.createElement('a');
    cta.href = isSubpage ? 'contact.html#formulaire' : 'pages/contact.html#formulaire';
    cta.className = 'cta-sticky-mobile';
    cta.textContent = '1er cours offert — Essayer gratuitement →';
    document.body.appendChild(cta);
    setTimeout(() => cta.classList.add('visible'), 2500);
  }

  // --- Filtre par année — competition.html ---
  const yearGroups = document.querySelectorAll('.competition-year-group');
  if (yearGroups.length) {
    const years = [...yearGroups].map(g => g.id);
    const bar = document.createElement('div');
    bar.className = 'year-filter';
    const allBtn = document.createElement('button');
    allBtn.className = 'year-btn active';
    allBtn.dataset.year = 'all';
    allBtn.textContent = 'Toutes';
    bar.appendChild(allBtn);
    years.forEach(y => {
      const btn = document.createElement('button');
      btn.className = 'year-btn';
      btn.dataset.year = y;
      btn.textContent = y;
      bar.appendChild(btn);
    });
    yearGroups[0].parentNode.insertBefore(bar, yearGroups[0]);
    bar.addEventListener('click', e => {
      const btn = e.target.closest('.year-btn');
      if (!btn) return;
      bar.querySelectorAll('.year-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const year = btn.dataset.year;
      yearGroups.forEach(g => { g.hidden = year !== 'all' && g.id !== year; });
    });
  }

  // --- Scroll reveal (fade-up au scroll) ---
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const revealObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        e.target.classList.add('visible');
        revealObs.unobserve(e.target);
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -32px 0px' });

    // Ajoute .reveal aux éléments cibles, avec décalage pour les grilles
    const GRIDS = '.card-grid, .dojo-grid, .competition-athletes, .coach-grid, .evenements-list';
    document.querySelectorAll(GRIDS).forEach(grid => {
      Array.from(grid.children).forEach((child, i) => {
        child.style.setProperty('--reveal-delay', Math.min(i * 0.09, 0.36) + 's');
      });
    });

    const TARGETS = [
      '.section-head', '.discipline-card', '.dojo-card', '.profile-card',
      '.faq-item', '.timeline-item', '.competition-event',
      '.competition-athlete-card', '.video-link-card', '.evenement-card',
    ].join(',');

    document.querySelectorAll(TARGETS).forEach(el => {
      el.classList.add('reveal');
      revealObs.observe(el);
    });
  }

  // --- Compteurs animés sur les stat-number ---
  const easeOutCubic = t => 1 - Math.pow(1 - t, 3);

  const counterObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      counterObs.unobserve(e.target);
      const el = e.target;
      const text = el.textContent.trim();
      const match = text.match(/(\d+)/);
      if (!match) return;
      const target = parseInt(match[1], 10);
      const pre = text.slice(0, match.index);
      const suf = text.slice(match.index + match[0].length);
      const duration = 1300;
      const t0 = performance.now();
      (function tick(now) {
        const p = Math.min((now - t0) / duration, 1);
        el.textContent = pre + Math.round(easeOutCubic(p) * target) + suf;
        if (p < 1) requestAnimationFrame(tick);
      })(t0);
    });
  }, { threshold: 0.7 });

  document.querySelectorAll('.stat-number').forEach(el => counterObs.observe(el));

  // --- Lightbox photos compétition ---
  const lbImgs = document.querySelectorAll('.competition-athlete-card img');
  if (lbImgs.length) {
    const lb = document.createElement('div');
    lb.id = 'lightbox';
    lb.setAttribute('role', 'dialog');
    lb.setAttribute('aria-modal', 'true');
    lb.setAttribute('aria-label', 'Photo en grand');
    lb.innerHTML =
      '<button class="lb-close" aria-label="Fermer">&times;</button>' +
      '<button class="lb-prev" aria-label="Photo précédente">&#8249;</button>' +
      '<img class="lb-img" src="" alt="">' +
      '<p class="lb-caption"></p>' +
      '<button class="lb-next" aria-label="Photo suivante">&#8250;</button>';
    document.body.appendChild(lb);

    const lbImg = lb.querySelector('.lb-img');
    const lbCap = lb.querySelector('.lb-caption');
    const list = Array.from(lbImgs);
    let cur = 0;

    function lbOpen(idx) {
      cur = (idx + list.length) % list.length;
      lbImg.src = list[cur].src;
      lbImg.alt = list[cur].alt;
      lbCap.textContent = list[cur].alt;
      lb.classList.add('open');
      document.body.style.overflow = 'hidden';
      lb.querySelector('.lb-close').focus();
    }
    function lbClose() {
      lb.classList.remove('open');
      document.body.style.overflow = '';
      list[cur].closest('.competition-athlete-card')?.focus();
    }

    list.forEach((img, i) => {
      img.tabIndex = 0;
      img.addEventListener('click', () => lbOpen(i));
      img.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); lbOpen(i); }
      });
    });

    lb.querySelector('.lb-close').addEventListener('click', lbClose);
    lb.querySelector('.lb-prev').addEventListener('click', () => lbOpen(cur - 1));
    lb.querySelector('.lb-next').addEventListener('click', () => lbOpen(cur + 1));
    lb.addEventListener('click', e => { if (e.target === lb) lbClose(); });
    lb.addEventListener('keydown', e => {
      if (e.key === 'Escape') lbClose();
      if (e.key === 'ArrowLeft') lbOpen(cur - 1);
      if (e.key === 'ArrowRight') lbOpen(cur + 1);
    });

    // Swipe tactile
    let swipeX = 0;
    lb.addEventListener('touchstart', e => { swipeX = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend', e => {
      const diff = swipeX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 48) diff > 0 ? lbOpen(cur + 1) : lbOpen(cur - 1);
    }, { passive: true });
  }
});
