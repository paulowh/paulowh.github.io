let indexSlide = 0; // Mantém o índice atual do slide exibido

function showSlide(index) {
    const carrossel = document.querySelector(".carrossel");
    const totalSlide = document.querySelectorAll('.carrossel img').length;

    if (index >= totalSlide) {
        indexSlide = 0;
    } else if (index < 0) {
        indexSlide = totalSlide - 1;
    } else {
        indexSlide = index;
    }

    const offset = -indexSlide * 100
    console.log(offset)
    carrossel.style.transform = `translateX(${offset}%)`;
}

function prevSlide() {
    indexSlide = indexSlide - 1
    showSlide(indexSlide)
}

function nextSlide() {
    indexSlide = indexSlide + 1
    showSlide(indexSlide)
}

setInterval(() => {
    nextSlide();
}, 10000);