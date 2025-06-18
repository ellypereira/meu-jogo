    const storyText = document.getElementById('story-text');
    const textBox = document.getElementById('text-box');
    const choices = document.getElementById('choices');
    const bgMusic = document.getElementById('bg-music');

    let stage = 0;
    let jakeAffinity = parseInt(localStorage.getItem('jakeAffinity')) || 0;
    let klausAffinity = parseInt(localStorage.getItem('klausAffinity')) || 0;
    let afterChoiceQueue = [];
    let waitingClick = false;
    let musicStarted = false;

    textBox.addEventListener('click', () => {
      if (!musicStarted) {
        bgMusic.play();
        musicStarted = true;
      }

      if (waitingClick && afterChoiceQueue.length > 0) {
        const next = afterChoiceQueue.shift();
        storyText.style.opacity = 0;
        setTimeout(() => {
          storyText.textContent = next.text;
          storyText.style.opacity = 1;
          if (afterChoiceQueue.length === 0 && next.callback) next.callback();
        }, 500);
      } else {
        nextScene();
      }
    });

    function nextScene() {
      switch(stage) {
        case 0:
          storyText.textContent = "(Uma figura surge entre as sombras. Parece com VOCÊ... mas corrompida.)";
          stage++;
          break;
        case 1:
          storyText.textContent = "(Cabelos negros flutuam em volta da moça. Seus olhos são totalmente pretos. Um sorriso frio nos lábios.)";
          stage++;
          break;
        case 2:
          storyText.textContent = "— Elias, onde está o colar? Com essa humana inútil?! — ela cospe. — Lucien... quanto tempo. Se ajoelhe diante de mim.";
          stage++;
          break;
        case 3:
          storyText.textContent = "— Jake, Klaus... tão inúteis como sempre. Vocês não conseguiram protegê-la nem no último ritual.";
          stage++;
          break;
        case 4:
          storyText.textContent = "— Cala a boca! — Jake ruge, indo para frente, mas Lucien o impede. — Isso não é só uma ilusão, é um fragmento real da Rainha...";
          stage++;
          break;
        case 5:
          storyText.textContent = "— Saia daqui! — Klaus se impõe. — Ela não é mais sua!";
          stage++;
          break;
        case 6:
          storyText.textContent = "(As sombras se contorcem. Um ataque é iniciado. A sala vira um campo de guerra astral. Você tenta respirar.)";
          stage++;
          break;
        case 7:
          showChoices();
          break;
        default:
          break;
      }
    }

    function showChoices() {
      choices.innerHTML = `
        <button class="choice-button" onclick="choose(1)">Confiar em Klaus e enfrentar a Rainha</button>
        <button class="choice-button" onclick="choose(2)">Fugir com Jake pela passagem secreta</button>
        <button class="choice-button" onclick="choose(3)">Ajoelhar-se diante da Rainha</button>
      `;
    }

    function choose(option) {
      choices.innerHTML = '';
      waitingClick = true;
      afterChoiceQueue = [];

      if (option === 1) {
        klausAffinity += 3;
        afterChoiceQueue.push(
          { text: "(Você permanece ao lado de Klaus. Ele forma um símbolo no ar e grita encantamentos.)" },
          { text: "(A Rainha sorri. As sombras a protegem. Klaus é atravessado por lanças negras e cai nos seus braços.)" },
          { text: "— Proteja... a humanidade... — ele sussurra, morrendo.", callback: endTragic }
        );
      } else if (option === 2) {
        jakeAffinity += 3;
        afterChoiceQueue.push(
          { text: "(Jake segura sua mão e corre com você. Portas explodem. Lucien e Elias seguram as criaturas.)" },
          { text: "(Antes de atravessar a passagem, um espinho das sombras atravessa Jake pelas costas. Ele empurra você para fora.)" },
          { text: "— Continue... viva. Por nós... — ele diz, antes de desabar.", callback: endTragic }
        );
      } else {
        afterChoiceQueue.push(
          { text: "(Você ajoelha. A Rainha ri. — Boa escolha. Vamos reconstruir tudo — diz ela, passando a mão no seu rosto.)" },
          { text: "(Mas, em um movimento repentino, Lucien atravessa a Rainha com sua própria alma cristalizada.)" },
          { text: "(A explosão leva vocês dois. Lucien morre ao te salvar. O mundo escurece.)", callback: endTragic }
        );
      }

      triggerNextAfterChoice();
    }

function createSmoke() {
  const smokeCount = 35;

  for (let i = 0; i < smokeCount; i++) {
    const smoke = document.createElement('div');
    smoke.classList.add('smoke');
    smoke.style.left = Math.random() * window.innerWidth + 'px';
    smoke.style.width = smoke.style.height = 10 + Math.random() * 20 + 'px';
    smoke.style.animationDuration = 4 + Math.random() * 4 + 's';
    smoke.style.opacity = 0.2 + Math.random() * 0.3;
    document.body.appendChild(smoke);

            setTimeout(() => {
                smoke.remove();
            }, 8000);

        }
    }

    function triggerNextAfterChoice() {
      if (afterChoiceQueue.length > 0) {
        const next = afterChoiceQueue.shift();
        storyText.style.opacity = 0;
        setTimeout(() => {
          storyText.textContent = next.text;
          storyText.style.opacity = 1;
          if (afterChoiceQueue.length === 0 && next.callback) next.callback();
        }, 500);
      }
    }

    function endTragic() {
      localStorage.setItem('klausAffinity', klausAffinity);
      localStorage.setItem('jakeAffinity', jakeAffinity);
      afterChoiceQueue.push(
        { text: "(Silêncio. Lágrimas escorrem. O mundo nunca mais será o mesmo...)" },
        { text: "(Clique para continuar para o Episódio 7)", callback: () => {
             showContinueButton();
            createSmoke();
        }
    }
      );
    }

    function showContinueButton() {
      choices.innerHTML = `
        <button class="choice-button" onclick="goToNext()">Continuar para o Episódio 7</button>
      `;
    }

    function goToNext() {
      window.location.href = 'ep7.html';
    }