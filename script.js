const container = document.getElementById("container");
const homeHTML = container.innerHTML;

function startMusicOnce() {
  if (typeof startBackgroundMusic === "function") {
    startBackgroundMusic();
  }
}


/* ---------- Emoji Shake Helper ---------- */
function shakeEmoji(heart, emoji) {
  heart.textContent = emoji;
  heart.style.animation = "none";
  heart.offsetHeight;
  heart.style.animation = "emojiShake 0.4s";
}


/* ---------- Homepage ---------- */
function rebindHomeEvents() {
  const yesBtn = document.getElementById("yesBtn");
  const noBtn = document.getElementById("noBtn");
  const heart = document.getElementById("heartEmoji");


  noBtn.addEventListener("mouseenter", () => shakeEmoji(heart, "💔"));
  noBtn.addEventListener("mouseleave", () => heart.textContent = "❤️");


  yesBtn.addEventListener("mouseenter", () => shakeEmoji(heart, "💗"));
  yesBtn.addEventListener("mouseleave", () => heart.textContent = "❤️");


  yesBtn.addEventListener("click", () => {
  startBackgroundMusic(); //  browser-approved audio start
  launchCelebration();
});



  noBtn.addEventListener("click", showSureLevel1);
}


/* ---------- Layer 1 ---------- */
function showSureLevel1() {
  container.innerHTML = `
    <div class="card">
      <div class="card-grid">


        <div class="card-text">
          <h1 class="dramatic">ARE YOU SURE??🐔💔</h1>
          <p>You don’t want to be my supreme chicken?</p>
          <p>The chicken is looking at you like this…</p>
          <p>This decision cannot be undone.</p>


          <div class="buttons">
            <button id="sureYes1">YES I DO!!</button>
            <button id="sureNo1">NO I DON'T</button>
          </div>
        </div>


        <img src="images/ckn_l1.gif" class="layer-chicken" alt="sad chicken">
      </div>
    </div>
  `;


  document
  .getElementById("sureYes1")
  .addEventListener("click", () => {
    startMusicOnce();
    launchCelebration();
  });



  document
    .getElementById("sureNo1")
    .addEventListener("click", showSureLevel2);
}


/* ---------- Layer 2 ---------- */
function showSureLevel2() {
  container.innerHTML = `
    <div class="card">
      <div class="card-grid">


        <div class="card-text">
          <h1 class="dramatic">
            💔 Error 404: Romance Not Found<span id="dots"></span>
          </h1>


          <p id="line1"></p>
          <p id="line2"></p>


          <div class="buttons" id="layer2Buttons" style="display:none;">
            <button id="BreakHeart">YES</button>
            <button id="DontBreak">NO</button>
          </div>
        </div>


        <img src="images/ckn_l2.gif" class="layer-chicken" alt="confused chicken">
      </div>
    </div>
  `;


  const dots = document.getElementById("dots");
  let count = 0;


  const exclaim = setInterval(() => {
    dots.textContent += "!";
    count++;
    if (count === 4) {
      clearInterval(exclaim);
      typeLayer2Text();
    }
  }, 300);
}


/* ---------- Typewriter ---------- */
function typeText(el, text, speed, cb) {
  let i = 0;
  const interval = setInterval(() => {
    el.textContent += text.charAt(i);
    i++;
    if (i === text.length) {
      clearInterval(interval);
      if (cb) cb();
    }
  }, speed);
}


function typeLayer2Text() {
  const line1 = document.getElementById("line1");
  const line2 = document.getElementById("line2");
  const buttons = document.getElementById("layer2Buttons");


  typeText(line1, "System requires supreme chicken confirmation....", 45, () => {
    typeText(line2, "Do you want to break this supreme heart?", 45, () => {
      buttons.style.display = "flex";


      document
        .getElementById("BreakHeart")
        .addEventListener("click", showSureLevel3);


      document
  .getElementById("DontBreak")
  .addEventListener("click", () => {
    startMusicOnce();
    launchCelebration();
  });

    });
  });
}


/* ---------- Layer 3 ---------- */
function showSureLevel3() {
  container.innerHTML = `
    <div class="card">
      <div class="card-grid">


        <div class="card-text">
          <h1 class="dramatic">Are you absolutely positively sure?</h1>
          <p class="believes">The chicken believes in you 🐔</p>


          <div class="buttons">
            <button id="finalYes">
              Actually NO, I really want to become your chicken supreme ❤️‍🔥
            </button>
          </div>
        </div>


        <img src="images/ckn_l3.gif" class="layer-chicken" alt="happy chicken">
      </div>
    </div>
  `;


  document
  .getElementById("finalYes")
  .addEventListener("click", () => {
    startMusicOnce();
    launchCelebration();
  });

}


/* ---------- Restore ---------- */
function restoreHome() {
  container.innerHTML = homeHTML;
  rebindHomeEvents();
}


/* ---------- Init ---------- */

rebindHomeEvents();



