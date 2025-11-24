const storyText = document.getElementById('story-text');
const textBox = document.getElementById('text-box');
const choices = document.getElementById('choices');
const bgMusic = document.getElementById('bg-music');

let stage = 0;
let klausAffinity = parseInt(localStorage.getItem('klausAffinity')) || 0;
let jakeAffinity = parseInt(localStorage.getItem('jakeAffinity')) || 0;
let lucienAffinity = parseInt(localStorage.getItem('lucienAffinity')) || 0;
let eliasAffinity = parseInt(localStorage.getItem('eliasAffinity')) || 0;


let afterChoiceQueue = [];
let waitingForChoice = false;
let waitingCallback = null;
let musicStarted = false;
let isLocked = false; // 🔒 Controla se o jogo está aguardando botão final

// Clique na caixa de texto
textBox.addEventListener('click', () => {
    if (waitingForChoice === 'callback' && waitingCallback) {
        waitingCallback();
        waitingForChoice = false;
        waitingCallback = null;
        return;
    }

    if (waitingForChoice) {}
  if (isLocked) return; // 🔒 Bloqueia se estiver esperando botão final

  if (!musicStarted) {
    bgMusic.play();
    musicStarted = true;
  }

  if (afterChoiceQueue.length > 0) {
    triggerNextAfterChoice();
  } else if (!waitingForChoice) {
    nextScene();
  }
});

//CONTROLE DE IMAGENS
function showSceneImage(src) {
    const img = document.getElementById('scene-image');
    img.src = src;
    document.getElementById('image-container').style.opacity = 1;
}

function hideSceneImage() {
    document.getElementById('image-container').style.opacity = 0;
}


// ================= FUNÇÕES PRINCIPAIS ===================

function nextScene() {
  
   // 💰 GASTA 1 PA ANTES DE AVANÇAR
  if (typeof tentarGastarPA === "function") {
    const ok = tentarGastarPA(1);
    if (!ok) {
      // Sem PA → não avança
      return;
    }
  }

    switch (stage) {
        // ======== Treinamento com Klaus ========
        case 0:
            updateScene("(Logo ao amanhecer, Klaus me chama para o salão vazio. Ele segura um grimório antigo nas mãos.)");
            showSceneImage('/assets/klaus1.png');
            break;
        case 1:
            updateScene("— Isso é básico, mas pode salvar sua vida. Preste atenção — ele diz, sua voz cortante como uma lâmina.");
            hideSceneImage();
            break;
        case 2:
            updateScene("(Ele me ensina símbolos de proteção, sal negro, círculos de contenção... mas algo me incomoda.)");
            break;
        case 3:
            updateScene("— O que você vê... nem sempre é a verdade — completa, olhando pela janela, desconfiado.");
            break;
        case 4:
            updateScene("(Um estalo seco ecoa. Folhas se mexem. Algo... ou alguém... se aproxima.)");
            break;
        case 5:
            updateScene("(Jake invade a sala, ofegante, sem o sorriso debochado de sempre.) — Temos um problema sério.");
            break;
        case 6:
            updateScene("— Vi movimentações na floresta. Não são animais. E... não são humanos também.");
            break;
        case 7:
            updateScene("— Eles estão vindo. E não temos muito tempo — completa Jake, tirando os fones do pescoço.");
            break;

        // ======== Começa a tensão ========
        case 8:
            updateScene("(Klaus fecha o grimório com força.) — Prepare-se. Isso... não é um treinamento.");
            break;
        case 9:
            updateScene("(Portas tremem. A energia muda. Até o ar parece mais pesado.)");
            break;
        case 10:
            updateScene("— Proteja-se, custe o que custar — Klaus entrega uma adaga e traça símbolos no chão.");
            break;
        case 11:
            updateScene("(Mas antes que o ritual termine, Lucien aparece, olhos em brasas. Elias logo atrás, sério.)");
            showSceneImage('/assets/lucienolhosred.png');
            break;
        case 12:
            updateScene("— Já começaram... — Lucien murmura. — Ela está vindo. A Rainha...");
            hideSceneImage();
            break;
        case 13:
            updateScene("(Elias se aproxima) — Ela quer o colar. E quer você. Não acredite em nenhuma palavra que ela disser.");
            break;
        case 14:
            updateScene("— Preparem o círculo. Agora! — grita Elias, espalhando sal negro no chão.");
            break;

        // ======== Primeira escolha ========
        case 15:
            showFirstChoice();
            return;

        // ======== A Rainha chega ========
        case 16:
            updateScene("(O chão treme. Uma fenda se abre na parede. Dela sai... uma mulher. Ou o que restou de algo que um dia foi.)");
            showSceneImage('/assets/rainhadassombras.png');
            break;
        case 17:
            updateScene("(Cabelos negros flutuam, olhos totalmente vermelhos. A Rainha das Sombras.)");
            hideSceneImage();
            break;
        case 18:
            updateScene("— Elias... onde está o colar? Está... com essa humana patética? — ela grita.");
            break;
        case 19:
            updateScene("— Jake, Klaus... fracassaram antes. E falharão de novo — cospe ela, caminhando lentamente.");
            break;
        case 20:
            updateScene("— Cala a boca! — Jake ruge, indo pra frente, mas Lucien segura seu braço. — Isso não é só uma ilusão... É ela.");
            break;
        case 21:
            updateScene("— Saia daqui! — Klaus grita, formando selos no ar. — Ela não é mais sua!");
            break;
        case 22:
            updateScene("(As sombras se contorcem. A sala se transforma num campo de guerra. Magia. Sangue. Desespero.)");
            break;

        // ======== Escolha final ========
        case 23:
            showFinalChoice();
            return;

        default:
            return;
    }

    stage++;
}

