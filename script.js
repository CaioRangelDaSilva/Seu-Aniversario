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

    playBtn.style.display = "inline-block";
    
    // Tentativa de autoplay
    const playPromise = audio.play();

    if (playPromise !== undefined) {
        playPromise.then(() => {
            playBtn.style.display = "none";
            pauseBtn.style.display = "inline-block";
        }).catch(error => {
            console.log("Autoplay bloqueado, aguardando interação do usuário");
        });
    }

    audio.volume = 0.5;
    audio.loop = true;
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

    setInterval(() => {
        nextSlide();
    }, 1000); // Troca de slide a cada 5 segundos
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
