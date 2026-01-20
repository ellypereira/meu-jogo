// script5.js — Capítulo 5 (final) — atualizado com auto-hide da cena em 3s

// Chave de salvamento do capítulo 5
const STAGE_KEY_CAP5 = 'bs_stage_cap5_v1';

// DOM
const storyText   = document.getElementById('story-text');
const textBox     = document.getElementById('text-box');
const choices     = document.getElementById('choices');
const bgMusic     = document.getElementById('bg-music');
const sceneImg    = document.getElementById('scene-image');   // imagem de cena (rainha)
const romanceImg  = document.getElementById('romance-img');  // imagem romântica final

// Estado base do capítulo
let savedStage = parseInt(localStorage.getItem(STAGE_KEY_CAP5), 10);
let stage = Number.isNaN(savedStage) ? 0 : savedStage;

// Afinidades vindas dos capítulos anteriores
let lucienAffinity = parseInt(localStorage.getItem('lucienAffinity'), 10);
if (Number.isNaN(lucienAffinity)) lucienAffinity = 0;

let eliasAffinity = parseInt(localStorage.getItem('eliasAffinity'), 10);
if (Number.isNaN(eliasAffinity)) eliasAffinity = 0;

let klausAffinity = parseInt(localStorage.getItem('klausAffinity'), 10);
if (Number.isNaN(klausAffinity)) klausAffinity = 0;

let jakeAffinity = parseInt(localStorage.getItem('jakeAffinity'), 10);
if (Number.isNaN(jakeAffinity)) jakeAffinity = 0;

// Quem morreu no capítulo 3
let deadCharacter = localStorage.getItem('deadCharacter') || null;

// Flags de controle
let musicStarted = false;
let isLocked     = false; // quando true, clique no texto não faz nada
let inChoice     = false; // quando tem botões na tela

// Finais
let finalChoice  = null;  // 1 = enfrentar, 2 = fugir, 3 = aceitar vínculo
let finalRoute   = null;  // objeto com {id, nome, score} ou null

// ========================
// MINI RESUMO ANTES DO CAPÍTULO (SEM GASTAR PA)
// ========================

// Só mostra o recap se o jogador ainda não avançou nada no capítulo (stage === 0)
let introDone  = stage > 0;
let introStage = 0;

const INTRO_LINES = [
  "(Antes de tudo ruir, havia uma mansão, quatro vampiros e um colar condenado.)",
  "(Você fez escolhas. Alguém morreu por causa delas.)",
  "(Agora não existe mais volta — só o que vem depois do sangue e das sombras.)"
];

// Primeiro texto mostrado na tela
if (!introDone) {
  storyText.textContent = "(Clique para relembrar o que aconteceu até aqui...)";
} else {
  storyText.textContent = "(Carregando...)";
}

// ========================
// HUD de Afinidade
// ========================
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

// ========================
// Controle de imagens (show/hide automático em 3s)
// ========================
let sceneHideTimeout = null;

function normalizeSrc(src) {
  // se o usuário passou apenas um nome (ex: "rainhaferida.png") tenta usar /assets/
  if (!src) return src;
  if (src.startsWith('/') || src.startsWith('http')) return src;
  return '/assets/' + src;
}

function showSceneImage(src) {
  if (!sceneImg) return;
  // prepara src correto sem quebrar se já estiver no HTML
  const finalSrc = src ? normalizeSrc(src) : sceneImg.getAttribute('src') || '';
  if (finalSrc) sceneImg.src = finalSrc;

  // garante estado visual
  sceneImg.classList.remove('hidden');
  // forçar reflow para garantir transição
  void sceneImg.offsetWidth;
  sceneImg.classList.add('show');

  // limpa timeout anterior e cria um novo para esconder
  if (sceneHideTimeout) {
    clearTimeout(sceneHideTimeout);
    sceneHideTimeout = null;
  }
  sceneHideTimeout = setTimeout(() => {
    hideSceneImage();
    sceneHideTimeout = null;
  }, 3000);
}

