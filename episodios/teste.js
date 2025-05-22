// Elementos da interface  SCRIPT DO EP 3 
const storyText = document.getElementById('story-text');
const textBox = document.getElementById('text-box');
const choices = document.getElementById('choices');
const bgMusic = document.getElementById('bg-music');
const character = document.getElementById('character');

// Estado do jogo
let stage = 0;
let musicStarted = false;
let waiting = false;

// Afinidades dos personagens
const lucienAffinity = parseInt(localStorage.getItem('lucienAffinity')) || 0;
const eliasAffinity = parseInt(localStorage.getItem('eliasAffinity')) || 0;

// Evento principal de clique no texto
textBox.addEventListener('click', () => {
  if (!waiting) {
    stage <= 6 ? nextScene() : continueAfterChoice();
  }
});

function playMusic() {
  if (!musicStarted) {
    bgMusic.play();
    musicStarted = true;
  }
}

// Cenas iniciais até a escolha
function nextScene() {
  switch (stage) {
    case 0:
      playMusic();
      storyText.textContent = "A luz das velas vacila... Você está sozinha. Ou ao menos acha que está.";
      break;
    case 1:
      storyText.textContent = "Em cima da mesa, um colar antigo, pulsando com uma energia escura.";
      break;
    case 2:
      storyText.textContent = "Ao tocá-lo, uma dor aguda atinge sua mente. Sua visão escurece. Você ouve... vozes.";
      break;
    case 3:
      waiting = true;
      showWhispers(() => {
        waiting = false;
        stage++;
      });
      return;
    case 4:
      storyText.textContent = "As imagens invadem sua cabeça. Você vê uma garota... você mesma... cercada por sombras.";
      showImage('garota-sombras.png');
      break;
    case 5:
      waiting = true;
      storyText.textContent = "Ela grita. Você grita. Mas ninguém ouve.";
      setTimeout(() => {
        storyText.textContent += " 'Você pertence à escuridão... sempre pertenceu.'";
        hideImage();
        waiting = false;
        stage++;
      }, 1000);
      return;
    case 6:
      showPostVisionChoices();
      break;
  }
  stage++;
}

// Sussurros em sequência (visão)
function showWhispers(callback) {
  const whispers = [
    "'Ela é a chave...'",
    "'Nunca deveria ter voltado...'",
    "'Eles vão destruí-la, como fizeram antes...'",
    "'Acorde, criatura...'"
  ];
  let index = 0;

  const interval = setInterval(() => {
    storyText.textContent = whispers[index++];
    if (index >= whispers.length) {
      clearInterval(interval);
      setTimeout(callback, 1000);
    }
  }, 1500);
}

// Escolhas após visão
function showPostVisionChoices() {
  storyText.textContent = "Você acorda ofegante. O colar ainda está na sua mão, e você sente que algo em você mudou.";
  choices.innerHTML = `
    <button class="choice-button" onclick="chooseReaction(1)">Jogar o colar longe, em pânico</button>
    <button class="choice-button" onclick="chooseReaction(2)">Segurar o colar com força, determinada</button>
  `;
}

function chooseReaction(option) {
  choices.innerHTML = '';
  storyText.textContent = option === 1
    ? "Você o lança para longe. Seu coração bate descompassado. Está assustada... mas viva."
    : "Você fecha os dedos sobre ele. Se há algo obscuro em seu passado, você vai enfrentá-lo.";
  stage = 7;
}

