// Marca que o JS carregou — o CSS só esconde os elementos .reveal quando
// essa classe existe no <html>. Se o script for bloqueado, o conteúdo
// permanece visível e a experiência não quebra.
document.documentElement.classList.add('js');

const toggleButton = document.getElementById('navbar-toggle');
const nav = document.getElementById('navbar-nav');
const navbar = document.querySelector('.navbar');
const navLinks = Array.from(nav?.querySelectorAll('.navbar__link') ?? []);
const sections = Array.from(document.querySelectorAll('main section[id]'));
const faqItems = Array.from(document.querySelectorAll('.faq__item'));
const scrollCue = document.querySelector('.hero__scroll-cue');

const closeMobileNav = () => {
  nav?.classList.remove('is-open');
  toggleButton?.classList.remove('is-active');
  toggleButton?.setAttribute('aria-expanded', 'false');
};

const updateActiveNavLink = (sectionId) => {
  navLinks.forEach((link) => {
    const isActive = link.getAttribute('href') === `#${sectionId}`;
    link.classList.toggle('is-active', isActive);
    if (isActive) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });
};

const handleNavbarScroll = () => {
  navbar?.classList.toggle('is-scrolled', window.scrollY > 8);
  if (!scrollCue) return;

  const isScrolled = window.scrollY > 32;
  scrollCue.style.opacity = isScrolled ? '0' : '1';
  scrollCue.style.pointerEvents = isScrolled ? 'none' : 'auto';
};

if (toggleButton) {
  toggleButton.addEventListener('click', () => {
    const isOpen = nav?.classList.toggle('is-open');
    toggleButton.classList.toggle('is-active', Boolean(isOpen));
    toggleButton.setAttribute('aria-expanded', String(Boolean(isOpen)));
  });
}

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    const sectionId = link.getAttribute('href')?.slice(1);
    if (sectionId) {
      updateActiveNavLink(sectionId);
    }
    closeMobileNav();
  });
});

window.addEventListener('scroll', handleNavbarScroll, { passive: true });
handleNavbarScroll();

faqItems.forEach((item) => {
  const question = item.querySelector('.faq__question');
  if (!question) return;

  question.addEventListener('click', () => {
    const isOpen = item.classList.toggle('is-open');

    faqItems.forEach((otherItem) => {
      if (otherItem === item) return;
      otherItem.classList.remove('is-open');
      otherItem.querySelector('.faq__question')?.setAttribute('aria-expanded', 'false');
    });

    question.setAttribute('aria-expanded', String(isOpen));
  });
});

const revealEls = Array.from(document.querySelectorAll('.reveal'));

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  revealEls.forEach((el) => revealObserver.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add('is-visible'));
}

if ('IntersectionObserver' in window && sections.length > 0) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          updateActiveNavLink(entry.target.id);
        }
      });
    },
    {
      threshold: 0.3,
      rootMargin: '-35% 0px -55% 0px',
    }
  );

  sections.forEach((section) => sectionObserver.observe(section));
}
