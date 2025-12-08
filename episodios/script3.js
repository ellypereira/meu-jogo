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


  // 💰 GASTA 1 PA ANTES DE QUALQUER AVANÇO (normal ou afterChoiceQueue)
  // 💰 GASTA 1 PA ANTES DE AVANÇAR
  if (typeof tentarGastarPA === "function") {
    const ok = tentarGastarPA(1);
    if (!ok) {
      // Sem PA → não avança, stage continua o mesmo
      return;
    }
  }

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

  

  switch (stage) {
    // ======== Treinamento com Klaus ========
    case 0:
      updateScene("(Logo ao amanhecer, Klaus me chama para o salão vazio. Ele segura um grimório antigo nas mãos.)");
      showSceneImage('/assets/klaus1.png');
      stage++;
      break;
    case 1:
      updateScene("— Isso é básico, mas pode salvar sua vida. Preste atenção (a voz dele é reta, afiada, sem espaço para bricadeiras.)");
      hideSceneImage();
      stage++;
      break;
    case 2:
      updateScene("(Símbolos de proteção, sal negro, círculos de contenção...Minha mente tente acompanhar cada detalhe, mas meu peito só consegue repetir a mesma pergunta: isso ainda é treino... ou já é preparação para um fim anunciado?)");
      stage++;
      break;
    case 3:
      updateScene("— O que você vê... nem sempre é a verdade — completa Klaus, olhando pela janela, desconfiado.");
      stage++;
      break;
    case 4:
      updateScene("(Um estalo seco ecoa do lado de fora. Galhos se movem. Por um segundo, tenho sensação de que a mansão inteira prende a respiração junto comigo)");
      stage++;
      break;
    case 5:
      updateScene("(A porta se abre com um tranco. Jake invade a sala, ofegante, sem o sorriso debochado de sempre.) —Temos um problema sério.");
      stage++;
      break;
    case 6:
      updateScene("—Vi movimentações na floresta. Não são animais. E... não são humanos também.");
      stage++;
      break;
    case 7:
      updateScene("— Eles estão vindo. E não temos muito tempo — completa Jake, tirando os fones do pescoço como se aquilo fosse um sinal de que a brincadeira acabou.");
      stage++;
      break;

    // ======== Começa a tensão ========
    case 8:
      updateScene("(Klaus fecha o grimório com força, o som ecoa pelo salão como tiro) —Prepare-se. Isso... não é um treinamento.");
      stage++;
      break;
    case 9:
      updateScene("(As paredes rangem. Portas tremem. O ar fica mais pesado, como se cada respiração precisasse atravessar sombras para chegar até meus pulmões)");
      stage++;
      break;
    case 10:
      updateScene("— Proteja-se, custe o que custar (Klaus entrega uma adaga e traça símbolos no chão com precisão quase obsessiva.)");
      stage++;
      break;
    case 11:
      updateScene("(Antes que o ritual termine, Lucien entra no salão, olhos em brasas trazendo a tempestade com ele. Elias vem logo atrás, o rosto sério demais para fingir controle.)");
      showSceneImage('/assets/lucienolhosred.png');
      stage++;
      break;
    case 12:
      updateScene("— Já começaram... (Lucien diz, sem tirar os olhos de mim) — Ela está vindo. A Rainha...");
      hideSceneImage();
      stage++;
      break;
    case 13:
      updateScene("(Elias se aproxima, a voz baixa, mas urgente.) — Ela quer o colar. E quer você. Não acredite em nenhuma palavra que ela disser.");
      stage++;
      break;
    case 14:
      updateScene("— Preparem o círculo. Agora! (grita Elias, espalhando sal negro no chão enquanto as luzes vacilam)");
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
      updateScene("(O chão treme sob meus pés. Uma fenda se abre na paredem, rasgando a realidade como se fosse papel. Daquela abertura, algo começa a se arrastar para dentro do salão)");
      showSceneImage('/assets/rainhadassombras.png');
      stage++;
      break;
    case 17:
      updateScene("(Cabelos negros que se movem como fumaça, pele pálida demais, olhos completamente vermelhos. A Rainha das Sombras. não parece só viva, parece antiga, errada e poderosa.)");
      hideSceneImage();
      stage++;
      break;
    case 18:
      updateScene("—Elias breve... onde está o colar? (a voz dela corta o ar como lâmina) ——Não me diga que está... com essa humana patética?");
      stage++;
      break;
    case 19:
      updateScene("—Jake e Klaus... fracassaram antes. E vão falhar de novo  (cospe ela, caminhando como se já fosse dona de cada centímetro daquele lugar.)");
      stage++;
      break;
    case 20:
      updateScene("— Cala a boca! (Jake grita, dando um passo à frente, mas Lucien segura seu braço.) — Isso não é só uma ilusão... É ela mesma.");
      stage++;
      break;
    case 21:
      updateScene("— Saia daqui!  (Klaus fala, mãos desenhando selos no ar.) —Ela não é sua, e dessa vez você será morta definitivamente!");
      stage++;
      break;
    case 22:
      updateScene("(As sombras se contorcem pelas paredes. A sala se transforma num campo de guerra feito de sangue, magia e desespero.)");
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
  storyText.textContent = "A energia no salão oscila como se alguém estivesse puxando os fios do próprio mundo. Preciso decidir rapidamente o que fazer, ou serei engolida junto. ";
  choices.innerHTML = `
    <button class="choice-button" onclick="chooseFirst(1)">Ajudar Klaus a fortalecer o círculo</button>
    <button class="choice-button" onclick="chooseFirst(2)">Seguir Jake até a floresta</button>
    <button class="choice-button" onclick="chooseFirst(3)">Se esconder e observar, tentando sobreviver</button>
  `;
}

