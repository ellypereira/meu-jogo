// Capítulo 5 – O Último Ritual

let stage = 0;
let isLocked = false;
let musicStarted = false;
let afterChoiceQueue = [];
let waitingForChoice = false;
let waitingCallback = null;

const storyText = document.getElementById('story-text');
const choices = document.getElementById('choices');
const bgMusic = document.getElementById('bg-music');
const textBox = document.getElementById('text-box');
const romanceImg = document.getElementById('romance-img');
const creditsScreen = document.getElementById('credits-screen');


let klausAffinity = parseInt(localStorage.getItem('klausAffinity')) || 0;
let jakeAffinity = parseInt(localStorage.getItem('jakeAffinity')) || 0;
let lucienAffinity = parseInt(localStorage.getItem('lucienAffinity')) || 0;
let eliasAffinity = parseInt(localStorage.getItem('eliasAffinity')) || 0;

const deadCharacter = localStorage.getItem('deadCharacter');


textBox.addEventListener('click', () => {
  if (isLocked) return;

  if (!musicStarted) {
    bgMusic.play();
    musicStarted = true;
  }

  if (waitingForChoice === 'callback' && waitingCallback) {
    waitingCallback();
    waitingForChoice = false;
    waitingCallback = null;
    return;
  }

  if (afterChoiceQueue.length > 0) {
    triggerNextAfterChoice();
  } else if (!waitingForChoice) {
    nextScene();
  }
});

function nextScene() {
  switch (stage) {
    case 0:
      storyText.textContent = "(O céu escurece. Um eclipse se forma acima da mansão. As sombras vibram ao redor de você.)";
      break;
    case 1:
      storyText.textContent = "(A Rainha das Sombras surge diante de você, sangrando das batalhas anteriores. Mas seu olhar ainda queima.)";
      break;
    case 2:
      storyText.textContent = "— Você ousou me desafiar... perdeu amigos por isso. Está disposta a morrer também? — ela pergunta.";
      break;
    case 3:
      storyText.textContent = "(Você sente o colar aquecer. Ele vibra, como se pedisse ação. Seus dedos se fecham sobre ele.)";
      break;
    case 4:
      storyText.textContent = "— Eu não vou morrer aqui. Você é quem vai — você diz, encarando-a nos olhos pela primeira vez.";
      break;
    case 5:
      storyText.textContent = "(Elias surge ao seu lado, ferido, mas determinado.) — Estou com você até o fim. Ela não pode vencer.";
      break;
    case 6:
      showFightChoices();
      return;
    default:
      return;
  }
  stage++;
}

function showFightChoices() {
  waitingForChoice = true;
  choices.innerHTML = `
    <button class="choice-button" onclick="fightOption(1)">Canalizar o poder do colar</button>
    <button class="choice-button" onclick="fightOption(2)">Usar o ritual aprendido com Klaus</button>
    <button class="choice-button" onclick="fightOption(3)">Confiar em Elias e atacar juntos</button>
  `;
}

function fightOption(option) {
  waitingForChoice = false;
  choices.innerHTML = "";
  afterChoiceQueue = [];
  isLocked = false;

  if (option === 1) {
    afterChoiceQueue.push(
      { text: "(Você ergue o colar ao céu. A luz rasga a escuridão. Gritos da Rainha ecoam enquanto ela se contorce.)" },
      { text: "(A Rainha das Sombras solta um último grito. Seu corpo se despedaça em fragmentos de sombra e poeira mágica.)", callback: showRomanticEnding }
    );
  } else if (option === 2) {
    afterChoiceQueue.push(
      { text: "(Você traça os selos no chão. O sangue se move. A terra responde. O ritual começa e a Rainha é puxada pelas raízes.)" },
      { text: "(A Rainha das Sombras solta um último grito. Seu corpo se despedaça em fragmentos de sombra e poeira mágica.)", callback: showRomanticEnding }
    );
  } else {
    afterChoiceQueue.push(
      { text: "(Você e Elias correm em sincronia. Ele lança feitiços enquanto você desfere o golpe final com o colar brilhando.)" },
      { text: "(A Rainha das Sombras solta um último grito. Seu corpo se despedaça em fragmentos de sombra e poeira mágica.)", callback: showRomanticEnding }
    );
  }

  triggerNextAfterChoice();
}

