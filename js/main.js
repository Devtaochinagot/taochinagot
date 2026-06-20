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
      if (window.innerWidth >= 980) return; // desktop : laisser naviguer directement
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
});
