const totalRetratos = 9;
const numeroAleatorio = Math.floor(Math.random() * totalRetratos) + 1;
const imagemSorteada = `./assets/img/retrato-${numeroAleatorio}.JPEG`;
const temaSorteado = `retrato-${numeroAleatorio}`;

document.documentElement.setAttribute('data-theme', temaSorteado);


document.addEventListener('DOMContentLoaded', () => {
  const preloaderImg = document.querySelector('.preloader img');
  if (preloaderImg) {
    preloaderImg.src = imagemSorteada;
  }

  const postloaderImg = document.querySelector('.postloader img');
  if (postloaderImg) {
    postloaderImg.src = imagemSorteada;
  }

  console.log(`Retrato sorteado: ${temaSorteado}`);
});