// ================= FUNÇÕES DE ESCOLHA ===================

function showFirstChoice() {
    waitingForChoice = true;
    storyText.textContent = "A energia oscila. Você precisa decidir rápido.";
    choices.innerHTML = `
      <button class="choice-button" onclick="chooseFirst(1)">Ajudar Klaus a fortalecer o círculo</button>
      <button class="choice-button" onclick="chooseFirst(2)">Seguir Jake até a floresta</button>
      <button class="choice-button" onclick="chooseFirst(3)">Se esconder e observar</button>
    `;
}

function chooseFirst(option) {
    waitingForChoice = false;
    choices.innerHTML = '';

    if (option === 1) {
        klausAffinity += 2;
        updateScene("(Você corre até Klaus, desenhando runas no chão. — Boa escolha — ele diz, concentrado.)");
    } else if (option === 2) {
        jakeAffinity += 2;
        updateScene("(Você corre ao lado de Jake. — Finalmente alguém sensata — ele sorri, nervoso.)");
    } else {
        updateScene("(Você se esconde atrás de uma estante. O ar parece mais pesado. Algo... percebe sua presença.)");
    }

    stage++;
}

function showFinalChoice() {
    waitingForChoice = true;
    storyText.textContent = "A Rainha ergue as mãos. As sombras rugem. Qual será sua escolha?";
    choices.innerHTML = `
      <button class="choice-button" onclick="choosePath(1)">Ficar e enfrentar com Klaus</button>
      <button class="choice-button" onclick="choosePath(2)">Fugir com Jake</button>
      <button class="choice-button" onclick="choosePath(3)">Se ajoelhar diante da Rainha</button>
    `;
}

