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

    // Esconde os controles inicialmente
    playBtn.style.display = "none";
    pauseBtn.style.display = "none";

    // Quando clicar em "Começar"
    startButton.addEventListener("click", () => {
        startScreen.style.display = "none";

        audio.play().then(() => {
            pauseBtn.style.display = "inline-block";
        }).catch((err) => {
            console.log("Erro ao tocar áudio:", err);
        });

        audio.volume = 0.5;
        audio.loop = true;

        // Inicia slideshow automático
        setInterval(() => {
            nextSlide();
        }, 5000);

        showSlide(slideIndex);
    });

    // Swipe
    const slideshow = document.querySelector(".slideshow-container");
    slideshow.addEventListener("touchstart", handleTouchStart, false);
    slideshow.addEventListener("touchend", handleTouchEnd, false);

    // Botões manuais (caso precise ainda)
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

function showSlide(index) {
    let slides = document.querySelectorAll(".slide");

    if (index >= slides.length) slideIndex = 0;
    if (index < 0) slideIndex = slides.length - 1;

    slides.forEach(slide => slide.style.display = "none");
    slides[slideIndex].style.display = "block";
    document.getElementById("caption-text").innerText = captions[slideIndex];
}

function nextSlide() {
    slideIndex = (slideIndex + 1) % document.querySelectorAll(".slide").length;
    showSlide(slideIndex);
}

function prevSlide() {
    slideIndex = (slideIndex - 1 + document.querySelectorAll(".slide").length) % document.querySelectorAll(".slide").length;
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