function chooseFirst(option) {
  inChoice = false;
  choices.innerHTML = '';

  if (option === 1) {
    klausAffinity += 2;
    updateScene("(Crre até Klaus, ajoelhando ao lado dele. Minhas mãos tremem, mas sigo os traços que ele indica no chão.) —Boa escolha (ele diz, concentrado.) —Pelo menos alguém ainda quer viver.");
    localStorage.setItem('klausAffinity', klausAffinity);
  } else if (option === 2) {
    jakeAffinity += 2;
    updateScene("(Sem pensar corro até Jake.) —Você sabe o que está fazendo? (pergunto ofegante) ——Não (ele responde, com meio sorriso.) ——Mas eu sei que não vou te deixar sozinha nisso.");
    localStorage.setItem('jakeAffinity', jakeAffinity);
  } else {
    updateScene("(Eu me enfio atrás de uma estante quebrada, o coração martelando no peito. Talvez seja covardia, talvez seja instinto de sobrevivência. Mas algo nas sombras vira o rosto... e me sente.)");
  }

  stage++; // vai para 16
  localStorage.setItem(STAGE_KEY_CAP3, stage);
}

function showFinalChoice() {
  inChoice = true;
  storyText.textContent = "A Rainha ergue as mãos e as sombras obedecem como se fossem parte do corpo dela. A mansão inteira parece prender o fôlego, esperando minha sua decisão";
  choices.innerHTML = `
    <button class="choice-button" onclick="choosePath(1)">Ficar e enfrentar com Klaus até o fim</button>
    <button class="choice-button" onclick="choosePath(2)">Fugir com Jake pela passagem secreta</button>
    <button class="choice-button" onclick="choosePath(3)">Se ajoelhar diante da Rainha e arriscar tudo</button>
  `;
}

function choosePath(option) {
  inChoice = false;
  choices.innerHTML = '';

  afterChoiceQueue = [];

  if (option === 1) {
    klausAffinity += 3;
    afterChoiceQueue.push(
      { text: "(Eu segura a mão de Klaus com forças. O círculo de proteção brilha ao nosso redor, mas as sombras avançam como ondas contra o vidro trincado)" },
      { text: "(Em um piscar de olhos, lanças negras atravessam o peito de Klaus. O mundo inteiro diminui até caber no som do ar saindo dos pulmões dele.)" },
      { text: "— Proteja... você... mesma... (ele sussurra, com o último fio de voz, antes de desabar nos meus braços, pesado e silencioso.)",
        callback: () => {
          localStorage.setItem('deadCharacter', 'klaus');
          endTragic();
        }
      }
    );
  } else if (option === 2) {
    jakeAffinity += 3;
    afterChoiceQueue.push(
      { text: "(Jake agarra minha mão.) —Confia em mim?  (ele pergunta, os olhos mais sérios do que nunca.) —Sempre.  (respondo, sem pensar.)" },
      { text: "(Corremos pela passagem lateral enquanto portas explodem atrás de nós. Lucien e Elias seguram as criaturas que eu nem consigo nomear.)" },
      { text: "(Num único instante, uma lança das sombras atravessa Jake pelas costas. Ele me empurra para frente,  mantendo o corpo entre mim e a escuridão.)" },
      { text: "— Corre... vive... por nós... (ele sussurra, com um sorriso fraco, antes de cair no chão e desaparecer sob as sombras.)",
        callback: () => {
          localStorage.setItem('deadCharacter', 'jake');
          endTragic();
        }
      }
    );
  } else if (option === 3) {
    afterChoiceQueue.push(
      { text: "(Meus joelhos cedem sozinhos. Eu me ajoelho diante da Rainha, ela sorri satisfeita, os dedos gelados acariciando meu rosto.) ——Eu sabia que você não seria como sua mãe, fez a escolha certa..." },
      { text: "(De repente, um puxão brusco me arranca da frente dela. Lucien me empurra para o lado e, em um único movimento, crava a adaga no peito da Rainha.)" },
      { text: "(Uma explosão de luz negra consome tudo. A rainha, ferida, lança um feitiço final que atravessa o peito de Lucien, perfurando seu coração. Ele me encara pela última vez, olhos cheios de dor e de algo que poderia ter sido amor, antes de seu corpo cair, completamente sem vida. )",
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

  storyText.textContent = "(Silêncio absoluto... A mansão se desintegra aos poucos, cheiro de sangue e magia preenche tudo. As paredes parecem mais estreitas, o teto mais baixo. Nada volta a ser como era depois que alguém morre por você...)";

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
