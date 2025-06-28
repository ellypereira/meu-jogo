document.addEventListener('DOMContentLoaded', () => {
const storyText = document.getElementById('story-text');
const choices = document.getElementById('choices');
const bgMusic = document.getElementById('bg-music');



let stage = 0;
let deadCharacter = localStorage.getItem('deadCharacter'); //Jake, Lucien ou Klaus

  // Tocar a música quando o jogo começa
textBox.addEventListener('click', () => {
  if (!musicStarted) {
    bgMusic.play();
    musicStarted = true;
  }
  nextScene();
});
;
  });


function nextScene() {
    switch (stage) {
        case 0:
            bgMusic.onplay = () => 
            storyText.textContent = "(A mansão destruída... O cheiro de sangue preenche o ar)"
            stage++;
            break;
        case 1: 
            storyText.textContent = "(Gritos ao longe. O confronto ainda não acabou! Você precisa reagir...)"
            stage++;
            break;
        case 2: 
            if (deadCharacter !== "jake") {
                storyText.textContent = "Jake aparece ao seu lado, com os olhos focados. --Não podemos recuar agora.";
            } else if (deadCharacter !== "Klaus") {
                storyText.textContent = "Klaus segura uma adaga manchada de sangue. --Proteja o coração da mansão...";
            } else if (deadCharacter !== "Lucien") {
                storyText.textContent = "Lucien caminha entre os corpos, sombrio. --O século muda aqui... Ou termina.";
            } else {
                storyText.textContent = "(Todos se foram. Mas você precisa continuar. Pelo que resta.)";
            }
            stage++;
            break;
        case 3:
            storyText.textContent = "(As paredes da mansão está puro sangue. Criaturas das sombras invadem pelos vitrais quebrados.)";
            stage++;
            break;
        case 4: 
            choices.innerHTML =  `
            <button class="choice-button" onclick="chooseAction(1)">Lutar ao lado dos sobreviventes</button>
            <button class="choice-button" onclick="chooseAction(2)">Tentar fugir para buscar ajuda</button>
            <button class="choice-button" onclick="chooseAction(3)">Confrontar a Rainha com o colar</button>
             `;
      break;
  }
    }

    function chooseAction(option) {
  choices.innerHTML = "";
  if (option === 1) {
    storyText.textContent = "(Você avança ao lado dos seus aliados. Cada golpe é uma promessa de resistência.)";
  } else if (option === 2) {
    storyText.textContent = "(Você corre pelos corredores em ruínas, ouvindo os gritos ecoando atrás de você.)";
  } else {
    storyText.textContent = "(O colar brilha. A Rainha sente sua presença. Você está pronta para encarar a verdade.)";
  }
  setTimeout(() => {
    storyText.textContent += "\n(Fim do Capítulo 4. Prepare-se para o destino no Episódio 5.)";
    choices.innerHTML = `
      <button class="choice-button" onclick="goToNext()">Ir para o Episódio 5</button>
    `;
  }, 3000);
}

function goToNext() {
  window.location.href = "ep5.html";
}

document.addEventListener("DOMContentLoaded", nextScene);
document.getElementById("text-box").addEventListener("click", () => {
  nextScene();
});