function triggerNextAfterChoice() {
  if (afterChoiceQueue.length > 0) {
    const next = afterChoiceQueue.shift();
    storyText.textContent = next.text;

    if (afterChoiceQueue.length === 0) {
      if (next.callback) {
        waitingForChoice = 'callback';
        waitingCallback = next.callback;
      } else {
        waitingForChoice = false;
      }
    }
  } else {
    waitingForChoice = false;
  }
}


function showRomanceImage(src, duration = 4000) {
  const romanceContainer = document.getElementById('romance-image');
  const romanceImg = document.getElementById('romance-img');

  romanceImg.src = src;
  romanceContainer.classList.add('show');

  setTimeout(() => {
    romanceContainer.classList.remove('show');
  }, duration);
}

function showRomanticEnding() {
  const mostAffinity = Math.max(klausAffinity, jakeAffinity, lucienAffinity, eliasAffinity);
  let chosen = "";
  let image = "";

  if (deadCharacter !== "klaus" && klausAffinity === mostAffinity) {
    chosen = "Klaus se aproxima em silêncio, o olhar entre a dor e o alívio. — Você sobreviveu... — sussurra, tocando seu rosto antes de te beijar, como se o tempo parasse ali.";
    image = "/assets/beijo_klaus.png";
  } else if (deadCharacter !== "jake" && jakeAffinity === mostAffinity) {
    chosen = "Jake aparece, ferido, mas sorrindo. — Minha heroína louca... — sussurra, te puxando para um beijo que mistura dor e amor.";
    image = "/assets/beijo_jake.png";
  } else if (deadCharacter !== "lucien" && lucienAffinity === mostAffinity) {
    chosen = "Lucien segura seu braço. — Ainda somos nós... — sussurra, antes de te beijar como se o tempo precisasse parar.";
    image = "/assets/beijo_lucien.png";
  } else if (eliasAffinity === mostAffinity) {
    chosen = "Elias te olha, emocionado. — Você mudou tudo... — Ele te beija, como um agradecimento silencioso.";
    image = "/assets/beijo_elias.png";
  } else {
    chosen = "(Você está sozinha. Mas livre. O preço foi alto... mas a vitória é sua. Pela primeira vez, o silêncio é paz.)";
    image = ""; // Sem imagem
  }

  document.getElementById("text-box").classList.add("text-box-transparent");


  if (image) showRomanceImage(image);

  storyText.textContent = chosen + "\n\n(As sombras caíram. Mas e agora... quem você será nesse novo mundo?)";
  choices.innerHTML = `
    <button class="choice-button" onclick="showFinalReflection()">Finalizar</button>
  `;
  isLocked = true;
}

function showFinalReflection() {
  storyText.textContent = "(Pelos corredores em ruínas, os ecos do passado te seguem, a guerra chegou ao fim.)";
  choices.innerHTML = `
    <button class="choice-button" onclick="endGame()">Encerrar História</button>
  `;
}

function endGame() {
storyText.textContent = "(O colar pulsa uma última vez... e silencia, você venceu. As sombras se dissiparam, mas em seu íntimo, uma dúvida permanece...)\n\n(Será esse realmente o fim?)";
  choices.innerHTML = `
    <button class="choice-button" onclick="goToCredits()">Ver Créditos</button>
  `;
}

    function goToCredits() {
      document.getElementById('game-container').style.display = 'none';
      creditsScreen.style.display = 'flex';
    }


    function restartGame() {
      localStorage.clear();
      window.location.href = "../inicio.html";
    }

    function createParticle() {
  const particle = document.createElement('div');
  particle.classList.add('particle');
  particle.style.left = `${Math.random() * 100}vw`;
  particle.style.animationDuration = `${2 + Math.random() * 3}s`;
  particle.style.opacity = Math.random().toFixed(2);
  document.body.appendChild(particle);

  setTimeout(() => particle.remove(), 5000); // remove depois de subir
}

// Gera partículas aleatórias continuamente
setInterval(createParticle, 300);


document.addEventListener("DOMContentLoaded", () => {
  nextScene();
});