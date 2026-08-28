// =============================
// 1. ANIMACIONES AL HACER SCROLL
// =============================

const revealElements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.13,
  }
);

revealElements.forEach((element) => observer.observe(element));

// Asegura que el primer contenido se vea al cargar
window.addEventListener("load", () => {
  document
    .querySelectorAll(".hero .reveal")
    .forEach((element, index) => {
      setTimeout(() => element.classList.add("visible"), index * 400);
    });
});

// =============================
// 2. MÚSICA DE FONDO
// =============================

const music = document.getElementById("backgroundMusic");
const musicButton = document.getElementById("musicButton");
const musicIcon = document.getElementById("musicIcon");

let musicPlaying = false;

music.volume = 0.45;

musicButton.addEventListener("click", async () => {
  try {
    if (!musicPlaying) {
      await music.play();
      musicPlaying = true;
      musicIcon.textContent = "⏸️";
      musicButton.classList.add("playing");
      musicButton.setAttribute("aria-label", "Pausar música");
    } else {
      music.pause();
      musicPlaying = false;
      musicIcon.textContent = "🎵";
      musicButton.classList.remove("playing");
      musicButton.setAttribute("aria-label", "Reproducir música");
    }
  } catch (error) {
    alert(
      "No se encontró la música. Agrega un archivo llamado musica.mp3 dentro de assets/audio."
    );
    console.error(error);
  }

  
});

// =============================
// 3. CONFETI
// =============================

const confettiContainer = document.getElementById("confettiContainer");

function createConfetti(amount = 110) {
  const colors = [
    "#ff4f8b",
    "#8a63d2",
    "#ffd66b",
    "#ff8eb6",
    "#7ad7f0",
    "#ffffff",
  ];

  for (let i = 0; i < amount; i++) {
    const piece = document.createElement("span");
    piece.className = "confetti";

    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDuration = `${2.6 + Math.random() * 2.6}s`;
    piece.style.animationDelay = `${Math.random() * 0.5}s`;
    piece.style.setProperty("--drift", `${-120 + Math.random() * 240}px`);

    const size = 6 + Math.random() * 8;
    piece.style.width = `${size}px`;
    piece.style.height = `${size * 1.45}px`;

    confettiContainer.appendChild(piece);

    setTimeout(() => {
      piece.remove();
    }, 6000);
  }
}

// =============================
// 4. BOTONES DE SORPRESA
// =============================

const surpriseButton = document.getElementById("surpriseButton");
const celebrateButton = document.getElementById("celebrateButton");

surpriseButton.addEventListener("click", () => {
  createConfetti(130);

  setTimeout(() => {
    document.getElementById("mensaje").scrollIntoView({
      behavior: "smooth",
    });
  }, 450);
});

celebrateButton.addEventListener("click", () => {
  createConfetti(180);

  // Vibración breve en móviles compatibles
  if ("vibrate" in navigator) {
    navigator.vibrate([80, 50, 80]);
  }
});

// Pequeña celebración inicial
window.addEventListener("load", () => {
  setTimeout(() => createConfetti(55), 750);
});

// =============================
// 5. AUDIOS CON NOMBRE REVELABLE
// =============================

// =========================================
// MOSTRAR NOMBRE GRANDE TEMPORALMENTE
// =========================================

function showSpeakerReveal(name) {

  // Si ya existe una animación, la elimina
  const oldOverlay = document.querySelector(
    '.speaker-reveal-overlay'
  );

  if (oldOverlay) {
    oldOverlay.remove();
  }


  // Crea el fondo
  const overlay = document.createElement('div');

  overlay.classList.add('speaker-reveal-overlay');


  // Crea el texto
  const text = document.createElement('div');

  text.classList.add('speaker-reveal-text');

  text.textContent = name;


  // Mete el texto dentro del fondo
  overlay.appendChild(text);


  // Añade todo a la página
  document.body.appendChild(overlay);


  // Lo elimina automáticamente
  setTimeout(() => {

    overlay.remove();

  }, 3000);
}



// =========================================
// BOTONES DE LOS AUDIOS
// =========================================

document.querySelectorAll('.toggle-speaker').forEach(button => {

  function toggleSpeaker() {

    const card = button.closest('.audio-card');

    const nameParagraph =
      card.querySelector('.hidden-name');

    const speakerName =
      nameParagraph.getAttribute('data-name');


    // =========================
    // MOSTRAR NOMBRE
    // =========================

    if (!button.classList.contains('revealed')) {

      // Guarda el mensaje original
      if (!nameParagraph.dataset.defaultText) {

        nameParagraph.dataset.defaultText =
          nameParagraph.textContent;

      }


      // Cambia el texto inferior
      nameParagraph.textContent = speakerName;

      nameParagraph.classList.add('show');


      // Cambia ? por ✓
      button.textContent = "✓";

      button.classList.add('revealed');


      // NUEVO:
      // mostrar nombre gigante en pantalla
      showSpeakerReveal(speakerName);

    }


    // =========================
    // VOLVER A OCULTAR
    // =========================

    else {

      nameParagraph.textContent =
        nameParagraph.dataset.defaultText;

      nameParagraph.classList.remove('show');

      button.textContent = "?";

      button.classList.remove('revealed');

    }

  }


  // Click normal
  button.addEventListener('click', toggleSpeaker);


  // Permite utilizar ENTER o ESPACIO
  button.addEventListener('keydown', function(event) {

    if (
      event.key === 'Enter' ||
      event.key === ' '
    ) {

      event.preventDefault();

      toggleSpeaker();

    }

  });

});
