let slideIndex = 0;
let startX = 0;

let captions = [
    "O amor é a poesia dos sentidos.",
    "Entre cada batida do coração, há uma história de amor.",
    "Nosso amor é uma história que nunca acaba."
];

document.addEventListener("DOMContentLoaded", function () {
    const audio = document.getElementById("background-music");
    const playBtn = document.getElementById("play-button");

    // Botão manual para tocar música
    playBtn.addEventListener("click", () => {
        audio.play();
        playBtn.style.display = "none";
    });

    // Toca música automaticamente após o primeiro clique em qualquer lugar
    const startMusic = () => {
        audio.play().then(() => {
            playBtn.style.display = "none";
        }).catch((e) => {
            console.log("Autoplay bloqueado:", e);
        });
        document.removeEventListener("click", startMusic);
    };
    document.addEventListener("click", startMusic);

    showSlide(slideIndex); // Mostra o primeiro slide

    // Eventos de swipe na tela
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
            nextSlide(); // Swipe para esquerda
        } else {
            prevSlide(); // Swipe para direita
        }
    }
}
