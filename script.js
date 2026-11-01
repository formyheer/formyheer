
/* ==================================
   HEER - MY FOREVER
   Romantic Website Experience
================================== */

/* CUSTOM MESSAGE */

const loveLetter = `
Heer, ❤️

I don't know how to explain what you mean to me,
because words sometimes feel too small for my feelings.

You make ordinary days feel special.
Your smile makes everything brighter.
Even the smallest conversations with you
become my favourite memories.

I don't promise that every day will be perfect.
But I promise that I'll always try to make you smile,
listen to you, support your dreams
and stand beside you.

If I had a thousand chances to choose someone,
I'd find you in every single lifetime.

You are not just someone I love.
You are someone I want to make a lifetime
of beautiful memories with.

I love you, Heer. ❤️

Forever yours.
`;

/* NAVIGATION */

const pages = document.querySelectorAll(".page");
let currentPage = "intro";

function showPage(id) {
  pages.forEach(page => page.classList.remove("active"));

  const next = document.getElementById(id);

  if (!next) return;

  next.classList.add("active");
  currentPage = id;

  window.scrollTo({ top: 0, behavior: "smooth" });

  if (id === "letter") {
    startTyping();
  }

  if (id === "garden" || id === "celebration") {
    createPetals(20);
  }
}

document.querySelectorAll("[data-next]").forEach(button => {
  button.addEventListener("click", () => {
    showPage(button.dataset.next);
  });
});

/* ENVELOPE */

const envelope = document.getElementById("envelopeWrap");
const letterNext = document.getElementById("letterNext");
const envelopeHint = document.getElementById("envelopeHint");

let envelopeOpened = false;

envelope.addEventListener("click", () => {
  if (envelopeOpened) return;

  envelopeOpened = true;

  envelope.classList.add("open");

  envelopeHint.textContent =
    "A little love, written just for you ❤️";

  setTimeout(() => {
    letterNext.classList.remove("hidden");
  }, 1300);
});

letterNext.addEventListener("click", () => {
  showPage("letter");
});

/* TYPING EFFECT */

const loveText = document.getElementById("loveText");

let typingStarted = false;
let charIndex = 0;

function startTyping() {
  if (typingStarted) return;

  typingStarted = true;

  function type() {
    if (charIndex < loveLetter.length) {
      loveText.textContent += loveLetter[charIndex];
      charIndex++;

      setTimeout(type, 32);
    }
  }

  type();
}

/* BACKGROUND MUSIC */

const music = document.getElementById("music");
const musicBtn = document.getElementById("musicBtn");
const musicLabel = document.getElementById("musicLabel");

let musicPlaying = false;

musicBtn.addEventListener("click", async () => {
  try {
    if (!musicPlaying) {
      await music.play();

      musicPlaying = true;
      musicBtn.classList.add("playing");
      musicLabel.textContent = "Music On";

    } else {
      music.pause();

      musicPlaying = false;
      musicBtn.classList.remove("playing");
      musicLabel.textContent = "Music Off";
    }
  } catch (error) {
    musicLabel.textContent = "Add music file";
  }
});

/* STAR UNIVERSE */

const canvas = document.getElementById("universe");
const ctx = canvas.getContext("2d");

let stars = [];
let shootingStars = [];