function hideSceneImage() {
  if (!sceneImg) return;
  sceneImg.classList.remove('show');
  // após a transição, aplica a classe hidden (segurança)
  setTimeout(() => {
    if (!sceneImg.classList.contains('show')) {
      sceneImg.classList.add('hidden');
      // opcional: limpar src para economizar memória (descomente se quiser)
      // sceneImg.removeAttribute('src');
    }
  }, 350); // espera terminar a transição (CSS 0.4s)
}

// showRomanceImage permanece similar mas usando romanceImg
function showRomanceImage(routeId) {
  if (!romanceImg) return;

  let src = "";

  switch (routeId) {
    case "lucien":
      src = "/assets/finais/final-lucien.png";
      break;
    case "elias":
      src = "/assets/finais/final-elias.png";
      break;
    case "klaus":
      src = "/assets/finais/final-klaus.png";
      break;
    case "jake":
      src = "/assets/finais/final-jake.png";
      break;
    default:
      src = "";
  }

  if (src) {
    romanceImg.src = src;
    romanceImg.parentElement.classList.add('show');
  } else {
    romanceImg.src = "";
    romanceImg.parentElement.classList.remove('show');
  }
}

// ========================
// Rota romântica final (quem está vivo + maior afinidade)
// ========================
function getRomanticRoute() {
  const candidatos = [];

  if (deadCharacter !== "lucien") {
    candidatos.push({ id: "lucien", nome: "Lucien", score: lucienAffinity });
  }
  if (deadCharacter !== "elias") {
    candidatos.push({ id: "elias", nome: "Elias", score: eliasAffinity });
  }
  if (deadCharacter !== "klaus") {
    candidatos.push({ id: "klaus", nome: "Klaus", score: klausAffinity });
  }
  if (deadCharacter !== "jake") {
    candidatos.push({ id: "jake", nome: "Jake", score: jakeAffinity });
  }

  if (!candidatos.length) return null;

  candidatos.sort((a, b) => b.score - a.score);

  if (candidatos[0].score <= 0) return null; // final neutro

  return candidatos[0];
}

// ========================
// Clique na caixa de texto
// ========================
textBox.addEventListener('click', () => {
  if (isLocked) return;
  if (inChoice) return; // se tiver escolha na tela, clique no texto não faz nada

  // Primeiro: mini resumo (NÃO gasta PA)
  if (!introDone) {
    if (introStage < INTRO_LINES.length) {
      storyText.textContent = INTRO_LINES[introStage];
      introStage++;
      return; // ainda não entra no fluxo normal
    } else {
      introDone = true;
      storyText.textContent = "(O fim começa agora...)";
      return; // próximo clique já entra no capítulo normal, com PA
    }
  }

  // Música (apenas uma vez)
  if (!musicStarted) {
    try { bgMusic.play(); } catch (e) {}
    musicStarted = true;
  }

  // Daqui pra baixo é fluxo normal do capítulo → gasta PA
  if (typeof tentarGastarPA === "function") {
    const ok = tentarGastarPA(1);
    if (!ok) {
      // Sem PA → não avança
      return;
    }
  }

  nextScene();
});

