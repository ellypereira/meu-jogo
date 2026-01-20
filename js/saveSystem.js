/* ===============================
   💾 SAVE SYSTEM — BLOOD AND SILENCE
   =============================== */

const SAVE_KEY = "BS_SAVE_V1";

function saveGame(data) {
  localStorage.setItem(SAVE_KEY, JSON.stringify(data));
}

function loadGame() {
  const save = localStorage.getItem(SAVE_KEY);
  
  //Se n existir ou for undefined literal retorna null
  if (!save || save === "undefined") return null;

  try {
    return JSON.parse(save);
  } catch (e) {
    console.warn("Save corrompido. Resetando...", e);
    localStorage.removeItem(SAVE_KEY);
    return null;
  }
}

function clearSave() {
  localStorage.removeItem(SAVE_KEY);
}


