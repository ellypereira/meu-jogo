/* ===============================
   🎮 BLOOD AND SILENCE
   🧠 DIALOGUE MANAGER
   =============================== */

document.addEventListener("DOMContentLoaded", () => {

  /* ===============================
     🔗 ELEMENTOS DO DOM
     =============================== */

  const textBox = document.getElementById("text-box");
  const storyText = document.getElementById("story-text");
  const choicesBox = document.getElementById("choices");

  const speechBubble = document.getElementById("speech-bubble");
  const speechText = document.getElementById("speech-text");

  const lucien = document.getElementById("lucien");
  const elias = document.getElementById("elias");
  const silhouette = document.getElementById("silhouette");
  const gameContainer = document.getElementById("game-container");

  /* ===============================
     📖 CONTROLE DE DIÁLOGO
     =============================== */

  let chapter = CHAPTER_1;
  let waitingForChoice = false;

// inicializa afinidade padrão
let affinity = {
  Lucien: 0,
  Elias: 0,
  Klaus: 0,
  Jake: 0
};

let index = 0; // índice do diálogo

// Tenta carregar save
const saveData = loadGame();
if (saveData) {
  index = saveData.index || 0;
  affinity = saveData.affinity || affinity; // substitui só se existir
}


  /* ===============================
     💖 AFINIDADE
     =============================== */

  function saveAffinity() {
    localStorage.setItem("affinity", JSON.stringify(affinity));
  }

  /* ===============================
     👥 PERSONAGENS
     =============================== */

  function hideCharacters() {
    lucien.style.opacity = 0;
    elias.style.opacity = 0;
  }

  function showSpeech(character, text) {
    textBox.style.display = "none";
    speechBubble.classList.remove("hidden", "bubble-left", "bubble-right");

    hideCharacters();

    if (character === "lucien") {
      lucien.style.opacity = 1;
      speechBubble.classList.add("bubble-right");
    }

    if (character === "elias") {
      elias.style.opacity = 1;
      speechBubble.classList.add("bubble-left");
    }

    speechText.textContent = text;
  }

  function showNarrator(text) {
    speechBubble.classList.add("hidden");
    hideCharacters();
    textBox.style.display = "block";
    storyText.textContent = text;
  }

  /* ===============================
     🎬 EFEITOS
     =============================== */

  function runEffect(effect) {
    if (!effect) return;

    switch (effect) {
      case "silhouette":
        silhouette.style.display = "block";
        silhouette.classList.add("fade-in");
        setTimeout(() => {
          silhouette.classList.remove("fade-in");
          silhouette.classList.add("fade-out");
        }, 2000);
        setTimeout(() => {
          silhouette.style.display = "none";
          silhouette.classList.remove("fade-out");
        }, 3000);
        break;

      case "shake":
        gameContainer.classList.add("shake");
        setTimeout(() => gameContainer.classList.remove("shake"), 500);
        break;

      case "unlock_cg_forest":
        unlockCG("cg_forest_fall");
        break;
    }
  }


  function nextDialogue() {
  if (index >= dialogueData.length) return;

  const line = dialogueData[index];

  // Limpa balões
  speechBubble.classList.add("hidden");
  textBox.style.display = "block";

  if (line.type === "narrator") {
    textBox.textContent = line.text;
  } else if (line.type === "character") {
    textBox.style.display = "none";
    speechBubble.classList.remove("hidden");
    speechText.textContent = line.text;

    if (line.character === "lucien") {
      lucien.style.opacity = 1;
      elias.style.opacity = 0;
    } else if (line.character === "elias") {
      elias.style.opacity = 1;
      lucien.style.opacity = 0;
    }
  }

  // Salva
  saveGame({
    index: index,
    affinity: affinity
  });

  // prepara para o próximo clique
  index++;
}

  /* ===============================
     🎭 ESCOLHAS
     =============================== */

  function showChoices(choiceData) {
    waitingForChoice = true;
    choicesBox.innerHTML = "";

    choiceData.forEach(choice => {
      const btn = document.createElement("button");
      btn.className = "choice-button";
      btn.textContent = choice.text;

      btn.onclick = () => {
        if (choice.affinity) {
          for (let key in choice.affinity) {
            affinity[key] += choice.affinity[key];
          }
          saveAffinity();
        }

        choicesBox.innerHTML = "";
        waitingForChoice = false;
        index = choice.next;
        next();
      };

      choicesBox.appendChild(btn);
    });
  }

  /* ===============================
     ▶️ AVANÇAR DIÁLOGO
     =============================== */

  function next() {
    if (waitingForChoice) return;
    if (index >= chapter.length) return;

    const entry = chapter[index];

    if (entry.type === "narrator") {
      showNarrator(entry.text);
      runEffect(entry.effect);
    }

    if (entry.type === "speech") {
      showSpeech(entry.character, entry.text);
    }

    if (entry.type === "choice") {
      showChoices(entry.choices);
      return;
    }

    saveGame({
      chapter: "CHAPTER_1",
      index: index,
      affinity: affinity
    });

    index++;
  }

  /* ===============================
     🖱️ CLIQUE PARA AVANÇAR
     =============================== */

  textBox.addEventListener("click", next);
  speechBubble.addEventListener("click", next);

  /* ===============================
     🚀 INÍCIO
     =============================== */

  next();

});
