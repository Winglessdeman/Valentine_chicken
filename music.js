/* =========================================================
   GLOBAL BACKGROUND MUSIC CONTROLLER 🎵
   ========================================================= */

let bgMusic = null;
let musicUnlocked = false;

/* ---------- Start Background Music ---------- */
function startBackgroundMusic() {
  if (bgMusic || musicUnlocked) return;

  musicUnlocked = true;
  bgMusic = new Audio("music/music2.mp3");

  bgMusic.loop = true;
  bgMusic.volume = 0.7;
  bgMusic.preload = "auto";

  // Start at 0.13s once metadata is ready
  bgMusic.addEventListener("loadedmetadata", () => {
    bgMusic.currentTime = 0.13;
    bgMusic.play().catch(() => {});
  });

  // Safety net for autoplay restrictions
  bgMusic.play().catch(() => {});
}

/* ---------- Unlock Audio on First Interaction ---------- */
function unlockMusic() {
  startBackgroundMusic();
  document.removeEventListener("click", unlockMusic);
  document.removeEventListener("touchstart", unlockMusic);
  document.removeEventListener("keydown", unlockMusic);
}

// Listen for *any* user interaction
document.addEventListener("click", unlockMusic);
document.addEventListener("touchstart", unlockMusic);
document.addEventListener("keydown", unlockMusic);

/* ---------- Optional Mute Toggle ---------- */
function toggleMusicMute() {
  if (!bgMusic) return;

  bgMusic.muted = !bgMusic.muted;
  return bgMusic.muted;
}
