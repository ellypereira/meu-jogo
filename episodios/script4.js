// Capítulo 4 – Fragmentos do Caos

let stage = 0;
let deadCharacter = localStorage.getItem('deadCharacter');
let musicStarted = false;
let isLocked = false;

const storyText = document.getElementById('story-text');
const choices = document.getElementById('choices');
const bgMusic = document.getElementById('bg-music');
const textBox = document.getElementById('text-box');

textBox.addEventListener('click', () => {
  if (isLocked) return;
  if (!musicStarted) {
    bgMusic.play();
    musicStarted = true;
  }
  nextScene();
});

document.addEventListener("DOMContentLoaded", () => {
  nextScene();
});

function getFirstSurvivor () {
  const all = ["jake", "klaus", "lucien"];
  return all.find(p => p !== deadCharacter);
}

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
    case 0:
      storyText.textContent = "(A mansão respira como uma besta ferida.)";
      break;
    case 1:
      storyText.textContent = "(Você desperta entre escombros, com o som de respirações ofegantes e gemidos distantes. Está viva... por pouco.)";
      break;
    case 2:
      if ( deadCharacter !== "jake") {
        storyText.textContent = "Jake surge entre a fumaça, mancando. — Aquilo... não foi uma luta. Foi um aviso. Ela está jogando com a gente.";
      } else if (deadCharacter !== "klaus") {
        storyText.textContent = "Klaus segura o grimório queimado. — A barreira caiu. A mansão está vulnerável. Ela vai voltar, e vai ser pior.";
      } else if (deadCharacter !== "lucien") {
        storyText.textContent = "Lucien esfrega o sangue no próprio rosto como guerra. — Eu vi o olhar dela. Ela quer que a gente sufoque lentamente.";
      } else {
        storyText.textContent = "(Ninguém aparece. Só o eco da sua própria respiração. Você está sozinha. Ou... não?)";
      }
      break;
    case 3:
      storyText.textContent = "(As paredes choram sangue. Criaturas das sombras se arrastam entre os vitrais, mas não atacam. Observam.)";
      break;
    case 4:
      storyText.textContent = "(Você ouve algo. Um sussurro... vindo de dentro do colar. Uma voz familiar... ou ancestral?)";
      break;
    case 5:
      storyText.textContent = "— Você pertence a mim agora... — murmura a voz, suave como veneno. Você aperta o colar com força.";
      break;
    case 6:
      storyText.textContent = "(Elias surge atrás de você, assustando-o. — Ela criou um vínculo. E vai usá-lo para entrar na sua mente.)";
      break;
    case 7:
      storyText.textContent = "— As escolhas de agora não definem só sua sobrevivência... mas a dela também — diz ele, apontando para a escuridão.";
      break;
    case 8:
      showChoices();
      return;
    default:
      return;
  }
  stage++;
}

function showChoices() {
  choices.innerHTML = `
    <button class="choice-button" onclick="chooseAction(1)">Enfrentar as sombras com os que restaram</button>
    <button class="choice-button" onclick="chooseAction(2)">Fugir e buscar respostas fora da mansão</button>
    <button class="choice-button" onclick="chooseAction(3)">Aceitar o vínculo e atrair a Rainha</button>
  `;
}

function chooseAction(option) {
  choices.innerHTML = "";
  isLocked = true;

  if (option === 1) {
    storyText.textContent = "(Você se levanta com os olhos ardendo. — Eu não corro. Não mais. — diz, empunhando a arma.)";
  } else if (option === 2) {
    storyText.textContent = "(Você escapa pela lateral da mansão, o colar pulsando em seu pescoço. Cada passo ecoa como um aviso.)";
  } else {
    storyText.textContent = "(Você ergue o colar. — Vem... me encara de frente. — As sombras se agitam. Ela ouviu.)";
  }

  setTimeout(() => {
    storyText.textContent += "\n(Algo se mexe nas trevas. Ela não terminou com você. Prepare-se... o capitulo 5 começa onde a sanidade termina.)";
    choices.innerHTML = `
      <button class="choice-button" onclick="goToNext()">Ir para o capítulo 5</button>
    `;
  }, 4000);
}


function goToNext() {
  isLocked = false;
  window.location.href = "capitulo5.html";
}