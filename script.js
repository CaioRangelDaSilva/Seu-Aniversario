let slideIndex = 0;
let startX = 0;

let captions = [
    "O amor é a poesia dos sentidos.",
    "Entre cada batida do coração, há uma história de amor.",
    "Nosso amor é uma história que nunca acaba.",

];

document.addEventListener("DOMContentLoaded", function () {
    const audio = document.getElementById("background-music");
    const playBtn = document.getElementById("play-button");
    const pauseBtn = document.getElementById("pause-button");
    const startScreen = document.getElementById("start-screen");
    const startButton = document.getElementById("start-button");

    // Esconde os controles até o clique
    playBtn.style.display = "none";
    pauseBtn.style.display = "none";

    // Ação ao clicar em "Iniciar"
    startButton.addEventListener("click", () => {
        startScreen.style.display = "none"; // Esconde a tela inicial

        // Toca a música
        audio.play().then(() => {
            pauseBtn.style.display = "inline-block";
        }).catch(err => {
            console.warn("Erro ao tocar música:", err);
        });

        audio.volume = 0.5;
        audio.loop = true;

        // Começa o slideshow automático
        showSlide(slideIndex);
        setInterval(() => {
            nextSlide();
        }, 5000);
    });

    // Swipe
    const slideshow = document.querySelector(".slideshow-container");
    slideshow.addEventListener("touchstart", handleTouchStart, false);
    slideshow.addEventListener("touchend", handleTouchEnd, false);

    // Botões play/pause
    playBtn.addEventListener("click", () => {
        audio.play();
        playBtn.style.display = "none";
        pauseBtn.style.display = "inline-block";
    });

    pauseBtn.addEventListener("click", () => {
        audio.pause();
        pauseBtn.style.display = "none";
        playBtn.style.display = "inline-block";
    });
});