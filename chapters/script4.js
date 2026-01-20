// script4.js — Capítulo 4 (padronizado com caps 1 e 2)
// =========================

// Chave de salvamento do stage 
const STAGE_KEY_CAP4 = 'bs_stage_cap4_v1';

/* DOM */
const storyText = document.getElementById('story-text');
const choices = document.getElementById('choices');
const bgMusic = document.getElementById('bg-music');
const textBox = document.getElementById('text-box');

/* Estado carregado */
let savedStage = parseInt(localStorage.getItem(STAGE_KEY_CAP4), 10);
let stage = Number.isNaN(savedStage) ? 0 : savedStage;

/* Afinidades (carregar com parseInt + fallback) */
let lucienAffinity = parseInt(localStorage.getItem('lucienAffinity'), 10);
if (Number.isNaN(lucienAffinity)) lucienAffinity = 0;

let eliasAffinity = parseInt(localStorage.getItem('eliasAffinity'), 10);
if (Number.isNaN(eliasAffinity)) eliasAffinity = 0;

let klausAffinity = parseInt(localStorage.getItem('klausAffinity'), 10);
if (Number.isNaN(klausAffinity)) klausAffinity = 0;

let jakeAffinity = parseInt(localStorage.getItem('jakeAffinity'), 10);
if (Number.isNaN(jakeAffinity)) jakeAffinity = 0;

/* Mortes / estado global */
let deadCharacter = localStorage.getItem('deadCharacter') || null;

/* Flags de controle */
let musicStarted = false;
let isLocked = false;    // bloqueia tudo quando final
let inChoice = false;    // true quando têm botões na tela

/* Atualiza o HUD de afinidades (se existir painel) */
function updateAffinityHUD() {
  const luc = document.getElementById('lucien-score');
  const eli = document.getElementById('elias-score');
  const kla = document.getElementById('klaus-score');
  const jak = document.getElementById('jake-score');
  if (luc) luc.textContent = lucienAffinity;
  if (eli) eli.textContent = eliasAffinity;
  if (kla) kla.textContent = klausAffinity;
  if (jak) jak.textContent = jakeAffinity;
}
updateAffinityHUD();

/* Mostra um preview do ponto atual sem gastar PA (evita nextScene automático no load) */
function previewCurrentScene() {
  try {
    const previewMap = {
      0: "(A mansão respira como uma besta ferida, rangendo em cada sombra.)",
      1: "(Você desperta entre escombros, ouvindo respirações ofegantes e gemidos distantes. Está viva... por pouco.)",
      2: "(Silhuetas se movem entre a fumaça. Alguém sobreviveu...)",
      3: "(As paredes choram sangue. Criaturas das sombras se arrastam pelos vitrais, observando em silêncio.)",
      4: "(Um sussurro nasce no fundo da sua mente. Não vem da mansão...Vem de dentro do colar.)",
      5: "— Você pertence a mim agora... (a voz desliza como veneno, tão suave quanto cruel)",
      6: "(Elias surge atrás de você tenso demais)",
      7: "— As escolhas de agora não definem só a sua sobrevivência... mas a dela também",
      8: "Você sente que precisa decidir: enfrentar, fugir...  ou aceitar o vínculo."
    };
    const preview = previewMap[Math.max(0, Math.min(stage, 8))] || "(Carregando...)";
    storyText.textContent = preview;
  } catch (e) {
    storyText.textContent = "(Carregando...)";
  }
}
previewCurrentScene();

/* Handler do clique: avança cena quando apropriado (gasta PA) */
textBox.addEventListener('click', () => {
  if (isLocked) return;

  if (!musicStarted) {
    try { bgMusic.play(); } catch (e) { /* autoplay bloqueado */ }
    musicStarted = true;
  }

  if (inChoice) return; // não gasta PA se estiver mostrando escolhas

  nextScene();
});

