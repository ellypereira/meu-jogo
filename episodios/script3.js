// Elementos da interface
const storyText = document.getElementById('story-text');
const textBox = document.getElementById('text-box');
const choices = document.getElementById('choices');
const bgMusic = document.getElementById('bg-music');
const character = document.getElementById('character');

// Estado do jogo
let stage = 0;
let musicStarted = false;
let waiting = false;
let isChoosing = false;  // controla se está no momento de escolha

// Afinidades dos personagens
const lucienAffinity = parseInt(localStorage.getItem('lucienAffinity')) || 0;
const eliasAffinity = parseInt(localStorage.getItem('eliasAffinity')) || 0;

// Evento principal ao clicar no texto
textBox.addEventListener('click', () => {
  if (waiting) return;       // bloqueia clique se estiver aguardando algo
  if (isChoosing) return;    // bloqueia clique se estiver esperando escolha

  if (stage <= 6) {
    nextScene();
  } else {
    continueAfterChoice();
  }
});

// Inicia a música de fundo, se ainda não começou
function playMusic() {
  if (!musicStarted) {
    bgMusic.play();
    musicStarted = true;
  }
}

// Avança nas cenas iniciais até a escolha
function nextScene() {
  switch (stage) {
    case 0:
      playMusic();
      storyText.textContent = "(Um dia se passou. Elias e Lucien foram atenciosos, falaram sobre o colar... O mesmo que perdi no orfanato anos atrás. Disseram que ele pertencia à minha mãe, que era uma Guardiã do Limiar — alguém que mantinha o equilíbrio entre o mundo dos vivos e o das sombras.)";
      break;

    case 1:
      storyText.textContent = "(Contaram sobre rituais antigos, não de magia comum, mas vínculos de sangue e alma. Minha mãe se ofereceu como âncora entre os dois mundos, selando algo... ou alguém. O colar era a chave — ou o grilhão.)";
      // scrollToBottom();
      break;

    case 2:
      storyText.textContent = "Não foi fácil aceitar que os vampiros me vigiam desde que nasci, não por acaso nem compaixão, mas porque acreditam que herdei o papel da minha mãe — ou algo ainda mais perigoso. Hoje, Elias me deu um colar, talvez o mesmo de antes, restaurado, para minha proteção. Ao tocá-lo, ouvi vozes antigas, sussurros que atravessaram minha pele e chegaram ao meu sangue. Eles me chamavam...";
      // scrollToBottom();
      break;

    case 3:
      waiting = true;
      showWhispers(() => {
        waiting = false;
        stage++;
      });
      return; // espera o callback antes de continuar

    case 4:
      storyText.textContent = "As imagens invadem sua cabeça. Você vê uma garota... você mesma... cercada por sombras.";
      showImage('garota-sombras.png');
      // scrollToBottom();
      break;

    case 5:
      waiting = true;
      storyText.textContent = "(Ela grita, você grita. Mas ninguém ouve... O som morre antes mesmo de escapar de sua garganta. O ar nega o som; o silêncio pesa mais que a escuridão.)";
      // scrollToBottom();

      setTimeout(() => {
        storyText.textContent += "— Você sempre pertenceu à escuridão. (A voz não sussurra — ela decreta. Uma sentença antiga, dita por quem já venceu.)";
        hideImage();
        waiting = false;
        stage++;
        // scrollToBottom();
      }, 1500);
      return; // aguarda timeout

    case 6:
      showPostVisionChoices();
      break;
  }
  stage++;
}

// Sequência de sussurros (visão)
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
    // scrollToBottom();
    if (index >= whispers.length) {
      clearInterval(interval);
      setTimeout(callback, 1000);
    }
  }, 1500);
}

// Mostrar opções após visão
function showPostVisionChoices() {
  isChoosing = true;  // começa o modo escolha, bloqueia avanço pelo texto
  storyText.textContent = "(Você desperta com um sobressalto. Não dormia, mas emergiu de um sonho sombrio. O quarto permanece envolto em sombras; as velas tremem, lembrando o que viu. O colar está quente e pulsante na sua mão. Algo mudou — não só ao seu redor, mas dentro de você.)";
  // scrollToBottom();
  choices.innerHTML = `
    <button class="choice-button" onclick="chooseReaction(1)">Jogar o colar longe, em pânico</button>
    <button class="choice-button" onclick="chooseReaction(2)">Segurar o colar com força, determinada</button>
  `;
}

// Reação após escolha
function chooseReaction(option) {
  isChoosing = false; // desbloqueia após escolha
  choices.innerHTML = '';
  storyText.textContent = option === 1
    ? "Você o lança para longe. Seu coração bate descompassado. Está assustada, mas viva."
    : "Você fecha os dedos sobre ele. Se há algo obscuro em seu passado, você vai enfrentá-lo.";
  // scrollToBottom();
  stage = 7;
}

