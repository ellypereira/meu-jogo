const storyText = document.getElementById('story-text');
const textBox = document.getElementById('text-box');
const choices = document.getElementById('choices');
const bgMusic = document.getElementById('bg-music');

let stage = 0;
let waitingForChoice = false;
let musicStarted = false;

let jakeAffinity = parseInt(localStorage.getItem('jakeAffinity')) || 0;
let lucienAffinity = parseInt(localStorage.getItem('lucienAffinity')) || 0;
let eliasAffinity = parseInt(localStorage.getItem('eliasAffinity')) || 0;
let klausAffinity = parseInt(localStorage.getItem('klausAffinity')) || 0;

function updateAffinityBar() {
  document.getElementById('jake-bar').style.width = jakeAffinity + '%';
  document.getElementById('lucien-bar').style.width = lucienAffinity + '%';
  document.getElementById('elias-bar').style.width = eliasAffinity + '%';
  document.getElementById('klaus-bar').style.width = klausAffinity + '%';
}

// Sempre chamar isso após atualizar as afinidades:
updateAffinityBar();


function saveGame(currentStage) {
  localStorage.setItem('jakeAffinity', jakeAffinity);
  localStorage.setItem('lucienAffinity', lucienAffinity);
  localStorage.setItem('eliasAffinity', eliasAffinity);
  localStorage.setItem('klausAffinity', klausAffinity);
  localStorage.setItem('stage', currentStage);
}

function loadGame() {
  jakeAffinity = parseInt(localStorage.getItem('jakeAffinity')) || 0;
  lucienAffinity = parseInt(localStorage.getItem('lucienAffinity')) || 0;
  eliasAffinity = parseInt(localStorage.getItem('eliasAffinity')) || 0;
  klausAffinity = parseInt(localStorage.getItem('klausAffinity')) || 0;
  const loadedStage = parseInt(localStorage.getItem('stage')) || 0;
  updateAffinityBar();
  return loadedStage;
}


// Lista dos textos sequenciais
const story = [
  "(O chão treme. A Rainha das Sombras ergue seus braços, puxando energia das trevas.)",
  "(Os gritos dos que restaram ecoam. Você sente seu corpo tremer... não há mais volta.)",
  "(É hora de escolher seu destino.)"
];

textBox.addEventListener('click', () => {
  if (!musicStarted) {
    bgMusic.play();
    musicStarted = true;
  }

  if (waitingForChoice) return; // Se está esperando escolha, não avança

  nextScene();
});

function nextScene() {
  if (stage < story.length) {
    storyText.textContent = story[stage];
    stage++;
  } else {
    showMainChoices();
  }
}

function showMainChoices() {
  waitingForChoice = true;
  choices.innerHTML = `
    <button class="choice-button" onclick="chooseAlly('Jake')">Salvar Jake</button>
    <button class="choice-button" onclick="chooseAlly('Lucien')">Salvar Lucien</button>
    <button class="choice-button" onclick="chooseAlly('Klaus')">Salvar Klaus</button>
    <button class="choice-button" onclick="chooseAlly('Elias')">Salvar Elias</button>
    <button class="choice-button" onclick="joinQueen()">Juntar-se à Rainha</button>
  `;
}

function chooseAlly(person) {
  waitingForChoice = false;
  choices.innerHTML = '';
  stage = 0;
  runAllyRoute(person);
}

function runAllyRoute(person) {
  const route = [
    `(Você corre até ${person}, decidindo que ele é sua única esperança...)`,
    `(A batalha final começa. ${person} segura sua mão, encarando a Rainha das Sombras.)`,
    "(Agora, vocês devem escolher como enfrentar o destino...)"
  ];

  storyText.textContent = route[stage];
  stage++;

  textBox.onclick = () => {
    if (stage < route.length) {
      storyText.textContent = route[stage];
      stage++;
    } else {
      textBox.onclick = null; // Pausa o clique para aparecer escolhas
      finalBattle(person);
    }
  };
}

function finalBattle(person) {
  waitingForChoice = true;
  choices.innerHTML = `
    <button class="choice-button" onclick="ending('victory', '${person}')">Arriscar tudo em um ataque final</button>
    <button class="choice-button" onclick="ending('sacrifice', '${person}')">Se sacrificar para ${person}</button>
    <button class="choice-button" onclick="ending('fail', '${person}')">Fugir e abandonar a luta</button>
  `;
}

function joinQueen() {
  waitingForChoice = false;
  choices.innerHTML = '';
  const queenRoute = [
    "(Você sorri para a Rainha das Sombras. — Eu escolho... o caos.)",
    "(Ela segura sua mão, as sombras te envolvem. O mundo começa a se despedaçar.)",
    "(Humanidade? Uma lembrança distante. Vocês governam juntos... sobre ruínas.)"
  ];

  stage = 0;
  storyText.textContent = queenRoute[stage];
  stage++;

  textBox.onclick = () => {
    if (stage < queenRoute.length) {
      storyText.textContent = queenRoute[stage];
      stage++;
    } else {
      textBox.onclick = null;
      showRestart("Final do Caos");
    }
  };
}

function ending(type, person) {
  waitingForChoice = false;
  choices.innerHTML = '';
  let texts = [];

  if (type === 'victory') {
    texts = [
      `(Com um grito, você e ${person} unem suas forças. A Rainha é destruída, a luz retorna ao mundo.)`,
      `(${person} segura sua mão. — Conseguimos... juntos.)`
    ];
  } else if (type === 'sacrifice') {
    texts = [
      `(Você se joga na frente do golpe final, protegendo ${person}.)`,
      `(${person} finaliza a Rainha, mas chora ao ver seu corpo sem vida.)`
    ];
  } else {
    texts = [
      "(Vocês tentam fugir, mas não há para onde correr...)",
      "(A Rainha os encontra. Tudo termina em sombras.)"
    ];
  }

  stage = 0;
  storyText.textContent = texts[stage];
  stage++;

  textBox.onclick = () => {
    if (stage < texts.length) {
      storyText.textContent = texts[stage];
      stage++;
    } else {
      textBox.onclick = null;
      showRestart(type === 'victory' ? `Final Bom com ${person}` : type === 'sacrifice' ? `Final de Sacrifício por ${person}` : "Final Ruim - Covardia");
    }
  };
}

function showRestart(finalTitle) {
  waitingForChoice = true;
  choices.innerHTML = `
    <div style="margin-bottom: 10px;">${finalTitle}</div>
    <button class="choice-button" onclick="restart()">Episódio 8</button>
  `;
}

function restart() {
  window.location.href = 'ep8.html';
}
