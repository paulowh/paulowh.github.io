document.addEventListener('DOMContentLoaded', () => {
  const totalRetratos = 9;
  const numeroAleatorio = Math.floor(Math.random() * totalRetratos) + 1;

  const imgElement = document.querySelector('.grid-img img');

  if (imgElement) {

    imgElement.src = `./img/retrato-${numeroAleatorio}.JPEG`;

    document.body.setAttribute('data-theme', `retrato-${numeroAleatorio}`);

    console.log(`Retrato sorteado: retrato-${numeroAleatorio}`);
  }
});
