// Animação FLIP (First, Last, Invert, Play)
document.addEventListener('DOMContentLoaded', function () {
  const preloader = document.querySelector('.preloader');
  const postloader = document.querySelector('.postloader');
  const gridTemplate = document.querySelector('.grid-template');


  postloader.style.display = 'none';


  setTimeout(() => {

    const targetRect = document.querySelector('.grid-img').getBoundingClientRect();


    preloader.style.position = 'absolute';
    preloader.style.top = targetRect.top + 'px';
    preloader.style.left = targetRect.left + 'px';
    preloader.style.width = targetRect.width + 'px';
    preloader.style.height = targetRect.height + 'px';
    preloader.style.transform = 'none';


    setTimeout(() => {
      gridTemplate.classList.add('loaded');
    
    }, 1200); // (deve coincidir com o CSS)
  }, 150); 
});
