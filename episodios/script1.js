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
    nextScene();
  });

  textBox.addEventListener('click', nextScene);

  nextEpisodeBtn.addEventListener('click', () => {
    window.location.href = 'ep2.html';
  });

  function playMusicOnce() {
    if (!musicStarted) {
      bgMusic.play();
      musicStarted = true;
    }
  }

  function showSilhouette() {
    silhouette.style.display = 'block';
    setTimeout(() => silhouette.style.opacity = 1, 50);
    setTimeout(() => {
      silhouette.style.opacity = 0;
      setTimeout(() => silhouette.style.display = 'none', 1500);
    }, 4000);
  }

  function triggerFadeOut() {
    fadeScreen.style.opacity = 1;
    setTimeout(() => {
      nextEpisodeBtn.style.display = 'block';
    }, 2500);
  }

  function nextScene() {
    playMusicOnce();

    switch (stage) {
      case 0:
        storyText.textContent =
          `(Uma inquieta noite a cidade era coberta por uma densa neblina... ` +
          `Você decidiu caminhar para clarear a mente, mas logo se viu cercada por árvores desconhecidas.)`;
        break;

      case 1:
        storyText.textContent =
          `(O som de corvos ecoa. Você está tremendo, perdida, sem saber para onde ir.)`;
        break;

      case 2:
        storyText.innerHTML = `(De repente, duas silhuetas surgem entre as árvores.)`;
        showSilhouette();
        break;

      case 3:
        storyText.textContent =
          `(Um deles tem olhos de fogo e um sorriso arrogante. ` +
          `O outro parece calmo, quase angelical.)`;
        break;

      case 4:
        storyText.textContent =
          `"Hum... humana perdida?" — diz o rebelde, com a voz rouca.`;
        break;

      case 5:
        storyText.textContent =
          `"Ela está assustada. Devemos ajudá-la", diz o de olhos claros, quase sussurrando.`;
        break;

      case 6:
        storyText.textContent =
          `(Você sente o coração acelerar. Eles são lindos... perigosamente lindos.)`;
        break;

      case 7:
        storyText.textContent = `(O medo domina seu corpo. Você vira e corre.)`;
        break;

      case 8:
        storyText.textContent = `*PUM!* Você tropeça, cai... e tudo escurece.`;
        triggerFadeOut();
        break;

      default:
        break;
    }

    stage++;
  }
});
