/* ===============================
   🖼️ CG SYSTEM — BLOOD AND SILENCE
   =============================== */

const CG_KEY = "BS_CG_UNLOCKED";

let unlockedCGs = JSON.parse(localStorage.getItem(CG_KEY)) || [];

function unlockCG(id) {
  if (!unlockedCGs.includes(id)) {
    unlockedCGs.push(id);
    localStorage.setItem(CG_KEY, JSON.stringify(unlockedCGs));
  }
}

function isCGUnlocked(id) {
  return unlockedCGs.includes(id);
}
