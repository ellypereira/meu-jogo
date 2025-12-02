const storyText = document.getElementById('story-text');
const textBox = document.getElementById('text-box');
const choices = document.getElementById('choices');
const bgMusic = document.getElementById('bg-music');

// 🔹 CHAVE DE SALVAMENTO DO CAPÍTULO 3
const STAGE_KEY_CAP3 = 'bs_stage_cap3_v1';

// 🔹 Carrega o stage salvo (ou começa do 0 se não tiver)
let savedStage = parseInt(localStorage.getItem(STAGE_KEY_CAP3), 10);
let stage = Number.isNaN(savedStage) ? 0 : savedStage;

// Afinidades
let klausAffinity  = parseInt(localStorage.getItem('klausAffinity'), 10);
if (Number.isNaN(klausAffinity)) klausAffinity = 0;

let jakeAffinity   = parseInt(localStorage.getItem('jakeAffinity'), 10);
if (Number.isNaN(jakeAffinity)) jakeAffinity = 0;

let lucienAffinity = parseInt(localStorage.getItem('lucienAffinity'), 10);
if (Number.isNaN(lucienAffinity)) lucienAffinity = 0;

let eliasAffinity  = parseInt(localStorage.getItem('eliasAffinity'), 10);
if (Number.isNaN(eliasAffinity)) eliasAffinity = 0;

let afterChoiceQueue = [];
let inChoice = false;    
let waitingCallback = null;
let musicStarted = false;
let isLocked = false; // 🔒 Controla se o jogo está aguardando botão final

// ================= CLIQUE NA CAIXA DE TEXTO ===================
textBox.addEventListener('click', () => {

  // se o final já travou tudo, não faz nada
  if (isLocked) return;

  // se tem um callback pendente (última fala da fila)
  if (waitingCallback) {
    const cb = waitingCallback;
    waitingCallback = null;
    cb();            // chama endTragic()
    return;
  }

  // se estamos numa escolha com botões, clique no texto não faz nada
  if (inChoice) return;

  // inicia música na primeira vez
  if (!musicStarted) {
    bgMusic.play();
    musicStarted = true;
  }

  // se estamos numa sequência pós-escolha
  if (afterChoiceQueue.length > 0) {
    triggerNextAfterChoice();
  } else {
    nextScene();
  }
});


// ================= CONTROLE DE IMAGENS ===================
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
      // Sem PA → não avança, stage continua o mesmo
      return;
    }
  }

  switch (stage) {
    // ======== Treinamento com Klaus ========
    case 0:
      updateScene("(Logo ao amanhecer, Klaus me chama para o salão vazio. Ele segura um grimório antigo nas mãos.)");
      showSceneImage('/assets/klaus1.png');
      stage++;
      break;
    case 1:
      updateScene("— Isso é básico, mas pode salvar sua vida. Preste atenção — ele diz, sua voz cortante como uma lâmina.");
      hideSceneImage();
      stage++;
      break;
    case 2:
      updateScene("(Ele me ensina símbolos de proteção, sal negro, círculos de contenção... mas algo me incomoda.)");
      stage++;
      break;
    case 3:
      updateScene("— O que você vê... nem sempre é a verdade — completa, olhando pela janela, desconfiado.");
      stage++;
      break;
    case 4:
      updateScene("(Um estalo seco ecoa. Folhas se mexem. Algo... ou alguém... se aproxima.)");
      stage++;
      break;
    case 5:
      updateScene("(Jake invade a sala, ofegante, sem o sorriso debochado de sempre.) — Temos um problema sério.");
      stage++;
      break;
    case 6:
      updateScene("— Vi movimentações na floresta. Não são animais. E... não são humanos também.");
      stage++;
      break;
    case 7:
      updateScene("— Eles estão vindo. E não temos muito tempo — completa Jake, tirando os fones do pescoço.");
      stage++;
      break;

    // ======== Começa a tensão ========
    case 8:
      updateScene("(Klaus fecha o grimório com força.) — Prepare-se. Isso... não é um treinamento.");
      stage++;
      break;
    case 9:
      updateScene("(Portas tremem. A energia muda. Até o ar parece mais pesado.)");
      stage++;
      break;
    case 10:
      updateScene("— Proteja-se, custe o que custar — Klaus entrega uma adaga e traça símbolos no chão.");
      stage++;
      break;
    case 11:
      updateScene("(Mas antes que o ritual termine, Lucien aparece, olhos em brasas. Elias logo atrás, sério.)");
      showSceneImage('/assets/lucienolhosred.png');
      stage++;
      break;
    case 12:
      updateScene("— Já começaram... — Lucien murmura. — Ela está vindo. A Rainha...");
      hideSceneImage();
      stage++;
      break;
    case 13:
      updateScene("(Elias se aproxima) — Ela quer o colar. E quer você. Não acredite em nenhuma palavra que ela disser.");
      stage++;
      break;
    case 14:
      updateScene("— Preparem o círculo. Agora! — grita Elias, espalhando sal negro no chão.");
      stage++;
      break;

    // ======== Primeira escolha ========
    case 15:
      showFirstChoice();
      // stage continua 15 → se recarregar aqui, volta para a escolha
      localStorage.setItem(STAGE_KEY_CAP3, stage);
      return;

    // ======== A Rainha chega ========
    case 16:
      updateScene("(O chão treme. Uma fenda se abre na parede. Dela sai... uma mulher. Ou o que restou de algo que um dia foi.)");
      showSceneImage('/assets/rainhadassombras.png');
      stage++;
      break;
    case 17:
      updateScene("(Cabelos negros flutuam, olhos totalmente vermelhos. A Rainha das Sombras.)");
      hideSceneImage();
      stage++;
      break;
    case 18:
      updateScene("— Elias... onde está o colar? Está... com essa humana patética? — ela grita.");
      stage++;
      break;
    case 19:
      updateScene("— Jake, Klaus... fracassaram antes. E falharão de novo — cospe ela, caminhando lentamente.");
      stage++;
      break;
    case 20:
      updateScene("— Cala a boca! (Jake ruge, indo pra frente, mas Lucien segura seu braço.) — Isso não é só uma ilusão... É ela.");
      stage++;
      break;
    case 21:
      updateScene("— Saia daqui!  (Klaus grita, formando selos no ar.) — Ela não é mais sua!");
      stage++;
      break;
    case 22:
      updateScene("(As sombras se contorcem. A sala se transforma num campo de guerra. Magia. Sangue. Desespero.)");
      stage++;
      break;

    // ======== Escolha final ========
    case 23:
      showFinalChoice();
      localStorage.setItem(STAGE_KEY_CAP3, stage);
      return;

    default:
      return;
  }

  // 🔹 Salva o stage atual sempre que avançar
  localStorage.setItem(STAGE_KEY_CAP3, stage);
}

