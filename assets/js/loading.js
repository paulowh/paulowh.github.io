// Animação FLIP (First, Last, Invert, Play)
document.addEventListener('DOMContentLoaded', function () {
  const preloader = document.querySelector('.preloader');
  const postloader = document.querySelector('.postloader');
  const gridTemplate = document.querySelector('.grid-template');
  const gridImg = document.querySelector('.grid-img');

  postloader.style.display = 'none';

  setTimeout(() => {
    const targetRect = gridImg.getBoundingClientRect();

    preloader.style.top = targetRect.top + 'px';
    preloader.style.left = targetRect.left + 'px';
    preloader.style.width = targetRect.width + 'px';
    preloader.style.height = targetRect.height + 'px';
    preloader.style.transform = 'none';

    setTimeout(() => {
      preloader.style.opacity = '0';
      preloader.style.pointerEvents = 'none';
      postloader.style.display = 'block';
      postloader.classList.add('visible');
      gridTemplate.classList.add('loaded');
    }, 1200); // (deve coincidir com o CSS)
  }, 150);
});
