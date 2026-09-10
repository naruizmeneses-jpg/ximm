const canciones = [
    { titulo: "Making Love Out Of Nothing At All", artista: "Air Supply", src: "musica/Making Love Out Of Nothing At All _ Air Supply.mp3", imagen: "img/makinglove.jpg" },
    { titulo: "Almohada", artista: "José José", src: "musica/José José - Almohada (MP3_160K).mp3", imagen: "img/almuada.jpg" },
    { titulo: "El Triste", artista: "José José", src: "musica/José José - El Triste (MP3_160K).mp3", imagen: "img/eltriste.jpg" },
    { titulo: "Es Que Te Quiero", artista: "José José", src: "musica/José José - Es Que Te Quiero (MP3_160K).mp3", imagen: "img/tequiero.jpg" },
    { titulo: "Pero Te Extraño", artista: "José José", src: "musica/José José - Pero Te Extraño (MP3_160K).mp3", imagen: "img/teextraño.jpg" },
    { titulo: "Como Te Hago Entender", artista: "Roberto Roena", src: "musica/Como Te Hago Entender Roberto Roena Letra(MP3_160K).mp3", imagen: "img/entender.jpg" },
    { titulo: "Welcome and Goodbye", artista: "Dream, Ivory", src: "musica/Dream_ Ivory - Welcome and Goodbye(MP3_160K).mp3", imagen: "img/welcome.jpg" },
    { titulo: "Fabricando Fantasía", artista: "Tito Nieves", src: "musica/Fabricando Fantasía - Tito Nieves [Letra](MP3_160K).mp3", imagen: "img/Tito_Nieves-Fabricando_Fantasias.jpg" },
    { titulo: "Un Idiota", artista: "Fuerza Regida", src: "musica/Fuerza Regida - Un Idiota(MP3_160K).mp3", imagen: "img/idiota.jpg" },
    { titulo: "Intruso", artista: "Enjambre", src: "musica/Intruso(MP3_160K).mp3", imagen: "img/intruso.jpg" },
    { titulo: "Te Juro Que Te Amo (slowed)", artista: "Los Terrícolas", src: "musica/Los Terricolas _ Te Juro Que Te Amo  s l o w e d(MP3_160K).mp3", imagen: "img/tejuroqueteamo.jpg" },
    { titulo: "Pequeñas Cosas", artista: "Willie González", src: "musica/Pequeñas Cosas(MP3_160K).mp3", imagen: "img/pequeñascosas.jpg" },
    { titulo: "Te Amo, Te Extraño (Salsa)", artista: "Guayacán Orquesta", src: "musica/Te Amo_ Te Extraño (Salsa)(MP3_160K).mp3", imagen: "img/teamoteextraño.jpg" },
];
let indiceActual = 0;
let reproduciendo = false;

const audio = document.getElementById("audio");
const tituloEl = document.getElementById("song-title");
const artistaEl = document.getElementById("song-artist");
const progressEl = document.getElementById("progress");
const btnPlay = document.getElementById("btn-play");
const btnNext = document.getElementById("btn-next");
const btnPrev = document.getElementById("btn-prev");
const playlistEl = document.getElementById("playlist");

function renderPlaylist() {
    playlistEl.innerHTML = "";
    canciones.forEach((cancion, i) => {
        const li = document.createElement("li");
        if (i === indiceActual) li.classList.add("active");

        const img = document.createElement("img");
        img.src = cancion.imagen || "img/default.jpg";

        const span = document.createElement("span");

        span.textContent = `${cancion.titulo} - ${cancion.artista}`;

        li.appendChild(img);
        li.appendChild(span);

        li.addEventListener("click", () => {
            indiceActual = i;
            cargarCancion();
            reproducir();
        });

        playlistEl.appendChild(li);
    });
}

function cargarCancion() {
    const cancion = canciones[indiceActual];
    audio.src = cancion.src;
    tituloEl.textContent = cancion.titulo;
    artistaEl.textContent = cancion.artista;
    renderPlaylist();
}

function reproducir() {
    audio.play();
    reproduciendo = true;
    btnPlay.textContent = "⏸";
}

function pausar() {
    audio.pause();
    reproduciendo = false;

    btnPlay.textContent = "▶";
}

btnPlay.addEventListener("click", () => {
    reproduciendo ? pausar() : reproducir();
});

btnNext.addEventListener("click", () => {
    indiceActual = (indiceActual + 1) % canciones.length;
    cargarCancion();
    reproducir();
});

btnPrev.addEventListener("click", () => {
    indiceActual = (indiceActual - 1 + canciones.length) % canciones.length;
    cargarCancion();
    reproducir();
});

audio.addEventListener("timeupdate", () => {
    if (audio.duration) {
        progressEl.value = (audio.currentTime / audio.duration) * 100;
    }
});

progressEl.addEventListener("input", () => {
    audio.currentTime = (progressEl.value / 100) * audio.duration;
});

audio.addEventListener("ended", () => {
    btnNext.click();
});


cargarCancion();

// ---------- CORAZONES CAYENDO ----------
const heartsContainer = document.getElementById("hearts-container");

function crearCorazon() {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.textContent = "❤";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = (15 + Math.random() * 20) + "px";
    heart.style.animationDuration = (3 + Math.random() * 4) + "s";
    heartsContainer.appendChild(heart);

    setTimeout(() => heart.remove(), 7000);
}

setInterval(crearCorazon, 400);