// Continuação após a escolha
function continueAfterChoice() {
  switch (stage) {
    case 7:
      if (lucienAffinity > eliasAffinity) {
        storyText.textContent = "Lucien surge à porta, observando você em silêncio, como se soubesse de tudo.";
        showImage('lucien.png');
        stage = 8;
      } else if (eliasAffinity > lucienAffinity) {
        storyText.textContent = "(Elias se aproxima, preocupado.) 'Você... viu alguma coisa, não foi?'";
        showImage('elias.jpg');
        stage = 10;
      } else {
        storyText.textContent = "Você ouve passos se aproximando... mas não sabe quem vem. Ainda.";
        stage = 12;
      }
      break;

    case 8:
      storyText.textContent = "'Você tocou, não foi? O colar... não era pra estar aqui.' A expressão dele é de fúria contida.";
      hideImage();
      stage++;
      break;

    case 9:
      storyText.textContent = "'Esse colar pertencia a alguém muito importante... alguém que te conhecia.' Lucien parece confuso... e com medo.";
      showLucienDialogue();
      stage = 14;
      break;

    case 10:
      showEliasDialogue();
      setTimeout(hideImage, 3000);
      stage = 15;
      break;

    case 12:
      storyText.textContent = "Uma voz estranha ecoa atrás de você. 'Você despertou algo... e agora, não há como voltar.'";
      stage++;
      break;

    case 13:
      showNeutralPath();
      stage = 16;
      break;

    case 14: case 15: case 16:
      // Aguarda resposta do jogador
      break;

    case 17: case 18: case 19:
      showTerraceScene();
      stage++;
      break;

    case 20:
      storyText.textContent = "Sozinha sob o céu noturno, você contempla a vastidão silenciosa. A lua cheia derrama sua luz prateada sobre o colar que repousa em sua mão trêmula.";
      stage++;
      break;

    case 21:
      storyText.textContent = "Por que Lucien e Elias agem como se conhecessem cada sombra da sua alma... mais do que você jamais ousou conhecer?";
      stage++;
      break;

    case 22:
      storyText.textContent = "Fragmentos de lembranças, sussurros distantes e o brilho sombrio do colar... Tudo aponta para um passado esquecido.";
      stage++;
      break;

    case 23:
      storyText.textContent = "Você inspira lentamente, deixando o silêncio da noite envolver seus pensamentos. As respostas virão... no tempo certo.";
      showEndEpisodeButton();
      stage++;
      break;
  }
}

// Diálogos alternativos

function showLucienDialogue() {
  choices.innerHTML = `
    <button class="choice-button" onclick="lucienReaction(1)">'Minha mãe? O que você sabe sobre ela?'</button>
    <button class="choice-button" onclick="lucienReaction(2)">'Você está mentindo... está tentando me manipular.'</button>
  `;
}

function lucienReaction(option) {
  choices.innerHTML = '';
  storyText.textContent = option === 1
    ? "Lucien se aproxima. 'Ela era poderosa. Como você. Mas teve medo... e fugiu. Agora, o sangue dela chama por você.'"
    : "'Se eu quisesse te manipular, já teria feito isso. Mas você precisa saber de onde veio... antes que seja tarde.'";
  stage = 17;
}

function showEliasDialogue() {
  choices.innerHTML = `
    <button class="choice-button" onclick="eliasReaction(1)">'Então... eu sou como ela? Uma guardiã?'</button>
    <button class="choice-button" onclick="eliasReaction(2)">'E se essa coisa... for parte de mim?'</button>
  `;
}

function eliasReaction(option) {
  choices.innerHTML = '';
  storyText.textContent = option === 1
    ? "'Talvez. Mas a escolha é sua. Guardar... ou libertar.'"
    : "'Se for... então você precisará aprender a controlar. Antes que ela controle você.'";
  stage = 18;
}

function showNeutralPath() {
  choices.innerHTML = `
    <button class="choice-button" onclick="neutralReaction(1)">'Quem é você? O que quer de mim?'</button>
    <button class="choice-button" onclick="neutralReaction(2)">Ficar em silêncio e observar</button>
  `;
}

function neutralReaction(option) {
  choices.innerHTML = '';
  storyText.textContent = option === 1
    ? "'Eu sou a memória que você tentou esquecer. E estou voltando para tomar o que é meu... você.'"
    : "A sombra ri. 'A indiferença é a melhor armadura... até que ela rache.'";
  stage = 19;
}

// Cena final no terraço
function showTerraceScene() {
  storyText.textContent = "Horas depois, você alcança o terraço do castelo. O vento gélido toca sua pele como um sussurro familiar — frio, mas estranhamente acolhedor.";
  showImage('terraço.png');
  setTimeout(() => hideImage(), 3000);
}

function showEndEpisodeButton() {
  choices.innerHTML = `
    <button class="choice-button" onclick="goToEpisode4()">Fim do Episódio 3 - Ir para o Episódio 4</button>
  `;
}

function goToEpisode4() {
  window.location.href = "episodio4.html";
}

// Controle de imagem do personagem
function showImage(imagePath) {
  character.style.backgroundImage = `url(${imagePath})`;
  character.style.opacity = 1;
}

function hideImage() {
  character.style.opacity = 0;
}
