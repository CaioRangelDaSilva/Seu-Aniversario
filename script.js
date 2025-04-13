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

    // Oculta controles inicialmente
    playBtn.style.display = "none";
    pauseBtn.style.display = "none";

    // Começa o slideshow automático
    showSlide(slideIndex);
    setInterval(() => {
        nextSlide();
    }, 5000);

    // Primeira interação do usuário toca a música
    const tryPlay = () => {
        audio.play().then(() => {
            pauseBtn.style.display = "inline-block";
        }).catch(() => {
            // Se ainda não puder tocar, ignora
        });
        document.removeEventListener("click", tryPlay);
        document.removeEventListener("touchstart", tryPlay);
    };

    document.addEventListener("click", tryPlay);
    document.addEventListener("touchstart", tryPlay);

    audio.volume = 0.5;
    audio.loop = true;

    // Swipe
    const slideshow = document.querySelector(".slideshow-container");
    slideshow.addEventListener("touchstart", handleTouchStart, false);
    slideshow.addEventListener("touchend", handleTouchEnd, false);

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
