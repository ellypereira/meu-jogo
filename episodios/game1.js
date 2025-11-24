// ========================
// 🎮 BLOOD AND SILENCE 🎮
// ========================
document.addEventListener('DOMContentLoaded', () => {

  // 🔗 Seleção de Elementos
  const storyText = document.getElementById('story-text');
  const textBox = document.getElementById('text-box');
  const choices = document.getElementById('choices');
  const fadeScreen = document.getElementById('fade-screen');
  const musicFloresta = document.getElementById('bg-floresta');
  const musicQuarto = document.getElementById('bg-quarto');
  const startBtn = document.getElementById('startBtn');
  const volumeBtn = document.getElementById('volume-toggle');
  const nameInput = document.getElementById('name-input');
  const nameScreen = document.getElementById('name-screen');
  const gameContainer = document.getElementById('game-container');
  const silhouette = document.getElementById('silhouette');
  const nextEpisodeBtn = document.getElementById('next-episode-btn');
  const eliasimg = document.getElementById('eliasimg');

  // 🔧 Variáveis de Controle
  let isMuted = false;
  let currentMusic = 'null';
  let stage = 0;
  let waitingForChoice = false;
  let playerName = localStorage.getItem('playerName') || '';

  // 💖 Sistema de Afinidade
  function showAffinityPanel() {
    const panel = document.getElementById('affinity-panel');
    panel.classList.add('show');
    setTimeout(() => panel.classList.remove('show'), 5000);
  }

  let affinity = JSON.parse(localStorage.getItem('affinity')) || {
    Lucien: 0,
    Elias: 0,
    Klaus: 0,
    Jake: 0
  };

  // 🔈 Volume Inicial
  musicFloresta.volume = 1;

  // 🔇 Controle de Volume
  volumeBtn.addEventListener('click', () => {
    if (musicFloresta.paused && musicQuarto.paused) {
      musicFloresta.play().then(() => {
        isMuted = false;
        musicFloresta.muted = false;
        musicQuarto.muted = false;
        volumeBtn.textContent = '🔊';
      }).catch(err => console.warn('Erro ao tocar música:', err));
    } else {
      isMuted = !isMuted;
      musicFloresta.muted = isMuted;
      musicQuarto.muted = isMuted; 
      volumeBtn.textContent = isMuted ? '🔇' : '🔊';
    }
  });

  // ✍️ Efeito de Digitação (opcional)
  function typeWriter(text, callback) {
    let i = 0;
    storyText.textContent = '';
    const speed = 30;
    function typing() {
      if (i < text.length) {
        storyText.textContent += text.charAt(i);
        i++;
        setTimeout(typing, speed);
      } else if (callback) callback();
    }
    typing();
  }

  // 🎵 Gerenciamento de Música
  function playFloresta() {
    if (currentMusic === 'floresta') return;
    fadeOut(musicQuarto, () => {
      musicQuarto.pause();
      musicQuarto.currentTime = 0;
      musicFloresta.volume = 0;
      musicFloresta.play().then(() => {
        fadeIn(musicFloresta);
        currentMusic = 'floresta';
      });
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

  function fadeOut(audio, callback) {
    let fade = setInterval(() => {
      if (audio.volume > 0.05) {
        audio.volume -= 0.05;
      } else {
        audio.volume = 0;
        clearInterval(fade);
        if (callback) callback();
      }
    }, 100);
  }

  function fadeIn(audio) {
    let volume = 0;
    let fade = setInterval(() => {
      if (volume < 0.95) {
        volume += 0.05;
        audio.volume = volume;
      } else {
        audio.volume = 1;
        clearInterval(fade);
      }
    }, 100);
  }

  // Início Automático
  if (playerName) {
    nameScreen.style.display = 'none';
    gameContainer.style.display = 'block';
  }

  // Início do Jogo
  startBtn.addEventListener('click', startGame);

  function startGame() {
    const name = nameInput.value.trim();
    if (!name) {
      alert('Por favor, digite seu nome.');
      return;
    }
    playerName = name;
    localStorage.setItem('playerName', name);

    // Firebase
    firebase.auth().signInAnonymously().then((userCredential) => {
      const playerID = userCredential.user.uid;
      localStorage.setItem('playerID', playerID);

      firebase.database().ref('players/' + playerID).set({
        name: playerName,
        joinedAt: Date.now()
      });

      nameScreen.style.display = 'none';
      gameContainer.style.display = 'block';
      document.getElementById('affinity-panel').style.display = 'block';

      musicFloresta.play().then(() => {
        currentMusic = 'floresta';
      });

      nextScene();
    }).catch(error => console.error("Erro ao autenticar:", error));
  }

  // Efeitos Visuais
  function fadeToBlackAndBack() {
    fadeScreen.style.opacity = 1;
    setTimeout(() => fadeScreen.style.opacity = 0, 1500);
  }

  function showSilhouette() {
    silhouette.classList.remove('fade-out');
    silhouette.style.display = 'block';
    setTimeout(() => silhouette.classList.add('fade-in'), 50);
    setTimeout(() => {
      silhouette.classList.remove('fade-in');
      silhouette.classList.add('fade-out');
    }, 2500);
    setTimeout(() => silhouette.style.display = 'none', 3000);
  }

  function showCharacter(id) {
    const el = document.getElementById(id);
    el.style.display = 'block';
    setTimeout(() => el.style.opacity = 1, 10);
  }

  function hideCharacter(id) {
    const el = document.getElementById(id);
    el.style.opacity = 0;
    setTimeout(() => el.style.display = 'none', 700);
  }

  function screenShake() {
    gameContainer.classList.add('shake');
    setTimeout(() => gameContainer.classList.remove('shake'), 500);
  }

  // Afinidade
  function updateAffinityPanel() {
    document.getElementById('lucien-score').textContent = affinity.Lucien;
    document.getElementById('elias-score').textContent = affinity.Elias;
    document.getElementById('klaus-score').textContent = affinity.Klaus;
    document.getElementById('jake-score').textContent = affinity.Jake;
    document.getElementById('affinity-panel').style.display = 'block';
  }

  function showAffinityMessage(text) {
    const msg = document.getElementById('affinity-message');
    const panel = document.getElementById('affinity-panel');

    msg.textContent = text;
    // resetar qualquer fade-out anterior 
    panel.classList.remove('fade-out');
    panel.style.display = 'block';

    // forçar reflow para reiniciar animaçãp
    panel.offsetHeight;

  // Iniciar desaparecimento automático
  setTimeout(() => {
    panel.classList.add('fade-out');
    setTimeout(() => {
      panel.style.display = 'none';
      panel.classList.remove('fade-out');
    }, 1000); // Tempo do fade
  }, 2500); // Tempo visível
}
  // História
  function nextScene() {
    if (waitingForChoice) return;

    // 💰 TENTAR GASTAR 1 PA ANTES DE AVANÇAR
  if (typeof tentarGastarPA === "function") {
    const ok = tentarGastarPA(1);
    if (!ok) {
      // Sem PA → não avança a cena
      return;
    }
  }
  
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
        storyText.textContent = `(O pânico te paralisa por um instante… depois, você corre, movida apenas pelo desespero.)`;
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
        break;
      case 13:
        storyText.textContent = "(O rebelde aparece, cruzando os braços.) __Eu disse que ela não aguentaria.";
        hideCharacter('eliasimg');
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
    } else {
      storyText.textContent = "(Elias sorri levemente.) — Você está segura.";
      affinity.Elias += 1;
      showAffinityMessage("+1 Afinidade com Elias 💙");
    }
    updateAffinityPanel();
    stage = 15;
    textBox.addEventListener('click', nextScene);
  };

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
    setTimeout(() => {
    textBox.addEventListener('click', nextScene);
  }, 1500);
};

  function defineRoute() {
    setTimeout(() => {
      let message = "";
      let rotaEscolhida = "";

      if (affinity.Lucien > affinity.Elias) {
        message = "Algo em Lucien te atrai. Um mistério perigoso... mas irresistível.";
        rotaEscolhida = "Lucien";
      } else if (affinity.Elias > affinity.Lucien) {
        message = "A calma de Elias é contagiante; ele tem o dom de tranquilizar a alma de quem está por perto.";
        rotaEscolhida = "Elias";
      } else {
        message = "Ambos despertam algo em você, mas ainda é cedo para entender.";
        rotaEscolhida = "neutra";
      }

      storyText.textContent = message;
      localStorage.setItem('affinity', JSON.stringify(affinity));
      localStorage.setItem('rotaFinal', rotaEscolhida);

      setTimeout(() => {
        storyText.textContent += "Há algo se aproximando, algo com a capacidade de transformar tudo.";
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

  // Clique para Avançar
  textBox.addEventListener('click', nextScene);
});