// Continuação do jogo após escolha
function continueAfterChoice() {
  switch (stage) {
    case 7:
      if (lucienAffinity > eliasAffinity) {
        storyText.textContent = "Lucien aparece à porta, arqueando uma sobrancelha, como se a cena diante dele fosse uma piada velha. Os olhos escuros brilham com escárnio — ele já sabia.";
        showImage('lucien.png');
        // scrollToBottom();
        stage = 8;
      } else if (eliasAffinity > lucienAffinity) {
        storyText.textContent = "(Elias se aproxima, preocupado.) 'Você... viu alguma coisa, não foi?'";
        showImage('elias.jpg');
        // scrollToBottom();
        stage = 10;
      } else {
        storyText.textContent = "Você ouve passos se aproximando... mas não sabe quem vem.";
        // scrollToBottom();
        stage = 12;
      }
      break;

    case 8:
      storyText.textContent = "'Você tocou, não foi?' — a voz de Lucien é baixa, carregada como um presságio. 'O colar... Isso nunca deveria ter acontecido.' A fúria arde em seus olhos, contida, mas prestes a transbordar.";
      hideImage();
      // scrollToBottom();
      stage++;
      break;

    case 9:
      storyText.textContent = "'Foi Elias, não foi?' — Lucien murmura, os olhos fixos no colar. 'Ele nunca deveria ter te dado isso, e o colar não deveria ter reagido a você.' Um silêncio pesado cai. Nos olhos dele, um temor antigo.";
      showLucienDialogue();
      // scrollToBottom();
      stage = 14;
      break;

    case 10:
      showEliasDialogue();
      // scrollToBottom();
      setTimeout(hideImage, 3000);
      stage = 15;
      break;

    case 12:
      storyText.textContent = "Uma voz estranha ecoa atrás de você. 'Você despertou algo... e agora, não há como voltar.'";
      // scrollToBottom();
      stage++;
      break;

    case 13:
      showNeutralPath();
      // scrollToBottom();
      stage = 16;
      break;

    // Caminho neutro (stages 16 a 18)
    case 16:
      stage = 17;
      break;

    case 17:
      storyText.textContent = "Um eco distante responde ao seu grito...";
      // scrollToBottom();
      stage++;
      break;

    case 18:
      showTerraceScene();
      stage = 20;
      break;

    // Fluxo terraço
    case 19:
      showTerraceScene();
      stage++;
      break;

    case 20:
      storyText.textContent = "(Fragmentos... Vozes...)";
      // scrollToBottom();
      stage++;
      break;

    case 21:
      storyText.textContent = "(Por que Elias e Lucien conhecem partes de você que nem você entende?)";
      // scrollToBottom();
      stage++;
      break;

    case 22:
      storyText.textContent = "(O colar... Tudo aponta para um passado esquecido.)";
      // scrollToBottom();
      stage++;
      break;

    case 23:
      storyText.textContent = "Você inspira lentamente, deixando o silêncio da noite envolver seus pensamentos. As respostas virão... no tempo certo.";
      // scrollToBottom();
      showEndEpisodeButton();
      stage++;
      break;
  }
}

// Diálogos alternativos

function showLucienDialogue() {
  isChoosing = true;  // bloqueia avanço até escolher uma reação
  choices.innerHTML = `
    <button class="choice-button" onclick="lucienReaction(1)">'Se Elias me deu, é porque confiava em mim.'</button>
    <button class="choice-button" onclick="lucienReaction(2)">'Fique em silêncio e apenas observe Lucien.'</button>
  `;
}

function lucienReaction(option) {
  isChoosing = false; // desbloqueia após escolher
  choices.innerHTML = '';
  storyText.textContent = option === 1
    ? "Lucien se aproxima. '(Lucien revira os olhos e sai do quarto).'"
    : "Lucien mantém distância, os olhos carregados de julgamento e dor. 'Você ainda não entende o que está em jogo.'";
  // scrollToBottom();
  stage = 14;
}

function showEliasDialogue() {
  storyText.textContent = "Elias segura sua mão. 'Nunca quis te assustar, mas essa responsabilidade pode ser mais pesada do que imaginamos.'";
  // scrollToBottom();
}

function showNeutralPath() {
  storyText.textContent = "Você sente um vazio, uma indiferença que cresce. O mundo parece continuar sem você.";
  // scrollToBottom();
}

// Mostrar e esconder imagens

function showImage(src) {
  character.src = src;
  character.style.display = 'block';
}

function hideImage() {
  character.style.display = 'none';
}

// Cena do terraço

function showTerraceScene() {
  storyText.textContent = "...Horas depois. Você está no terraço, a noite se estende ao seu redor, estrelas distantes e o vento frio trazendo promessas e mistérios.";
  // scrollToBottom();
  hideImage();
}

// Botão para finalizar episódio

function showEndEpisodeButton() {
  choices.innerHTML = `
    <button class="choice-button" onclick="goToEpisode4()">Fim do Episódio 3 - Ir para o Episódio 4</button>
  `;
}

function goToEpisode4() {
  window.location.href = "episodio4.html";
}