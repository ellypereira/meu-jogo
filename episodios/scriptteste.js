const dialogue = document.getElementById('dialogue');
const characterImg = document.getElementById('character-img');

const story = [
  { text: "Logo ao amanhecer, Klaus me chama para o salão vazio.", character: "Castiel.png" },
  { text: "'Preciso te mostrar algo...'", character: "Castiel.png" },
  { text: "Lucien surge na porta, cruzando os braços.", character: "lucien.png" },
  { text: "'Vocês estão aprontando de novo?'", character: "lucien.png" },
  { text: "O ambiente fica em silêncio. Nenhum deles diz nada.", character: null },
  { text: "'Deveríamos começar logo.', diz Klaus.", character: "klaus.png" },
];

let index = 0;

document.getElementById('text-box').addEventListener('click', () => {
  if (index < story.length) {
    dialogue.textContent = story[index].text;

    if (story[index].character) {
      characterImg.src = `imagens/${story[index].character}`;
      characterImg.style.display = 'block';
    } else {
      characterImg.style.display = 'none';
    }

    index++;
  } else {
    dialogue.textContent = "Fim da cena.";
    characterImg.style.display = 'none';
  }
});
