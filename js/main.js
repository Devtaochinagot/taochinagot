// ============================================================
// TAOCHINAGOT — comportements partagés
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  // --- Menu mobile (burger) ---
  const burger = document.querySelector('.burger');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (burger && mobileMenu) {
    burger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      burger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

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

  // --- Header : ombre légère au scroll (subtil) ---
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => {
      header.style.boxShadow = window.scrollY > 8
        ? '0 6px 18px rgba(0,0,0,0.25)'
        : 'none';
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
});
