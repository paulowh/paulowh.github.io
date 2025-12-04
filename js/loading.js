// Animação FLIP (First, Last, Invert, Play)
document.addEventListener('DOMContentLoaded', function () {
  const preloader = document.querySelector('.preloader');
  const postloader = document.querySelector('.postloader');
  const gridTemplate = document.querySelector('.grid-template');

  // Pequeno delay para garantir que tudo carregou
  setTimeout(() => {
    // FIRST: Pega a posição inicial (centro da tela)
    const firstRect = preloader.getBoundingClientRect();

    // LAST: Pega a posição final (grid-img)
    const lastRect = postloader.getBoundingClientRect();

    // Calcula as posições exatas
    const targetX = lastRect.left;
    const targetY = lastRect.top;
    const targetWidth = lastRect.width;
    const targetHeight = lastRect.height;

    // Remove transform e usa position absolute
    preloader.style.position = 'absolute';
    preloader.style.top = targetY + 'px';
    preloader.style.left = targetX + 'px';
    preloader.style.width = targetWidth + 'px';
    preloader.style.height = targetHeight + 'px';
    preloader.style.transform = 'none';

    // Após a animação, mostra o postloader e esconde o preloader
    setTimeout(() => {
      postloader.classList.add('visible');
      preloader.classList.add('moved');

      // Inicia as animações do grid
      gridTemplate.classList.add('loaded');

      // Remove o preloader do DOM após as transições
      setTimeout(() => {
        preloader.remove();
      }, 300);
    }, 1200); // Tempo da animação (deve coincidir com o CSS)
  }, 100);
});