// ================= FUNÇÕES DE ESCOLHA ===================

function showFirstChoice() {
  inChoice = true;
  storyText.textContent = "A energia oscila. Você precisa decidir rápido.";
  choices.innerHTML = `
    <button class="choice-button" onclick="chooseFirst(1)">Ajudar Klaus a fortalecer o círculo</button>
    <button class="choice-button" onclick="chooseFirst(2)">Seguir Jake até a floresta</button>
    <button class="choice-button" onclick="chooseFirst(3)">Se esconder e observar</button>
  `;
}

function chooseFirst(option) {
  inChoice = false;
  choices.innerHTML = '';

  if (option === 1) {
    klausAffinity += 2;
    updateScene("(Você corre até Klaus, desenhando runas no chão.) — Boa escolha — (ele diz, concentrado.)");
    localStorage.setItem('klausAffinity', klausAffinity);
  } else if (option === 2) {
    jakeAffinity += 2;
    updateScene("(Você corre ao lado de Jake.) — Finalmente alguém sensata — (ele sorri, nervoso.)");
    localStorage.setItem('jakeaffinity', jakeAffinity);
  } else {
    updateScene("(Você se esconde atrás de uma estante. O ar parece mais pesado. Algo... percebe sua presença.)");
  }

  stage++; // vai para 16
  localStorage.setItem(STAGE_KEY_CAP3, stage);
}

function showFinalChoice() {
  inChoice = true;
  storyText.textContent = "A Rainha ergue as mãos. As sombras rugem. Qual será sua escolha?";
  choices.innerHTML = `
    <button class="choice-button" onclick="choosePath(1)">Ficar e enfrentar com Klaus</button>
    <button class="choice-button" onclick="choosePath(2)">Fugir com Jake</button>
    <button class="choice-button" onclick="choosePath(3)">Se ajoelhar diante da Rainha</button>
  `;
}

function choosePath(option) {
  inChoice = false;
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
      { text: "(Jake segura sua mão.) — Confia em mim?  (pergunta ele.) — Sempre.  (você responde.)" },
      { text: "(Vocês correm pela passagem. Portas explodem. Lucien e Elias seguram as criaturas.)" },
      { text: "(Mas num instante, uma lança das sombras atravessa Jake. Ele te empurra para frente, sorrindo fraco.)" },
      { text: "— Corre... vive... por nós... (ele sussurra, caindo no chão.)",
        callback: () => {
          localStorage.setItem('deadCharacter', 'jake');
          endTragic();
        }
      }
    );
  } else if (option === 3) {
    afterChoiceQueue.push(
      { text: "(Você se ajoelha. A Rainha sorri, acariciando seu rosto.) — Eu sabia que faria a escolha certa..." },
      { text: "(De repente, Lucien saca sua adaga e, em um único movimento, te empurra para o lado, perfurando a Rainha sem hesitar)" },
      { text: "(Uma explosão de luz negra consome tudo. A Rainha, ferida, lança um feitiço que atravessa o peito de Lucien, perfurando seu coração. Ele te encara pela última vez... olhos cheios de dor e algo que parece amor... até seu corpo cair, sem vida.)",
        callback: () => {
          localStorage.setItem('deadCharacter', 'lucien');
          endTragic();
        }
      }
    );
  }

  // Salva afinidades atualizadas
  localStorage.setItem('klausAffinity', klausAffinity);
  localStorage.setItem('jakeAffinity', jakeAffinity);
  localStorage.setItem('lucienAffinity', lucienAffinity);
  localStorage.setItem('eliasAffinity', eliasAffinity);

  // Depois da escolha final, estamos na “fase de morte”
  stage = 24; // ou qualquer valor "pós-história" se quiser
  localStorage.setItem(STAGE_KEY_CAP3, stage);

  triggerNextAfterChoice();
}

// ================= FUNÇÕES DE AVANÇO ===================

function triggerNextAfterChoice() {
  if (afterChoiceQueue.length === 0) return;

    const next = afterChoiceQueue.shift();
    storyText.style.opacity = 0;

    setTimeout(() => {
      storyText.textContent = next.text;
      storyText.style.opacity = 1;

      if (afterChoiceQueue.length === 0 && next.callback) {
          waitingCallback = next.callback;

      }
    }, 400);
  }

// ==============================
// FINAL TRÁGICO
// ==============================
function endTragic() {
  // Afinidades já foram salvas na choosePath, mas aqui reforçamos
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
