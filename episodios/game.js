document.addEventListener('DOMContentLoaded', () => {
  const storyText       = document.getElementById('story-text');
  const textBox         = document.getElementById('text-box');
  const choices         = document.getElementById('choices');

  const fadeScreen      = document.getElementById('fade-screen');
  const musicFloresta   = document.getElementById('bg-floresta');
  const musicQuarto     = document.getElementById('bg-quarto');
  const startBtn        = document.getElementById('startBtn');
  const nameInput       = document.getElementById('name-input');
  const nameScreen      = document.getElementById('name-screen');
  const gameContainer   = document.getElementById('game-container');
  const silhouette      = document.getElementById('silhouette');
  const nextEpisodeBtn  = document.getElementById('next-episode-btn');

  let currentMusic = 'floresta';
  let stage = 0;
  let waitingForChoice = false;
  let musicStarted = false;
  let playerName = localStorage.getItem('playerName') || '';

  let affinity = JSON.parse(localStorage.getItem('affinity')) || {
    Lucien: 0,
    Elias: 0,
  };

  // === Função de efeito de digitação===
  function typeWriter(text, callback){
    let i = 0;
    storyText.textContent = '';
    const speed = 30;

    function typing(){
      if (i < text.length){
      storyText.textContent += text.charAt(i);
      i++;
      setTimeout(typing, speed);
      } else if (callback){
        callback();
      }
    }
    typing();
   }

  if (playerName) {
    nameScreen.style.display = 'none';
    gameContainer.style.display = 'block';
  }

  // ================= Música ===================

  function playFloresta() {
    if (currentMusic === 'floresta') return;
    fadeOut(musicQuarto, () => {
      musicQuarto.pause();
      musicQuarto.currentTime = 0;
      musicFloresta.volume = 0;
      musicFloresta.play();
      fadeIn(musicFloresta);
      currentMusic = 'floresta';
    });
  }

  function playQuarto() {
    if (currentMusic === 'quarto') return;
    fadeOut(musicFloresta, () => {
      musicFloresta.pause();
      musicFloresta.currentTime = 0;
      musicQuarto.volume = 0;
      musicQuarto.play();
      fadeIn(musicQuarto);
      currentMusic = 'quarto';
    });
  }

  function fadeOut(audioElement, callback) {
    let fadeAudio = setInterval(() => {
      if (audioElement.volume > 0.05) {
        audioElement.volume -= 0.05;
      } else {
        audioElement.volume = 0;
        clearInterval(fadeAudio);
        if (callback) callback();
      }
    }, 100);
  }

  function fadeIn(audioElement) {
    let volume = 0;
    let fadeAudio = setInterval(() => {
      if (volume < 0.95) {
        volume += 0.05;
        audioElement.volume = volume;
      } else {
        audioElement.volume = 1;
        clearInterval(fadeAudio);
      }
    }, 100);
  }

  // ============= Eventos ==============

  startBtn.addEventListener('click', () => {
    const name = nameInput.value.trim();
    if (!name) {
      alert('Por favor, digite seu nome.');
      return;
    }
    playerName = name;
    localStorage.setItem('playerName', name);
    nameScreen.style.display = 'none';
    gameContainer.style.display = 'block';

    const affinityPanel = document.getElementById('affinity-panel');
    if (affinityPanel) affinityPanel.style.display = 'block';

    nextScene();
  });

  textBox.addEventListener('click', nextScene);

  nextEpisodeBtn.addEventListener('click', () => {
    window.location.href = 'ep2.html';
  });

  // ============= Efeitos Visuais ==============

  function fadeToBlackAndBack() {
    fadeScreen.style.opacity = 1;
    setTimeout(() => {
      fadeScreen.style.opacity = 0;
    }, 1500);
  }

  function showSilhouette() {
    silhouette.style.display = 'block';
    setTimeout(() => silhouette.style.opacity = 1, 50);
    setTimeout(() => {
      silhouette.style.opacity = 1;
      setTimeout(() => silhouette.style.display = 'none', 1500);
    }, 2000);
  }

  function screenShake() {
    gameContainer.classList.add('shake');
    setTimeout(() => {
      gameContainer.classList.remove('shake');
    }, 500);
  }

  // ============= Afinidade ==============

  function updateAffinityPanel() {
    document.getElementById('lucien-score').textContent = affinity.Lucien;
    document.getElementById('elias-score').textContent = affinity.Elias;
    document.getElementById('klaus-score').textContent = affinity.Klaus;
    document.getElementById('jake-score').textContent = affinity.Jake;
  }

  function showAffinityMessage(text) {
    const msg = document.getElementById('affinity-message');
    msg.textContent = text;
    msg.style.animation = 'none';
    msg.offsetHeight;
    msg.style.animation = null;
  }

  // ============= História Principal ==============

  function nextScene() {
    if (waitingForChoice) return;

    textBox.removeEventListener('click', nextScene);

    if (currentMusic !== 'quarto' && stage > 8) {
      playQuarto();
    }

    switch (stage) {
      case 0:
        storyText.textContent = `(Uma inquieta noite a cidade era coberta por uma densa neblina... Você decidiu caminhar para clarear a mente, mas logo se viu cercada por árvores desconhecidas.)`;
        break;
      case 1:
        storyText.textContent = `(O som de corvos ecoa. Você está tremendo, perdida, sem saber para onde ir.)`;
        break;
      case 2:
        storyText.innerHTML = `(De repente, duas silhuetas surgem entre as árvores.)`;
        showSilhouette();
        break;
      case 3:
        storyText.textContent = `(Um deles tem olhos de fogo e um sorriso arrogante. O outro parece calmo, quase angelical.)`;
        break;
      case 4:
        storyText.textContent = `"Hum... humana perdida?" — diz o rebelde, com a voz rouca.`;
        break;
      case 5:
        storyText.textContent = `"Ela está assustada. Devemos ajudá-la", diz o de olhos claros, quase sussurrando.`;
        break;
      case 6:
        storyText.textContent = `(Você sente o coração acelerar. Eles são lindos... perigosamente lindos.)`;
        break;
      case 7:
        storyText.textContent = `(O medo domina seu corpo. Você vira e corre.)`;
        break;
      case 8:
        storyText.textContent = `*PUM!* Você tropeça, cai... e tudo escurece.`;
        screenShake();
        fadeToBlackAndBack();
        break;
      case 9:
        storyText.textContent = "(Uma dor de cabeça intensa... você acorda em uma cama luxuosa.)";
        document.body.classList.add('fade-out');
        setTimeout(() => {
          document.body.classList.remove('fade-out');
          document.body.classList.add('quarto');
          document.body.classList.add('fade-in');
          setTimeout(() => {
            document.body.classList.remove('fade-in');
          }, 1000);
        }, 1000);
        break;
      case 10:
        storyText.textContent = "(O quarto é escuro, decorado com velas, cortinas pesadas... e um aroma adocicado no ar.)";
        break;
      case 11:
        storyText.textContent = "(Você tenta se levantar, mas se sente fraca. Então, ouve passos.)";
        break;
      case 12:
        storyText.textContent = "(O vampiro de olhos angelicais entra lentamente.) __Você desmaiou... mas está segura agora.";
        break;
      case 13:
        storyText.textContent = "(Logo em seguida, o rebelde entra, encostado na parede.) __Eu disse que ela não aguentaria. Frágil... mas intrigante.";
        break;
      case 14:
        showFirstChoices();
        return;
      case 15:
        break;
      case 16:
      showFinalChoices();
      return;
      case 17:
        break;
         case 18:
        defineRoute();
        return;
        default:
        return;
    }
    textBox.addEventListener('click', nextScene);
    stage++;
  }

function showFirstChoices() {
  waitingForChoice = true;
  storyText.textContent = "(Lucien encosta na parede, cruzando os braços.) — Eu disse que ela não aguentaria. Frágil... mas intrigante.";

  setTimeout(() => {
    waitingForChoice = true;
    storyText.textContent = "Eles te observam em silêncio, como se esperassem algo de você. Seu coração bate acelerado.";
    choices.innerHTML = `
      <button class="choice-button" onclick="chooseFirst(1)">‘O que vocês fizeram comigo? Fiquem longe!’</button>
      <button class="choice-button" onclick="chooseFirst(2)">‘Obrigada por me ajudarem... eu acho.’</button>
    `;
  }, 3000); // Tempo antes de aparecer as escolhas
}


window.chooseFirst = function(option) {
  waitingForChoice = false;
  choices.innerHTML = '';

  if (option === 1) {
    storyText.textContent = "(Lucien sorri com sarcasmo.) 'Nada... ainda.' (Elias lança um olhar severo para ele.)";
    affinity.Lucien += 1;
    showAffinityMessage("+1 Afinidade com Lucien ❤️ — Ele admira sua coragem.");
  } else if (option === 2) {
    storyText.textContent = "(Elias sorri levemente.) — Você está segura. Tentamos não assustá-la.";
    affinity.Elias += 1;
    showAffinityMessage("+1 Afinidade com Elias 💙 — Sua gentileza o tocou.");
  }

  updateAffinityPanel();
  stage = 15;
  textBox.addEventListener('click', nextScene);
};


  function showFinalChoices() {
    waitingForChoice = true;
    storyText.textContent = "Você sente que há tensão entre eles... e também algo irresistível.";
    choices.innerHTML = `
      <button class="choice-button" onclick="chooseFinal(1)">Olhar para Lucien com curiosidade</button>
      <button class="choice-button" onclick="chooseFinal(2)">Confiar mais em Elias</button>
      <button class="choice-button" onclick="chooseFinal(3)">Dar um passo atrás. Precisa entender o que está acontecendo primeiro.</button>
    `;
    textBox.removeEventListener('click', nextScene);
  }

  window.chooseFinal = function(option) {

    waitingForChoice = false;
    choices.innerHTML = '';


    if (option === 1) {
      storyText.textContent = "(Lucien levanta uma sobrancelha.) — Gosto do seu olhar. Você não tem medo fácil.";
      affinity.Lucien += 2;
      showAffinityMessage("+2 de Romance com Lucien ❤️");
    } else if (option === 2) {
      storyText.textContent = "(Elias se aproxima calmamente.) 'Você tem um coração gentil. Isso é raro aqui.'";
      affinity.Elias += 2;
      showAffinityMessage("+2 de Romance com Elias 💙");
    } else {
      storyText.textContent = "Você respira fundo e recua. Precisa entender tudo antes de confiar em alguém.";
    }

    updateAffinityPanel();
      stage = 18;
    textBox.addEventListener('click', nextScene);
  
  };

  function defineRoute() {
    setTimeout(() => {
       let message = "";
      if (affinity.Lucien > affinity.Elias) {
         message  = "Há algo em Lucien que te atrai. Um mistério perigoso... mas irresistível..";
      } else if (affinity.Elias > affinity.Lucien) {
          message = "Elias transmite calma. Sua presença acalma sua alma e confunde sua mente.";
      } else {
         message = "Ambos despertam algo em você, mas ainda é cedo para entender. O que eles escondem vai mudar tudo.";
      }
       storyText.textContent = message;
      localStorage.setItem('affinity', JSON.stringify(affinity));

      setTimeout(() => {
        storyText.textContent += " E o que está por vir... pode mudar o destino de todos.";
      }, 1000);

      setTimeout(() => {
        choices.innerHTML = `
          <button class="choice-button" onclick="goToNext()">Avançar para o capítulo 2</button>
        `;
      }, 4500);
    }, 1500);
  }

  window.goToNext = function() {
    window.location.href = 'ep.html';
  };
});
