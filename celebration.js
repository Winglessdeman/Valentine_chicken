/* =========================================================
   TYPEWRITER
   ========================================================= */
function typeText(el, text, speed, cb) {
  let i = 0;
  el.textContent = "";
  const interval = setInterval(() => {
    el.textContent += text.charAt(i);
    i++;
    if (i === text.length) {
      clearInterval(interval);
      if (cb) cb();
    }
  }, speed);
}

/* =========================================================
   SUPREME CHICKEN – CELEBRATION ENGINE 🐔💖
   ========================================================= */


function launchCelebration() {
  document.body.innerHTML = "";
  document.body.style.margin = "0";
  document.body.style.overflow = "hidden";
  document.body.style.background = "#fff0f5";


  injectGlobalAnimations();
  startHearts();
  startBubbles();


  // Play chicken chaos FIRST, then show message UI
  spawnChickens(() => {
    showFinalMessage();
  });
}


/* =========================================================
   FLOATING HEARTS ❤️
   ========================================================= */
function startHearts() {
  setInterval(() => {
    const heart = document.createElement("div");
    heart.textContent = "❤️";
    heart.style.position = "absolute";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.bottom = "-30px";
    heart.style.fontSize = "22px";
    heart.style.opacity = "0.9";
    heart.style.animation = "floatUp 6s linear";


    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 6000);
  }, 300);
}


/* =========================================================
   BUBBLES 🫧
   ========================================================= */
function startBubbles() {
  setInterval(() => {
    const bubble = document.createElement("div");
    bubble.style.position = "absolute";
    bubble.style.left = Math.random() * 100 + "vw";
    bubble.style.bottom = "-40px";
    bubble.style.width = "18px";
    bubble.style.height = "18px";
    bubble.style.borderRadius = "50%";
    bubble.style.border = "2px solid rgba(255,255,255,0.6)";
    bubble.style.animation = "floatUp 7s linear";


    document.body.appendChild(bubble);
    setTimeout(() => bubble.remove(), 7000);
  }, 500);
}


/* =========================================================
   CHICKEN CHAOS 🐔 (1_chick → 5_chick)
   ========================================================= */

function spawnChickens(onComplete) {
  const chicks = Array.from({ length: 10 }, (_, i) =>
    `images/${i + 1}_chick.gif`
  );

  const w = window.innerWidth;
  const h = window.innerHeight;

  const size = Math.min(w, h) * 0.14;
  const pad = size * 0.9;

  // Positions around the perimeter (safe zone)
  const positions = [
    // TOP (3)
    { x: w * 0.25, y: pad },
    { x: w * 0.5, y: pad },
    { x: w * 0.75, y: pad },

    // RIGHT (2)
    { x: w - pad, y: h * 0.35 },
    { x: w - pad, y: h * 0.65 },

    // BOTTOM (3)
    { x: w * 0.25, y: h - pad },
    { x: w * 0.5, y: h - pad },
    { x: w * 0.75, y: h - pad },

    // LEFT (2)
    { x: pad, y: h * 0.35 },
    { x: pad, y: h * 0.65 }
  ];

  chicks.forEach((src, i) => {
    const img = document.createElement("img");
    img.src = src;
    img.className = "celebration-chicken";

    img.style.position = "fixed";
    img.style.width = size + "px";
    img.style.left = positions[i].x + "px";
    img.style.top = positions[i].y + "px";
    img.style.transform = "translate(-50%, -50%) scale(0.85)";
    img.style.opacity = "0";
    img.style.zIndex = "1"; // behind final card
    img.style.transition = "opacity 0.6s ease, transform 0.6s ease";

    document.body.appendChild(img);

    setTimeout(() => {
      img.style.opacity = "1";
      img.style.transform = "translate(-50%, -50%) scale(1)";
    }, i * 180);
  });

  if (onComplete) {
    setTimeout(onComplete, 1200);
  }
}



/* =========================================================
   FINAL MESSAGE CARD (TYPEWRITER FLOW)
   ========================================================= */
