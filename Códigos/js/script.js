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