// ========================
// Avanço da história
// ========================
function nextScene() {
  switch (stage) {
    // Introdução do fim
    case 0:
      storyText.textContent =
        "(A mansão está silenciosa demais. Silenciosa como um corpo depois do impacto. O ar cheira a ferro, fumaça e magia queimada.)";
      stage++;
      break;

    case 1:
      storyText.textContent =
        "(Você desperta entre escombros, a cabeça latejando. Cada músculo dói como se tivesse lutado contra a própria noite.)";
      stage++;
      break;

    case 2:
      if (deadCharacter === "jake") {
        storyText.textContent =
          "(Klaus segura um grimório chamuscado, as páginas meio destruídas.) — A barreira caiu. A mansão está vulnerável. E ela sabe disso.";
      } else if (deadCharacter === "klaus") {
        storyText.textContent =
          "(Lucien limpa o sangue do próprio rosto como se fosse tinta de guerra.) — Ela quer que a gente quebre aos poucos. Despedaço por despedaço.";
      } else if (deadCharacter === "lucien") {
        storyText.textContent =
          "(Jake surge entre a fumaça, mancando, mas com aquele sorriso torto ainda tentando existir.) — Aquilo não foi uma luta. Foi um recado. Ela está se divertindo.";
      } else {
        storyText.textContent =
          "(Por um segundo, você acha que está sozinha. Mas a mansão inteira observa. O silêncio aqui nunca é vazio.)";
      }
      stage++;
      break;

    case 3:
      storyText.textContent =
        "(As paredes parecem respirar. Fendas negras escorrem como rachaduras antigas, e você tem a impressão de que os olhos dos retratos estão seguindo cada passo seu.)";
      stage++;
      break;

    case 4:
      storyText.textContent =
        "(O colar pulsa contra a sua pele. Não como um acessório, mas como um coração estranho, indeciso entre dormir ou despertar.)";
      stage++;
      break;

    case 5:
      storyText.textContent =
        "— Você pertence a mim agora... — a voz sussurra dentro da sua mente, doce e venenosa ao mesmo tempo. Seus dedos apertam o colar até os nós dos dedos esbranquiçarem.";
      stage++;
      break;

    case 6:
      storyText.textContent =
        "(Elias surge atrás de você, a expressão cansada, mas firme.) — Ela criou um vínculo. Não é só com o colar... é com você.";
      stage++;
      break;

    case 7:
      storyText.textContent =
        "— O que você escolher agora não termina só aqui — ele continua. — Tem alguém do outro lado dessa escuridão esperando por você... ou por aquilo que você pode liberar.";
      stage++;
      break;

    // Rainha ferida / prenúncio
    case 8:
      // chama a função para exibir a imagem (ela vai sumir automaticamente em 3s)
      showSceneImage("rainhaferida.png");
      storyText.textContent =
        "(Por um instante, você a vê: a Rainha, ferida, atravessando a névoa. O sangue dela não é vermelho — é escuro demais, pesado demais, como se também fosse feito de sombras.)";
      stage++;
      break;

    case 9:
      storyText.textContent =
        "(Ela não está vencida. Só recuou. E você sente, pela primeira vez, que ela não é o único monstro aqui. Algo em você também despertou.)";
      stage++;
      break;

    case 10:
      // Escolha final
      mostrarEscolhaFinal();
      localStorage.setItem(STAGE_KEY_CAP5, stage);
      return;

    // Epílogo / rota final
    case 11:
      if (!finalRoute) {
        finalRoute = getRomanticRoute();
      }
      mostrarInicioEpilogo();
      stage++;
      break;

    case 12:
      mostrarCenaRomanticaOuNeutra();
      stage++;
      break;

    case 13:
      mostrarChamadoCreditos();
      isLocked = true; // agora só o botão leva pra créditos
      break;

    default:
      return;
  }

  // Salva stage após cada avanço
  localStorage.setItem(STAGE_KEY_CAP5, stage);
}

// ========================
// Escolha final
// ========================
function mostrarEscolhaFinal() {
  inChoice = true;
  choices.innerHTML = ''; // limpa
  storyText.textContent =
    "Seu peito dói, não só pelo cansaço, mas pela sensação de que tudo se estreitou até caber em três caminhos. Nenhum é seguro. Nenhum é realmente certo.";

  choices.innerHTML = `
    <button class="choice-button" onclick="chooseFinal(1)">
      Enfrentar as sombras com quem ainda está ao seu lado
    </button>
    <button class="choice-button" onclick="chooseFinal(2)">
      Fugir da mansão e buscar respostas lá fora
    </button>
    <button class="choice-button" onclick="chooseFinal(3)">
      Aceitar o vínculo e chamar a Rainha de volta
    </button>
  `;
}

window.chooseFinal = function(option) {
  inChoice = false;
  choices.innerHTML = "";
  finalChoice = option;

  if (option === 1) {
    storyText.textContent =
      "(Você firma os pés no chão. Não importa o que venha, não vai correr. Não desta vez.) — Se ela voltar, vai me encontrar em pé.";
  } else if (option === 2) {
    storyText.textContent =
      "(Você olha para as portas quebradas, para as janelas partidas e para o horizonte além delas.) — Se a mansão é uma prisão... então a resposta não está aqui dentro.";
  } else {
    storyText.textContent =
      "(Você ergue o colar, sentindo a energia escura vibrar.) — Se é comigo que ela quer brincar... então que venha de frente desta vez.";
  }

  // avançamos para o epílogo
  stage = 11;
  localStorage.setItem(STAGE_KEY_CAP5, stage);
};