function resizeCanvas() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  canvas.width = innerWidth * dpr;
  canvas.height = innerHeight * dpr;

  canvas.style.width = innerWidth + "px";
  canvas.style.height = innerHeight + "px";

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  stars = Array.from({ length: 150 }, () => ({
    x: Math.random() * innerWidth,
    y: Math.random() * innerHeight,
    radius: Math.random() * 1.6 + 0.2,
    alpha: Math.random(),
    speed: Math.random() * 0.015 + 0.003
  }));
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function drawUniverse() {
  ctx.clearRect(0, 0, innerWidth, innerHeight);

  stars.forEach(star => {
    star.alpha += star.speed;

    const opacity = 0.3 + Math.abs(Math.sin(star.alpha)) * 0.7;

    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,220,250,${opacity})`;
    ctx.fill();
  });

  shootingStars.forEach((star, index) => {
    star.x += star.vx;
    star.y += star.vy;
    star.life--;

    ctx.beginPath();
    ctx.moveTo(star.x, star.y);
    ctx.lineTo(star.x - star.vx * 7, star.y - star.vy * 7);
    ctx.strokeStyle = `rgba(255,190,225,${star.life / 50})`;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    if (star.life <= 0) shootingStars.splice(index, 1);
  });

  requestAnimationFrame(drawUniverse);
}

drawUniverse();

/* SHOOTING STARS */

function createShootingStar() {
  shootingStars.push({
    x: Math.random() * innerWidth,
    y: Math.random() * innerHeight * 0.5,
    vx: 5 + Math.random() * 5,
    vy: 3 + Math.random() * 3,
    life: 50
  });
}

setInterval(createShootingStar, 3500);

/* FLOATING PETALS */

const petalContainer = document.getElementById("petals");

function createPetals(amount = 1) {
  const symbols = ["🌸", "🌹", "💗", "✨"];

  for (let i = 0; i < amount; i++) {
    const petal = document.createElement("div");

    petal.className = "petal";
    petal.textContent =
      symbols[Math.floor(Math.random() * symbols.length)];

    petal.style.left = Math.random() * 100 + "vw";
    petal.style.fontSize = (12 + Math.random() * 17) + "px";
    petal.style.animationDuration = (5 + Math.random() * 6) + "s";
    petal.style.setProperty("--drift",
      (Math.random() * 180 - 90) + "px"
    );

    petalContainer.appendChild(petal);

    setTimeout(() => petal.remove(), 12000);
  }
}

setInterval(() => createPetals(2), 1000);

/* PROPOSAL - YES */

const yesBtn = document.getElementById("yesBtn");

yesBtn.addEventListener("click", () => {
  showPage("celebration");

  // Music starts if the browser permits it
  if (!musicPlaying) {
    music.play().then(() => {
      musicPlaying = true;
      musicBtn.classList.add("playing");
      musicLabel.textContent = "Music On";
    }).catch(() => {});
  }

  // GRAND CELEBRATION
  grandCelebration();
});

function grandCelebration() {
  const emojis = [
    "❤️", "💖", "💕", "💗",
    "💘", "💝", "🌹", "✨",
    "🎉", "💐", "🦋", "💍"
  ];

  for (let i = 0; i < 100; i++) {
    setTimeout(() => {
      const particle = document.createElement("div");

      particle.className = "spark";
      particle.textContent =
        emojis[Math.floor(Math.random() * emojis.length)];

      particle.style.left = Math.random() * 100 + "vw";
      particle.style.top = (20 + Math.random() * 65) + "vh";

      particle.style.setProperty(
        "--x",
        (Math.random() * 500 - 250) + "px"
      );

      particle.style.setProperty(
        "--y",
        (Math.random() * 600 - 300) + "px"
      );

      particle.style.fontSize =
        (18 + Math.random() * 30) + "px";

      document.getElementById("confetti").appendChild(particle);

      setTimeout(() => particle.remove(), 3000);
    }, i * 35);
  }

  createPetals(45);

  // More celebration waves
  setTimeout(() => createPetals(35), 1500);
  setTimeout(() => createPetals(35), 3000);
}

/* PLAYFUL MAYBE BUTTON */

const maybeBtn = document.getElementById("maybeBtn");

maybeBtn.addEventListener("click", () => {
  const messages = [
    "Take your time, Heer ❤️",
    "You're making me blush too! 🙈",
    "My heart is still waiting 💗",
    "Sending you one more rose 🌹",
    "You deserve all the time in the world ❤️"
  ];

  maybeBtn.textContent =
    messages[Math.floor(Math.random() * messages.length)];
});

/* REPLAY */

document.getElementById("replayBtn").addEventListener("click", () => {
  envelopeOpened = false;
  typingStarted = false;
  charIndex = 0;

  loveText.textContent = "";
  letterNext.classList.add("hidden");
  envelope.classList.remove("open");

  envelopeHint.textContent = "Tap the envelope to open it";

  showPage("intro");
});

/* WELCOME */

console.log("A universe made with love for Heer ❤️");