/* Função que avança a história e gasta PA (mesmo padrão dos outros capítulos) */
function nextScene() {
  // Gasta 1 PA antes de avançar (se o sistema existir)
  if (typeof tentarGastarPA === "function") {
    const ok = tentarGastarPA(1);
    if (!ok) {
      // Sem PA → não avança
      return;
    }
  }

  switch (stage) {
    case 0:
      storyText.textContent = "(As paredes da mansão parece gemer como se lembrasse de tudo que foi perdido.)";
      stage++;
      break;
    case 1:
      storyText.textContent = "(Você desperta entre escombros. Poeira, cheiro de sangue seco e magia. Cada músculo dói, mas você ainda consegue se mover)";
      stage++;
      break;
    case 2:
      // Mostra fala dependendo de quem morreu
      if (deadCharacter === 'jake') {
        // Jake morreu → mostrar fala do Klaus
        storyText.textContent = "(Klaus segura o grimório queimado, os dedos manchados de cinza e sangue.) — A barreira caiu. A mansão está vulnerável. Ela vai voltar...";
      } else if (deadCharacter === 'klaus') {
        // Klaus morreu → mostrar fala do Lucien
        storyText.textContent = "(Lucien passa a mão no próprio rosto tentando limpar resquícios de sangue e poeira) — Eu vi o olhar dela. Ela não só quer vencer. Ela quer ver a gente sufocar lentamente um por um.";
      } else if (deadCharacter === 'lucien') {
        // Lucien morreu → mostrar fala do Jake
        storyText.textContent = "(Jake surge entre a fumaça, mancando.) — Aquilo... não foi uma luta. Foi um aviso. Ela está jogando com a gente.";
      } else {
        storyText.textContent = "(Ninguém aparece. Só o eco da sua própria respiração. Por um segundo, você tem a sensação de que é a única viva naquele lugar.)";
      }
      stage++;
      break;
    case 3:
      storyText.textContent = "(As paredes todas destruídas apagando toda a cena que um dia já foi bela. Criaturas das sombras se arrastam entre os vitrais, mas não atacam. Observam.)";
      stage++;
      break;
    case 4:
      storyText.textContent = "( Então, você ouve um sussurro vindo de dentro do colar, encostado na sua pele. Uma voz familiar... ou ancestral.)";
      stage++;
      break;
    case 5:
      storyText.textContent = "— Você pertence a mim agora... (murmura a voz, suave como veneno. Você aperta o colar com força.)";
      stage++;
      break;
    case 6:
      storyText.textContent = "(Elias surge atrás de você, assustando-o.) — Ela criou um vínculo. E vai usá-lo para entrar na sua mente.";
      stage++;
      break;
    case 7:
      storyText.textContent = "— As escolhas de agora não definem só sua sobrevivência... mas a dela também (diz ele, apontando para a escuridão.)";
      stage++;
      break;
    case 8:
      // mostra escolhas
      showChoices();
      // salva o ponto de escolha para voltar aqui se recarregar
      localStorage.setItem(STAGE_KEY_CAP4, stage);
      return; // não avançamos o stage aqui — a escolha faz o avanço
    default:
      return;
  }

  // salva sempre que avançar com stage++
  localStorage.setItem(STAGE_KEY_CAP4, stage);
}

/* Mostra as opções do capítulo 4 */
function showChoices() {
  inChoice = true;
  choices.innerHTML = `
    <button class="choice-button" onclick="chooseAction(1)">Enfrentar as sombras com os que restaram</button>
    <button class="choice-button" onclick="chooseAction(2)">Fugir e buscar respostas fora da mansão</button>
    <button class="choice-button" onclick="chooseAction(3)">Aceitar o vínculo e atrair a Rainha</button>
  `;
}

/* Executa a escolha do jogador — salva afinidades e stage como nos capítulos anteriores */
function chooseAction(option) {
  inChoice = false;
  choices.innerHTML = '';

  // Atualiza afinidades conforme a escolha (exemplos — ajuste conforme sua narrativa)
  if (option === 1) {
    // enfrentar com os que restaram — aumenta afinidade com os sobreviventes
    if (deadCharacter === 'jake') {
      klausAffinity += 2;
      localStorage.setItem('klausAffinity', klausAffinity);
    } else if (deadCharacter === 'klaus') {
      jakeAffinity += 2;
      localStorage.setItem('jakeAffinity', jakeAffinity);
    } else if (deadCharacter === 'lucien') {
      klausAffinity += 1;
      localStorage.setItem('klausAffinity', klausAffinity);
    } else {
      // nenhum morreu — recompensa genérica
      lucienAffinity += 1;
      localStorage.setItem('lucienAffinity', lucienAffinity);
    }

    storyText.textContent = "(Você se levanta com os músculos tremendo, mas o olhar firme.) — Eu não corro. Não mais. (diz, empunhando a adaga que Klaus lhe deu.)";
  } else if (option === 2) {
    // fugir
    eliasAffinity += 1;
    localStorage.setItem('eliasAffinity', eliasAffinity);
    storyText.textContent = "(Você encontra uma passagem lateral da mansão ainda intacta, o colar pulsando em seu pescoço a cada passo, como se marcasse o ritmo da sua covardia... Ou da sua sobrevivência.)";
  } else {
    // aceitar vínculo -> consequência (ex.: reduzir afinidade com Lucien)
    lucienAffinity = Math.max(0, lucienAffinity - 1);
    localStorage.setItem('lucienAffinity', lucienAffinity);
    storyText.textContent = "(Você ergue o colar, sentindo a energia escura vibrar entre os dedos.) —Então vem... me encara de frente.  (As sombras ao redor se agitam. Ela ouviu.)";
  }

  // avança stage (vai para 9 por exemplo) e salva
  stage++;
  localStorage.setItem(STAGE_KEY_CAP4, stage);

  // atualiza HUD de afinidade
  updateAffinityHUD();

  // Mostra transição final e botão para capítulo 5
  setTimeout(() => {
    storyText.textContent += "\n(Algo se mexe nas trevas. A sensação é clara: ela ainda não terminou com você. O próximo passo não é só sobrevivência... É sanidade.)";
    choices.innerHTML = `<button class="choice-button" onclick="goToNext()">Ir para o capítulo 5</button>`;
  }, 1200);
}

/* Vai para o próximo capítulo, salvando afinidades antes de sair */
function goToNext() {
  // Salva afinidades
  localStorage.setItem('lucienAffinity', lucienAffinity);
  localStorage.setItem('eliasAffinity', eliasAffinity);
  localStorage.setItem('klausAffinity', klausAffinity);
  localStorage.setItem('jakeAffinity', jakeAffinity);

  isLocked = false;
  window.location.href = 'capitulo5.html';
}
