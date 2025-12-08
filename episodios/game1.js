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

  // * Salvar/Carregar estágio do jogo
  const STAGE_KEY = 'bs_stage_v1';
  let savedStage = parseInt(localStorage.getItem(STAGE_KEY), 10);
  let stage = Number.isNaN(savedStage) ? 0 : savedStage;

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
        storyText.textContent = `(Uma inquieta noite, eu só queria respirar um pouco por conta dos últimos meses pesados que tive...  Mas quando percebi, já estava
        longe demais de casa.)`;
        break;
      case 1:
        storyText.textContent = `(As árvores parecem se fechar ao meu redor. Cada galho, cada sombra... Tudo parece me observar.
         Um arrepio percorre minha nuca. Não tem mais volta, tem?)`;
        break;
      case 2:
        storyText.textContent = `(Duas figuras surgem entre as árvores. Um tem olhos de fogo e sorriso arrogante. O outro parece calmo, quase angelical.)`;
        showSilhouette();
        break;
      case 3:
        storyText.textContent = `"— Hum... Humana perdida?" (A voz dele corta o silêncio, carregada de sarcasmo.)`;
        break;
      case 4:
        storyText.textContent = `"— Ela está assustada, devemos ajudá-la" (Diz o de olhos claros, num tom sereno que quase me acalma.)`;
        break;
      case 5:
        storyText.textContent = `(Meu coração dispara, eles não parecem extamente humanos... E mesmo assim não consigo desviar o olhar.)`;
        break;
      case 6:
        storyText.textContent = `(Instinto puro toma conta do meu corpo)`;
        break;
      case 7:
        storyText.textContent = `(Se eu ficar aqui parada, vou morrer... ou pior.)`;
        break;
      case 8:
        storyText.textContent = `*PUM!* (Eu tropeço em alguma raiz escondida, o chão some e tudo escurece.`;
        screenShake();
        fadeToBlackAndBack();
        break;
      case 9:
        storyText.textContent = "(Um cheiro de vela, madeira antiga e alguma coisa doce... Eu acordo com uma dor de cabeça em um lugar completamente diferente.)";
        document.body.classList.add('fade-out');
        setTimeout(() => {
          document.body.classList.remove('fade-out');
          document.body.classList.add('quarto', 'fade-in');
          setTimeout(() => document.body.classList.remove('fade-in'), 1000);
        }, 1000);
        break;
      case 10:
        storyText.textContent = "(O quarto é amplo, escuro e detalhado demais para ser um hospital. Cortinas pesadas. Candelabros. Uma cama que não é minha.)";
        break;
      case 11:
        storyText.textContent = "(Minha cabeça lateja quando tento me levantar. Antes que eu consiga, ouço passos se aproximando..)";
        break;
      case 12:
        storyText.textContent = "(A porta se abre devagar. O vampiro de expressão serena entra, luz suave dos cílios até o sorriso.) __Você desmaiou, mas está segura por enquanto.";
        showCharacter('eliasimg');
        break;
      case 13:
        storyText.textContent = "(Logo atrás, surge o outro — o olhar afiado, sorriso de canto que não sei se me tranquiliza ou ameaça.) __Eu disse que ela não ia aguentar (ele comenta, cruzando os braços.)";
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
    // * Salva estágio atual sempre que avançar.
    localStorage.setItem(STAGE_KEY, stage);
  }

  function showFirstChoices() {
    waitingForChoice = true;
    storyText.textContent = "(Eles me observam em silêncio. Um com curiosidade divertida, o outro com algo que parece... preocupação.)";
    setTimeout(() => {
      choices.innerHTML = `
        <button class="choice-button" onclick="chooseFirst(1)">‘O que vocês fizeram comigo? Fiquem longe de mim!’</button>
        <button class="choice-button" onclick="chooseFirst(2)">‘Obrigado por terem me ajudado... eu acho.’</button>
      `;
    }, 3000);
  }

  window.chooseFirst = function(option) {
    waitingForChoice = false;
    choices.innerHTML = '';
    if (option === 1) {
      storyText.textContent = "(Eu recuo instintivamente.) — O que vocês fizeram comigo? Fiquem longe de mim! (Lucien sorri com deboche, claramente se divertindo com o drama.)'";
      affinity.Lucien += 1;
      showAffinityMessage("+1 Afinidade com Lucien ❤️");
    } else {
      storyText.textContent = "(Minha voz sai trêmula, mas sincera.) — Obrigado por... terem me tirado da floresta. (Elias sorri de leve, como se aquilo fosse mais do que ele esperava ouvir)";
      affinity.Elias += 1;
      showAffinityMessage("+1 Afinidade com Elias 💙");
    }
    updateAffinityPanel();

    stage = 15;
    localStorage.setItem(STAGE_KEY, stage); // * salva aqui também

    textBox.addEventListener('click', nextScene);
  };

  function showFinalChoices() {
    waitingForChoice = true;
    storyText.textContent = "(O ar entre nós parece ficar mais denso. Não é só medo. É algo entre perigo, curiosidade... e um certo tipo de atração.)";
    choices.innerHTML = `
      <button class="choice-button" onclick="chooseFinal(1)">Olhar para Lucien com um desafio curioso</button>
      <button class="choice-button" onclick="chooseFinal(2)">Se aproximar mais de Elias em busca de calma</button>
      <button class="choice-button" onclick="chooseFinal(3)">Manter distância dos dois, por enquanto</button>
    `;
    textBox.removeEventListener('click', nextScene);
  }

  window.chooseFinal = function(option) {
    waitingForChoice = false;
    choices.innerHTML = '';

    if (option === 1) {
      storyText.textContent = "(Eu encaro Lucien sem recuar. Ele ergue uma sobrancelha, claramente surpreso.) — Gosto do seu olhar... não parece o de alguém que desmaia fácil.";
      affinity.Lucien += 2;
      showAffinityMessage("+2 Romance com Lucien ❤️");
    } else if (option === 2) {
      storyText.textContent = "(Instintivamente, me aproximo de Elias. A presença dele acalma meu peito acelerado.) — Você está segura aqui  (ele diz, numa voz baixa que quase faz o quarto desaparecer. Elias se aproxima calmamente.)'";
      affinity.Elias += 2;
      showAffinityMessage("+2 Romance com Elias 💙");
    } else {
      storyText.textContent = "(Dou um passo para trás. Preciso respirar, entender, observar antes de entregar meu pescoço — ou meu coração — a qualquer um deles.)";
    }

    updateAffinityPanel();
    stage = 18;
    localStorage.setItem(STAGE_KEY, stage); // * Salva aqui tbm
    
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
        storyText.textContent += "há algo se aproximando, algo com a capacidade de transformar tudo...";
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
