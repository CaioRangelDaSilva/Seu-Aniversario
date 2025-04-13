let slideIndex = 0;
let startX = 0;

let captions = [
    "O amor é a poesia dos sentidos.",
    "Entre cada batida do coração, há uma história de amor.",
    "Nosso amor é uma história que nunca acaba.",
    "Você é a razão do meu sorriso.",
    "Cada dia ao seu lado é um presente.",
    "Você é o meu sonho realizado.",
    "A vida é melhor com você ao meu lado.",
    "Você é a luz que ilumina meu caminho.",
    "Seu sorriso é a minha felicidade.",
    "Você é a razão pela qual eu acredito no amor.",
    "A cada dia que passa, eu te amo mais.",
    "Você é a minha melhor parte."
];

document.addEventListener("DOMContentLoaded", function () {
    const audio = document.getElementById("background-music");
    const playBtn = document.getElementById("play-button");
    const pauseBtn = document.getElementById("pause-button");

    
    playBtn.style.display = "inline-block"; // Exibe o botão de play
    audio.play(); // Toca a música automaticamente
    audio.volume = 0.5; // Define o volume da música (0.0 a 1.0)
    audio.loop = true; // Repetir a música

    // Tocar música
    playBtn.addEventListener("click", () => {
        audio.play();
        playBtn.style.display = "none";
        pauseBtn.style.display = "inline-block";
    });

    // Pausar música
    pauseBtn.addEventListener("click", () => {
        audio.pause();
        pauseBtn.style.display = "none";
        playBtn.style.display = "inline-block";
    });

    // Mostra o primeiro slide
    showSlide(slideIndex);

    // Eventos de swipe
    const slideshow = document.querySelector(".slideshow-container");
    slideshow.addEventListener("touchstart", handleTouchStart, false);
    slideshow.addEventListener("touchend", handleTouchEnd, false);
});

function showSlide(index) {
    let slides = document.querySelectorAll(".slide");

    if (index >= slides.length) slideIndex = 0;
    if (index < 0) slideIndex = slides.length - 1;

    slides.forEach(slide => slide.style.display = "none");
    slides[slideIndex].style.display = "block";
    document.getElementById("caption-text").innerText = captions[slideIndex];
}

function nextSlide() {
    slideIndex++;
    showSlide(slideIndex);
}

function prevSlide() {
    slideIndex--;
    showSlide(slideIndex);
}

// Swipe detection
function handleTouchStart(e) {
    startX = e.touches[0].clientX;
}

function handleTouchEnd(e) {
    let endX = e.changedTouches[0].clientX;
    let diffX = startX - endX;

    if (Math.abs(diffX) > 50) {
        if (diffX > 0) {
            nextSlide();
        } else {
            prevSlide();
        }
    }
}