function choosePath(option) {
    waitingForChoice = false;
    choices.innerHTML = '';

    afterChoiceQueue = [];

if (option === 1) {
    klausAffinity += 3;
    afterChoiceQueue.push(
      { text: "(Você segura a mão de Klaus. Ele começa um ritual. Símbolos brilham, mas as sombras avançam...)" },
      { text: "(Em um piscar de olhos lanças negras atravessam o peito de Klaus. Ele cai nos seus braços, com sangue escorrendo.)" },
      { text: "— Proteja... você... mesma... — diz ele, com o último suspiro.",
       callback: () => {
        localStorage.setItem('deadCharacter', 'klaus');
       endTragic();
      }
    }
    );

  } else if (option === 2) {
    jakeAffinity += 3;
    afterChoiceQueue.push(
      { text: "(Jake segura sua mão. — Confia em mim? — pergunta ele. — Sempre. — você responde.)" },
      { text: "(Vocês correm pela passagem. Portas explodem. Lucien e Elias seguram as criaturas.)" },
      { text: "(Mas num instante, uma lança das sombras atravessa Jake. Ele te empurra para frente, sorrindo fraco.)" },
      { text: "— Corre... vive... por nós... — ele sussurra, caindo no chão.",
       callback: () => {
       localStorage.setItem('deadCharacter', 'jake');
       endTragic();
      }
    }
    );

  } else if (option === 3) {
    afterChoiceQueue.push(
      { text: "(Você se ajoelha. A Rainha sorri, acariciando seu rosto. — Eu sabia que faria a escolha certa...)" },
      { text: "(De repente, Lucien saca sua adaga e, em um único movimento, te empurra para o lado, perfurando a Rainha sem hesitar)" },
      { text: "(Uma explosão de luz negra consome tudo. A Rainha, ferida, lança um feitiço que atravessa o peito de Lucien, perfurando seu coração. Ele te encara pela última vez... olhos cheios de dor e algo que parece amor... até seu corpo cair, sem vida.)",
       callback: () => {
      localStorage.setItem('deadCharacter', 'lucien');
      endTragic();
    }
    }
    );
  }

  triggerNextAfterChoice();
}

// ================= FUNÇÕES DE AVANÇO ===================

function triggerNextAfterChoice() {
  if (afterChoiceQueue.length > 0) {
    const next = afterChoiceQueue.shift();
    waitingForChoice = true;
    storyText.style.opacity = 0;

    setTimeout(() => {
      storyText.textContent = next.text;
      storyText.style.opacity = 1;

     // Verifica se esse é o último da fila
      if (afterChoiceQueue.length === 0) {
        // Se tiver callback, salva para rodar no PRÓXIMO clique
        if (next.callback) {
          waitingForChoice = 'callback';
          waitingCallback = next.callback;
        } else {
          waitingForChoice = false;
        }
      }
    }, 400);
  } else {
    waitingForChoice = false;
  }
}

// ==============================
// FINAL TRÁGICO
// ==============================
function endTragic() {
    localStorage.setItem('klausAffinity', klausAffinity);
    localStorage.setItem('jakeAffinity', jakeAffinity);

     isLocked = true; // 🔒 BLOQUEIA clique no texto
     afterChoiceQueue = [];

 storyText.textContent = "(Silêncio absoluto. O cheiro de sangue e magia preenche tudo. Lágrimas caem. O mundo nunca mais será o mesmo...)";

  setTimeout(() => {
    showContinueButton();
    createSmoke();
  }, 4000);
}

function showContinueButton() {
    choices.innerHTML = `
      <button class="choice-button" onclick="goToNext()">Avançar para o capítulo 4</button>
    `;
}

function goToNext() {
  isLocked = false;
  window.location.href = 'capitulo4.html';
}


// ==============================
// EFEITO DE FUMAÇA
// ==============================
function createSmoke() {
  const smokeCount = 35;

  for (let i = 0; i < smokeCount; i++) {
    const smoke = document.createElement('div');
    smoke.classList.add('smoke');
    smoke.style.left = Math.random() * window.innerWidth + 'px';
    smoke.style.width = smoke.style.height = 10 + Math.random() * 20 + 'px';
    smoke.style.animationDuration = 4 + Math.random() * 4 + 's';
    smoke.style.opacity = 0.2 + Math.random() * 0.3;
    document.body.appendChild(smoke);

    setTimeout(() => {
      smoke.remove();
    }, 8000);
  }
}

// ================= UTILITÁRIOS ===================

function updateScene(text) {
    storyText.textContent = text;
}
