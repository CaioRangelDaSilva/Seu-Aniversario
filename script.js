let slideIndex = 0;
let startX = 0;

const captions = [];

document.addEventListener("DOMContentLoaded", function () {
    const audio = document.getElementById("background-music");
    const playBtn = document.getElementById("play-button");
    const pauseBtn = document.getElementById("pause-button");
    const startScreen = document.getElementById("start-screen");
    const startButton = document.getElementById("start-button");

    playBtn.style.display = "none";
    pauseBtn.style.display = "none";

    // Ação ao clicar em "Iniciar"
    startButton.addEventListener("click", () => {
        startScreen.style.display = "none";

        // Inicia a música
        audio.play().then(() => {
            pauseBtn.style.display = "inline-block";
        }).catch(err => {
            console.warn("Erro ao tocar música:", err);
        });

        audio.volume = 0.5;
        audio.loop = true;

        // Mostra o primeiro slide e inicia o slideshow automático
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

// Mostra um slide por vez
function showSlide(index) {
    let slides = document.querySelectorAll(".slide");

    if (index >= slides.length) slideIndex = 0;
    if (index < 0) slideIndex = slides.length - 1;

    slides.forEach(slide => {
        slide.style.display = "none";
    });

    slides[slideIndex].style.display = "block";

    const captionText = document.getElementById("caption-text");
    captionText.innerText = captions[slideIndex] || "";
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
