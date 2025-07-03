// ========================
// 🎮 BLOOD AND SILENCE 🎮
// ========================
// Aguarda o carregamento do DOM
document.addEventListener('DOMContentLoaded', () => {

  // ========================
  // 🔗 Seleção de Elementos
  // ========================
  const storyText       = document.getElementById('story-text');
  const textBox         = document.getElementById('text-box');
  const choices         = document.getElementById('choices');
  const fadeScreen      = document.getElementById('fade-screen');
  const musicFloresta   = document.getElementById('bg-floresta');
  const musicQuarto     = document.getElementById('bg-quarto');
  const startBtn        = document.getElementById('startBtn');
  const volumeBtn       = document.getElementById('volume-toggle');
  const nameInput       = document.getElementById('name-input');
  const nameScreen      = document.getElementById('name-screen');
  const gameContainer   = document.getElementById('game-container');
  const silhouette      = document.getElementById('silhouette');
  const nextEpisodeBtn  = document.getElementById('next-episode-btn');
  const eliasimg = document.getElementById('eliasimg');

  // ========================
  // 🔧 Variáveis de Controle
  // ========================
  let isMuted = false;
  let currentMusic = 'null';
  let stage = 0;
  let waitingForChoice = false;
  let playerName = localStorage.getItem('playerName') || '';

  // ========================
  // 💖 Sistema de Afinidade
  // ========================
  let affinity = JSON.parse(localStorage.getItem('affinity')) || {
    Lucien: 0,
    Elias: 0,
    Klaus: 0,
    Jake: 0
  };

  // ========================
  // 🔈 Volume Inicial
  // ========================
  musicFloresta.volume = 1;

  // ========================
  // 🔇 Controle de Volume
  // ========================
  volumeBtn.addEventListener('click', () => {
    if (musicFloresta.paused) {
      musicFloresta.play().then(() => {
        isMuted = false;
        musicFloresta.muted = false;
        volumeBtn.textContent = '🔊';
      }).catch(err => {
        console.warn('Erro ao tocar música:', err);
      });
    } else {
      isMuted = !isMuted;
      musicFloresta.muted = isMuted;
      volumeBtn.textContent = isMuted ? '🔇' : '🔊';
    }
  });

  // ========================
  // ✍️ Efeito de Digitação
  // ========================
  function typeWriter(text, callback) {
    let i = 0;
    storyText.textContent = '';
    const speed = 30;

    function typing() {
      if (i < text.length) {
        storyText.textContent += text.charAt(i);
        i++;
        setTimeout(typing, speed);
      } else if (callback) {
        callback();
      }
    }
    typing();
  }

  // ========================
  // 🎵 Gerenciamento de Música
  // ========================
  function playFloresta() {
    if (currentMusic === 'floresta') return;
    fadeOut(musicQuarto, () => {
      musicQuarto.pause();
      musicQuarto.currentTime = 0;
      musicFloresta.volume = 0;
      musicFloresta.play().then(() => {
        fadeIn(musicFloresta);
        currentMusic = 'floresta';
      }).catch(e => console.warn("Erro ao tocar bg-floresta:", e));
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

  // ========================
  // 🟢 Início do Jogo
  // ========================
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

    const affinityPanel = document.getElementById('affinity-panel');
    if (affinityPanel) affinityPanel.style.display = 'block';

    musicFloresta.play().then(() => {
      currentMusic = 'floresta';
    }).catch(e => console.warn("Erro ao iniciar música:", e));

    nextScene();
  });

  nextEpisodeBtn.addEventListener('click', () => {
    window.location.href = 'ep2.html';
  });

  //SALVAMENTO DE NOMES DOS JOGADORES
  function startGame() {
  const playerName = document.getElementById('name-input').value.trim();

  if (inputName === "") {
    alert("Por favor, digite seu nome.");
    return;
  }

  // Verifica se o usuário já está autenticado anonimamente
    firebase.auth().signInAnonymously().then(() => {
      const user = firebase.auth().currentUser;
      const playerID = user.uid;

      // Salva no localStorage para a tela inicial identificar depois
      localStorage.setItem('playerID', playerID);
      localStorage.setItem('playerName', playerName);

      firebase.database().ref('players/' + playerID).set({
        name: playerName,
        joinedAt: Date.now()
      });

      document.getElementById('name-screen').style.display = 'none';
      // aqui você inicia o jogo como quiser
    }).catch(error => {
      console.error("Erro ao autenticar:", error);
    });
  }
  
  // ========================
  // ⚡️ Efeitos Visuais
  // ========================

  // Faz a imagem aparecer suavemente
function showCharacter(characterId) {
    const character = document.getElementById(characterId);
    character.style.display = 'block';
    setTimeout(() => {
        character.style.opacity = '1';
    }, 10);
}

// Faz a imagem sumir suavemente
function hideCharacter(characterId) {
    const character = document.getElementById(characterId);
    character.style.opacity = '0';
    setTimeout(() => {
        character.style.display = 'none';
    }, 700); // Tempo igual ao transition do CSS
}


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

  // ========================
  // 💌 Afinidade
  // ========================
  function updateAffinityPanel() {
    document.getElementById('lucien-score').textContent = affinity.Lucien;
    document.getElementById('elias-score').textContent = affinity.Elias;
    document.getElementById('klaus-score').textContent = affinity.Klaus;
    document.getElementById('jake-score').textContent = affinity.Jake;
    document.getElementById('affinity-panel').style.display = 'block';

  }

  function showAffinityMessage(text) {
    const msg = document.getElementById('affinity-message');
    msg.textContent = text;
    msg.style.animation = 'none';
    msg.offsetHeight;
    msg.style.animation = null;
  }

  // ========================
  // 📖 História Principal
  // ========================
  function nextScene() {
    if (waitingForChoice) return;
    textBox.removeEventListener('click', nextScene);

    if (currentMusic !== 'quarto' && stage > 8) playQuarto();

    switch (stage) {
      case 0:
        storyText.textContent = `(Uma inquieta noite... você decidiu caminhar, mas se viu cercada por árvores desconhecidas.)`;
        break;
      case 1:
        storyText.textContent = `(O som de corvos ecoa. Você está tremendo, perdida.)`;
        break;
      case 2:
        storyText.textContent = `(De repente, duas silhuetas surgem entre as árvores.)`;
        showSilhouette();
        break;
      case 3:
        storyText.textContent = `(Um tem olhos de fogo e sorriso arrogante. O outro parece calmo, quase angelical.)`;
        break;
      case 4:
        storyText.textContent = `"Hum... humana perdida?" — diz o rebelde.`;
        break;
      case 5:
        storyText.textContent = `"Ela está assustada. Devemos ajudá-la", diz o de olhos claros.`;
        break;
      case 6:
        storyText.textContent = `(Você sente o coração acelerar. Eles são perigosamente lindos.)`;
        break;
      case 7:
        storyText.textContent = `(O medo domina você. Corre desesperada.)`;
        break;
      case 8:
        storyText.textContent = `*PUM!* Você tropeça, cai... e tudo escurece.`;
        screenShake();
        fadeToBlackAndBack();
        break;
      case 9:
        storyText.textContent = "(Você acorda em uma cama luxuosa, com dor de cabeça.)";
        document.body.classList.add('fade-out');
        setTimeout(() => {
          document.body.classList.remove('fade-out');
          document.body.classList.add('quarto', 'fade-in');
          setTimeout(() => document.body.classList.remove('fade-in'), 1000);
        }, 1000);
        break;
      case 10:
        storyText.textContent = "(O quarto é escuro, iluminado por velas.)";
        break;
      case 11:
        storyText.textContent = "(Você tenta se levantar, mas está fraca. Então ouve passos.)";
        break;
      case 12:
        storyText.textContent = "(O vampiro angelical entra.) __Você desmaiou, mas está segura.";
        showCharacter('eliasimg');
        eliasimg.style.display = 'block';
        setTimeout(() => {
            eliasimg.style.opacity = 1;
        }, 50);
        break;
      case 13:
        storyText.textContent = "(O rebelde aparece, cruzando os braços.) __Eu disse que ela não aguentaria.";
        hideCharacter('eliasimg');
        eliasimg.style.opacity = 0;
        setTimeout(() => {
          eliasimg.style.display = 'none';
        }, 500);
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

  // ========================
  // 🔥 Primeira Escolha
  // ========================
  function showFirstChoices() {
    waitingForChoice = true;
    storyText.textContent = "(Eles te olham, esperando sua reação.)";

    setTimeout(() => {
      choices.innerHTML = `
        <button class="choice-button" onclick="chooseFirst(1)">‘O que vocês fizeram comigo? Fiquem longe!’</button>
        <button class="choice-button" onclick="chooseFirst(2)">‘Obrigada por me ajudarem... eu acho.’</button>
      `;
    }, 3000);
  }

  window.chooseFirst = function(option) {
    waitingForChoice = false;
    choices.innerHTML = '';

    if (option === 1) {
      storyText.textContent = "(Lucien sorri com sarcasmo.) 'Nada... ainda.'";
      affinity.Lucien += 1;
      showAffinityMessage("+1 Afinidade com Lucien ❤️");
    } else if (option === 2) {
      storyText.textContent = "(Elias sorri levemente.) — Você está segura.";
      affinity.Elias += 1;
      showAffinityMessage("+1 Afinidade com Elias 💙");
    }

    updateAffinityPanel();
    stage = 15;
    textBox.addEventListener('click', nextScene);
  };

  // ========================
  // 💘 Escolha Final
  // ========================
  function showFinalChoices() {
    waitingForChoice = true;
    storyText.textContent = "Você sente tensão no ar... e algo irresistível.";
    choices.innerHTML = `
      <button class="choice-button" onclick="chooseFinal(1)">Olhar para Lucien com curiosidade</button>
      <button class="choice-button" onclick="chooseFinal(2)">Confiar mais em Elias</button>
      <button class="choice-button" onclick="chooseFinal(3)">Dar um passo atrás e observar</button>
    `;
    textBox.removeEventListener('click', nextScene);
  }

  window.chooseFinal = function(option) {
    waitingForChoice = false;
    choices.innerHTML = '';

    if (option === 1) {
      storyText.textContent = "(Lucien levanta uma sobrancelha.) — Gosto do seu olhar.";
      affinity.Lucien += 2;
      showAffinityMessage("+2 Romance com Lucien ❤️");
    } else if (option === 2) {
      storyText.textContent = "(Elias se aproxima calmamente.) 'Você tem um coração gentil.'";
      affinity.Elias += 2;
      showAffinityMessage("+2 Romance com Elias 💙");
    } else {
      storyText.textContent = "Você respira fundo e recua. Precisa entender antes de confiar.";
    }

    updateAffinityPanel();
    stage = 18;
    textBox.addEventListener('click', nextScene);
  };

  // ========================
  // 🚩 Definir Rota Final
  // ========================
  function defineRoute() {
    setTimeout(() => {
      let message = "";

      if (affinity.Lucien > affinity.Elias) {
        message = "Algo em Lucien te atrai. Um mistério perigoso... mas irresistível.";
      } else if (affinity.Elias > affinity.Lucien) {
        message = "Elias transmite calma. Sua presença acalma sua alma.";
      } else {
        message = "Ambos despertam algo em você, mas ainda é cedo para entender.";
      }

      storyText.textContent = message;
      localStorage.setItem('affinity', JSON.stringify(affinity));

      setTimeout(() => {
        storyText.textContent += "O que se aproxima carrega o poder de mudar tudo.";
      }, 1000);

      setTimeout(() => {
        choices.innerHTML = `
          <button class="choice-button" onclick="goToNext()">Avançar para o capítulo 2</button>
        `;
      }, 4500);
    }, 1500);
  }

  window.goToNext = function() {
    window.location.href = 'capitulo2.html';
  };

  // ========================
  // 👉 Clique para Avançar
  // ========================
  textBox.addEventListener('click', nextScene);
});
