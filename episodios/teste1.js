document.addEventListener('DOMContentLoaded', () => {
  const storyText       = document.getElementById('story-text');
  const textBox         = document.getElementById('text-box');
  const choices         = document.getElementById('choices');
  const fadeScreen      = document.getElementById('fade-screen');
  const bgMusic         = document.getElementById('bg-music');
  const startBtn        = document.getElementById('startBtn');
  const nameInput       = document.getElementById('name-input');
  const nameScreen      = document.getElementById('name-screen');
  const gameContainer   = document.getElementById('game-container');
  const silhouette      = document.getElementById('silhouette');
  const nextEpisodeBtn  = document.getElementById('next-episode-btn');

  let stage = 0;
  let musicStarted = false;
  let playerName = localStorage.getItem('playerName') || '';

  let affinity = JSON.parse(localStorage.getItem('affinity')) || {
    Lucien: 0,
    Elias: 0,
    Klaus: 0,
    Jake: 0
  };

  if (playerName) {
    nameScreen.style.display = 'none';
    gameContainer.style.display = 'block';
  }

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

      // 👉 Exibir o painel de afinidade
  const affinityPanel = document.getElementById('affinity-panel');
  if (affinityPanel) affinityPanel.style.display = 'block';

    nextScene();
  });

  textBox.addEventListener('click', nextScene);
  nextEpisodeBtn.addEventListener('click', () => {
    window.location.href = 'ep2.html';
  });

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
  msg.offsetHeight; // força o reflow para reiniciar animação
  msg.style.animation = null;
}


  function playMusicOnce() {
    if (!musicStarted) {
      bgMusic.play();
      musicStarted = true;
    }
  }

function showSilhouette() {
  const silhouette = document.getElementById('silhouette');
  silhouette.style.display = 'block';
  setTimeout(() => silhouette.style.opacity = 1, 50);
  setTimeout(() => {
    silhouette.style.opacity = 1;
    setTimeout(() => silhouette.style.display = 'none', 1500);
  }, 2000);
}

  function triggerFadeOut() {
    fadeScreen.classList.add('show');
    setTimeout(() => {
      nextEpisodeBtn.style.display = 'block';
    }, 2500);
  }

  function nextScene() {
    playMusicOnce();

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
        break;
      case 9:
        storyText.textContent = "(Uma dor de cabeça intensa... você acorda em uma cama luxuosa.)";
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
        showFinalChoices();
        return;
      case 16:
        defineRoute();
        return;
      default:
        return;
    }

    stage++;
  }

  function showFirstChoices() {
    choices.innerHTML = `
      <button class="choice-button" onclick="chooseFirst(1)">‘O que vocês fizeram comigo?’</button>
      <button class="choice-button" onclick="chooseFirst(2)">‘Obrigada por me ajudarem... eu acho.’</button>
    `;
  }

  window.chooseFirst = function(option) {
    choices.innerHTML = '';
    if (option === 1) {
      storyText.textContent = "(Lucien sorri com sarcasmo.) 'Nada... ainda.' (Elias olha para ele, desaprovando.)";
      affinity.Lucien += 1;
      showAffinityMessage("+1 de Romance com Lucien ❤️");
    } else {
      storyText.textContent = "(Elias sorri levemente.) __Você está segura. Tentamos não assustá-la.";
      affinity.Elias += 1;
      showAffinityMessage("+1 de Romance com Elias 💙");
    }
      updateAffinityPanel();
    stage = 15;
  };

  function showFinalChoices() {
    setTimeout(() => {
      storyText.textContent = "Eles trocam olhares. Você sente que há tensão entre eles... e também algo irresistível.";
      choices.innerHTML = `
        <button class="choice-button" onclick="chooseFinal(1)">Olhar para Lucien com curiosidade</button>
        <button class="choice-button" onclick="chooseFinal(2)">Confiar mais em Elias</button>
        <button class="choice-button" onclick="chooseFinal(3)">Evitar ambos e focar em entender o que está acontecendo</button>
      `;
    }, 1000);
  }

  window.chooseFinal = function(option) {
    choices.innerHTML = '';
    if (option === 1) {
      storyText.textContent = "(Lucien levanta uma sobrancelha.) 'Gosto de você.'";
      affinity.Lucien += 2;
      showAffinityMessage("+2 de Romance com Lucien ❤️");
    } else if (option === 2) {
      storyText.textContent = "(Elias se aproxima calmamente.) 'Você tem um coração gentil. Isso é raro aqui.'";
      affinity.Elias += 2;
      showAffinityMessage("+2 de Romance com Elias 💙");
    } else {
      storyText.textContent = "Você recua instintivamente. Algo está errado... mas não é só sobre eles.";
    }
      updateAffinityPanel();
    stage = 16;
  };

  function defineRoute() {
    setTimeout(() => {
      if (affinity.Lucien > affinity.Elias) {
        storyText.textContent = "Você sente uma atração perigosa por Lucien. Sua jornada seguirá por caminhos sombrios...";
      } else if (affinity.Elias > affinity.Lucien) {
        storyText.textContent = "Você confia em Elias. Sua alma se conecta com a dele de forma misteriosa.";
      } else {
        storyText.textContent = "Você ainda não tem certeza... mas sabe que os dois escondem segredos profundos.";
      }

      localStorage.setItem('affinity', JSON.stringify(affinity));

      setTimeout(() => {
        storyText.textContent += " Mas algo está prestes a acontecer... algo que nenhum dos dois espera.";
      }, 1000);

      setTimeout(() => {
        choices.innerHTML = `
          <button class="choice-button" onclick="goToNext()">Episódio 3</button>
        `;
      }, 4500);
    }, 1500);
  }

  window.goToNext = function() {
    window.location.href = 'ep3.html';
  };
});