// ========================
// Epílogo
// ========================
function mostrarInicioEpilogo() {
  hideSceneImage();

  let textoBase =
    "(O tempo não volta, os mortos não retornam e o sangue derramado não desfaz o que já foi pactuado.) ";

  if (finalChoice === 1) {
    textoBase +=
      "Você escolheu ficar. A mansão vira seu campo de batalha e, ao mesmo tempo, seu lar distorcido.";
  } else if (finalChoice === 2) {
    textoBase +=
      "Você escolheu ir embora. A estrada à frente é longa, e o mundo lá fora está longe de ser seguro.";
  } else if (finalChoice === 3) {
    textoBase +=
      "Você escolheu chamar a escuridão. Nesse pacto, não existe inocência — só consciência.";
  } else {
    textoBase +=
      "Mesmo sem saber exatamente o que fez, você sente que o universo ao seu redor entendeu, e respondeu.";
  }

  storyText.textContent = textoBase;
}

function mostrarCenaRomanticaOuNeutra() {
  if (finalRoute) {
    showRomanceImage(finalRoute.id);

    let nome = finalRoute.nome;
    let texto = "";

    switch (finalRoute.id) {
      case "lucien":
        texto =
          `Mais tarde, quando o caos finalmente desacelera, é com ${nome} que você fica. Ele se aproxima em silêncio, os olhos ainda marcados pela batalha.` +
          " As mãos dele tocam seu rosto com um cuidado que contrasta com toda a violência que acabaram de enfrentar." +
          " Talvez o mundo continue perigoso, mas naquele instante, você sente que encontrou um motivo para continuar respirando.";
        break;

      case "elias":
        texto =
          `${nome} te encontra em um corredor silencioso, onde a mansão parece menos ameaçadora e mais... cansada.` +
          " Ele entrelaça os dedos nos seus, como se fosse a coisa mais natural do mundo, e promete em voz baixa que, enquanto ele existir, você nunca mais vai carregar esse peso sozinha.";
        break;

      case "klaus":
        texto =
          `${nome} não é de abraços fáceis nem promessas vazias.` +
          " Ele se aproxima devagar, analisa os machucados, corrige sua postura, e no meio de uma bronca sobre sobrevivência, deixa escapar algo que parece um elogio." +
          " No olhar dele, você vê respeito — e algo a mais, que talvez seja amor, na linguagem torta de quem aprendeu a sentir depois de aprender a perder.";
        break;

      case "jake":
        texto =
          `${nome} te puxa para um canto qualquer, longe do resto do mundo, com um sorriso cansado.` +
          " Ele faz piadas ruins para quebrar o clima pesado, mas quando acha que você não está olhando, o olhar dele treme." +
          " Quando seus dedos se encontram, é como se pela primeira vez ele também tivesse encontrado um lugar para descansar.";
        break;

      default:
        texto =
          "Há alguém ao seu lado. Alguém que escolheu ficar, mesmo depois de ver do que você é capaz. E, no fim, isso também é uma forma de milagre.";
        break;
    }

    storyText.textContent = texto;
  } else {
    showRomanceImage(null);
    storyText.textContent =
      "(Você caminha pelos corredores em silêncio. Não há mãos entrelaçadas, promessas sussurradas ou olhares roubados... mas há algo novo em você.)" +
      " Sobreviver também é um tipo de final. E, às vezes, é o mais difícil de todos.";
  }
}

function mostrarChamadoCreditos() {
  choices.innerHTML = `
    <button class="choice-button" onclick="goToCredits()">
      Ver créditos finais
    </button>
  `;
}

// ========================
// Créditos finais e restart
// ========================
window.goToCredits = function() {
  const gameContainer = document.getElementById('game-container');
  const creditsScreen = document.getElementById('credits-screen');

  if (gameContainer) gameContainer.style.display = 'none';
  if (creditsScreen) creditsScreen.style.display = 'flex';
};

window.restartGame = function() {
  localStorage.removeItem(STAGE_KEY_CAP5);
  // Se quiser limpar tudo e recomeçar full:
  // localStorage.clear();
  window.location.href = '/thanks.html';
};
