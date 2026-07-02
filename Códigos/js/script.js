// Marca que o JS carregou — o CSS só esconde os elementos .reveal quando
// essa classe existe no <html>. Sem isso, um script bloqueado deixaria os
// cards invisíveis pra sempre (opacity: 0 sem ninguém pra remover).
document.documentElement.classList.add('js');

// Controla a abertura/fechamento do menu mobile.
// A classe is-open faz o trabalho visual (ver style.css); aqui só alternamos o estado.
const toggleButton = document.getElementById('navbar-toggle');
const nav = document.getElementById('navbar-nav');
const navbar = document.querySelector('.navbar');
const navLinks = nav.querySelectorAll('.navbar__link');

toggleButton.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('is-open');
  toggleButton.classList.toggle('is-active', isOpen);
  toggleButton.setAttribute('aria-expanded', isOpen);
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    // marca o link clicado como ativo e fecha o menu mobile — feito num só
    // handler pra não precisar clicar duas vezes (uma pra navegar, outra
    // pra fechar o menu que ficou aberto por cima do conteúdo)
    navLinks.forEach((l) => {
      l.classList.remove('is-active');
      l.removeAttribute('aria-current');
    });
    link.classList.add('is-active');
    link.setAttribute('aria-current', 'page');

    nav.classList.remove('is-open');
    toggleButton.classList.remove('is-active');
    toggleButton.setAttribute('aria-expanded', 'false');
  });
});

// Reforça o efeito de vidro (fundo mais opaco + sombra maior) depois que a
// página sai do topo — sem isso a navbar sticky fica "flutuando" fraca
// demais sobre seções com fundo claro.
window.addEventListener(
  'scroll',
  () => {
    navbar.classList.toggle('is-scrolled', window.scrollY > 8);
  },
  { passive: true }
);

// FAQ em acordeão: um item aberto por vez. Fechar os outros ao abrir um novo
// evita que a lista cresça demais e empurre o conteúdo pra fora da tela —
// em FAQ curto isso é preferência de UX, não regra; se um dia fizer sentido
// permitir vários abertos, é só remover o forEach de fechamento.
const faqItems = document.querySelectorAll('.faq__item');

faqItems.forEach((item) => {
  const question = item.querySelector('.faq__question');

  question.addEventListener('click', () => {
    const wasOpen = item.classList.contains('is-open');

    faqItems.forEach((other) => {
      other.classList.remove('is-open');
      other.querySelector('.faq__question').setAttribute('aria-expanded', 'false');
    });

    // clicar num item já aberto só fecha ele (o loop acima já fez isso)
    if (!wasOpen) {
      item.classList.add('is-open');
      question.setAttribute('aria-expanded', 'true');
    }
  });
});

// Reveal on scroll: fade-up quando o elemento entra na viewport.
// unobserve depois de revelar — a animação é só de entrada, então não faz
// sentido continuar observando (e re-animar ao rolar pra cima ficaria chato).
// O prefers-reduced-motion do CSS zera a transição automaticamente pra quem
// desativou animações no sistema.
const revealEls = document.querySelectorAll('.reveal');

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
      threshold: 0.15, // dispara quando ~15% do card aparece — cedo o
                       // bastante pra animação não parecer atrasada
      rootMargin: '0px 0px -40px 0px', // e um respiro pra não disparar
                                       // com o card ainda colado na borda
    }
  );

  revealEls.forEach((el) => revealObserver.observe(el));
} else {
  // navegador antigo sem IntersectionObserver: mostra tudo de uma vez,
  // melhor sem animação do que com conteúdo escondido
  revealEls.forEach((el) => el.classList.add('is-visible'));
}