function showFinalMessage() {
  const box = document.createElement("div");
  box.className = "final-box";

  box.innerHTML = `
    <div class="final-card">

      <h1 id="finalTitle" class="final-title"></h1>

      <p id="finalSubtitle" class="final-subtitle"></p>

      <div id="pulseHeart" class="pulse-heart">💓</div>

      <div id="messageSection" style="display:none;">
        <p id="finalPrompt" class="final-prompt"></p>

        <textarea
          id="customMessage"
          class="message-box"
          placeholder="Write your message here… 💕"
        ></textarea>

        <button id="sendMessageBtn" class="primary-btn">
          💬 Send in Messages
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(box);

  const title = document.getElementById("finalTitle");
  const subtitle = document.getElementById("finalSubtitle");
  const prompt = document.getElementById("finalPrompt");
  const messageSection = document.getElementById("messageSection");

  // TYPEWRITER SEQUENCE
  typeText(title, "CONGRATULATIONS", 55, () => {
    typeText(
      subtitle,
      "You are officially my\nSUPREME CHICKEN",
      38,
      () => {
        // Add emphasis AFTER typing
        subtitle.innerHTML = subtitle.textContent.replace(
          "SUPREME CHICKEN",
          "<strong>SUPREME CHICKEN</strong>"
        );

        typeText(prompt, "Write a message for your Valentine 💌", 35, () => {
          messageSection.style.display = "block";
          wireHeartPulse();
          wireMessageSending();
        });
      }
    );
  });
}


/* =========================================================
   MESSAGE SENDING 📱
   ========================================================= */
function wireMessageSending() {
  const btn = document.getElementById("sendMessageBtn");


  btn.addEventListener("click", () => {
    const extra = document.getElementById("customMessage").value || "";
    const base =
      "Happy Valentine’s Day ❤️🐔\n\n" +
      "I guess I’m officially your Supreme Chicken now 💘\n\n";


    const fullMessage = encodeURIComponent(base + extra);


    // Open Messages app
    window.location.href = `sms:&body=${fullMessage}`;


    // After sending → show replay ONLY
    setTimeout(showReplayOnly, 500);
  });
}


/* =========================================================
   HEART PULSE WHILE TYPING 💓
   ========================================================= */
function wireHeartPulse() {
  const textarea = document.getElementById("customMessage");
  const heart = document.getElementById("pulseHeart");


  textarea.addEventListener("input", () => {
    heart.style.transform = "scale(1.4)";
    setTimeout(() => {
      heart.style.transform = "scale(1)";
    }, 150);
  });
}


/* =========================================================
   REPLAY ONLY SCREEN 🔁
   ========================================================= */
function showReplayOnly() {
  // Clear everything
  document.body.innerHTML = "";
  document.body.style.margin = "0";
  document.body.style.overflow = "hidden";
  document.body.style.background = "black";


  // FULL SCREEN HEART GIF
  const replayHeart = document.createElement("img");
  replayHeart.src = "images/heart_replay.gif";
  replayHeart.style.position = "fixed";
  replayHeart.style.inset = "0";
  replayHeart.style.width = "100vw";
  replayHeart.style.height = "100vh";
  replayHeart.style.objectFit = "cover";
  replayHeart.style.zIndex = "1";
  replayHeart.style.cursor = "pointer";


  // REPLAY TEXT
  const replayText = document.createElement("div");
  replayText.textContent = "REPLAY";
  replayText.style.position = "fixed";
  replayText.style.top = "50%";
  replayText.style.left = "50%";
  replayText.style.transform = "translate(-50%, -50%)";
  replayText.style.color = "white";
  replayText.style.fontSize = "42px";
  replayText.style.fontWeight = "bold";
  replayText.style.zIndex = "2";
  replayText.style.pointerEvents = "none";
  replayText.style.letterSpacing = "4px";


  document.body.appendChild(replayHeart);
  document.body.appendChild(replayText);


  // Show couple gifs around edges
  showReplayGifs();


  // CLICK → restart story
  replayHeart.addEventListener("click", () => {
    window.location.reload();
  });
}




function showReplayGifs() {
  const gifs = [
    "images/couple1.gif",
    "images/couple2.gif",


    "images/couple3.gif",
    "images/couple4.gif",
    "images/couple5.gif",


    "images/couple6.gif",
    "images/couple7.gif",
    "images/couple8.gif",


    "images/couple9.gif",
    "images/couple10.gif"
  ];


  // Remove existing replay gifs (on resize)
  document.querySelectorAll(".replay-gif").forEach(el => el.remove());


  const w = window.innerWidth;
  const h = window.innerHeight;


  // Responsive sizing
  const size = Math.min(w, h) * 0.19;
  const padX = size * 0.8;
  const padY = size * 0.9;


  const positions = [
    // ───── TOP (2) ─────
    { x: w * 0.35, y: padY },
    { x: w * 0.65, y: padY },


    // ───── LEFT (3) ─────
    { x: padX, y: h * 0.35 },
    { x: padX, y: h * 0.55 },
    { x: padX, y: h * 0.75 },


    // ───── RIGHT (3) ─────
    { x: w - padX, y: h * 0.35 },
    { x: w - padX, y: h * 0.55 },
    { x: w - padX, y: h * 0.75 },


    // ───── BOTTOM (2) ─────
    { x: w * 0.35, y: h - padY },
    { x: w * 0.65, y: h - padY }
  ];


  gifs.forEach((src, i) => {
    const img = document.createElement("img");
    img.src = src;
    img.className = "replay-gif";


    img.style.position = "fixed";
    img.style.width = size + "px";
    img.style.borderRadius = "19px";
    img.style.left = positions[i].x + "px";
    img.style.top = positions[i].y + "px";
    img.style.transform = "translate(-50%, -50%) scale(0.85)";
    img.style.opacity = "0";
    img.style.zIndex = "3";
    img.style.transition =
      "opacity 0.6s ease, transform 0.6s ease";


    document.body.appendChild(img);


    // Staggered fade-in (twinkle ✨)
    setTimeout(() => {
      img.style.opacity = "1";
      img.style.transform = "translate(-50%, -50%) scale(1)";
    }, i * 180);
  });
}


const floatStyle = document.createElement("style");
floatStyle.textContent = `
.replay-gif {
  animation: float 3.5s ease-in-out infinite;
}


@keyframes float {
  0% { transform: translate(-50%, -50%) scale(1); }
  50% { transform: translate(-50%, -58%) scale(1.04); }
  100% { transform: translate(-50%, -50%) scale(1); }
}
`;
document.head.appendChild(floatStyle);




window.addEventListener("resize", () => {
  if (document.querySelector(".replay-gif")) {
    showReplayGifs();
  }
});




/* =========================================================
   GLOBAL ANIMATIONS
   ========================================================= */
function injectGlobalAnimations() {
  const style = document.createElement("style");
  style.textContent = `
    @keyframes floatUp {
      from { transform: translateY(0); opacity: 1; }
      to { transform: translateY(-100vh); opacity: 0; }
    }


    .final-box {
      position: fixed;
      inset: 0;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .celebration-chicken {
      animation: float 3.5s ease-in-out infinite;
      border-radius: 50%;
      object-fit: cover;
    }


    .final-card {
      background: white;
      padding: 40px 30px;
      border-radius: 30px;
      width: 90%;
      max-width: 420px;
      text-align: center;
      box-shadow: 0 20px 50px rgba(255,77,109,0.3);
      animation: popIn 0.6s ease;
    }


    @keyframes popIn {
      from { transform: scale(0.8); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }


    .final-title {
      color: #ff4d6d;
      font-size: 32px;
      margin-bottom: 10px;
    }


    .final-subtitle strong {
      color: #ff4d6d;
      font-size: 22px;
    }


    .pulse-heart {
      font-size: 46px;
      margin: 18px 0;
      animation: pulse 1.2s infinite;
    }


    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.15); }
      100% { transform: scale(1); }
    }


    .message-box {
      width: 100%;
      min-height: 90px;
      padding: 14px;
      border-radius: 16px;
      border: 2px solid #ffd6de;
      margin-bottom: 18px;
      resize: none;
      outline: none;
    }


    .primary-btn {
      width: 100%;
      background: #ff4d6d;
      color: white;
      padding: 14px;
      border-radius: 999px;
      border: none;
      cursor: pointer;
    }
  `;
  document.head.appendChild(style);
}





