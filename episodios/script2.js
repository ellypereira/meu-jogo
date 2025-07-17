// ========================
// 🎮 BLOOD AND SILENCE — Capítulo 2
// =======================


// Aguarda o carregamento do DOM


  // ========================
  // 🔗 Seleção de Elementos
  // ========================
const storyText = document.getElementById('story-text');
const textBox = document.getElementById('text-box');
const choices = document.getElementById('choices');
const bgMusic = document.getElementById('bg-music');

const jakeImage = document.getElementById('jake-image');
const klausImage = document.getElementById('klaus-image');
const collarImage = document.getElementById('collar-image');
const imageContainer = document.getElementById('image-container');

let stage = 0;
let musicStarted = false;

//Afinidade
let lucienAffinity = parseInt(localStorage.getItem('lucienAffinity')) || 0;
let eliasAffinity = parseInt(localStorage.getItem('eliasAffinity')) || 0;
let jakeAffinity = parseInt(localStorage.getItem('jakeAffinity')) || 0;
let klausAffinity = parseInt(localStorage.getItem('klausAffinity')) || 0;

textBox.addEventListener('click', nextScene);

function nextScene() {
    if(!musicStarted) {
        bgMusic.volume = 0.4;
        bgMusic.play();
        musicStarted = true;
    }

    function updateStoryText(newText) {
  storyText.classList.add('fade-out');

  setTimeout(() => {
    storyText.textContent = newText;
    storyText.classList.remove('fade-out');
  }, 200); // tempo de fade-out antes de atualizar
}

    switch (stage) {
        /** EPISÓDIO 3 **/

        case 0: 
            storyText.textContent = "(Um dia se passou... Elias e Lucien foram atenciosos.)"
            stage++;
            break;
        case 1:
            storyText.textContent = "(Falaram sobre o colar... O mesmo que perdi no orfanato anos atrás.)"
            stage++;
            break;
        case 2:
            storyText.textContent = "(Disseram que ele pertencia à minha mãe, uma Guardiã do limiar.)"
            stage++;
            break;
        case 3:
            storyText.textContent = "(Ela mantinha o equilíbrio entre o mundo dos vivos e o das sombras.)"
            stage++;
            break;
        case 4:
            storyText.textContent = "(Contaram sobre rituais antigos, vínculos de sangue e alma)"
            stage++;
        break;
        case 5:
            storyText.textContent = "(Minha mãe se ofereceu como âncora... Selando algo, ou alguém)"
            stage++;
        break;
        case 6: 
            storyText.textContent = "(O colar era a chave)"
            stage++;
            break;
        case 7:
            storyText.textContent = "(Não foi fácil aceitar que fui vigiada desde o nascimento.)";
            stage++;
            break;
        case 8:
            storyText.textContent = "(Não por compaixão, mas porque acham que herdei o papel dela — ou algo pior.)";
            stage++;
            break;
        case 9:
            storyText.textContent = "(Hoje, Elias me deu um colar. Talvez o mesmo de antes, restaurado.)";
            showCollarImage();
            stage++;
            break;
        case 10:
            storyText.textContent = "(Ao tocá-lo... vozes antigas sussurraram sob minha pele. Me chamavam.)";
            stage++;
            break;
        case 11:
            showIdentityChoice();
            break;
        case 12:
            showBondingChoice();
            break;
        case 13:
            concludeEpisode3();
            break;

        /** EPISÓDIO 4 **/
        case 14:
            mudarCenario('bg-salao');
            storyText.textContent = "(Um novo dia amanhece. Ainda sinto o eco do colar em minha pele...)";
            stage++;
            break;
        case 15:
            storyText.textContent = "(Elias está ausente. Lucien saiu antes do amanhecer. Estou sozinha... ou quase.)";
            stage++;
            break;
        case 16:
            storyText.textContent = "(Um som eletrônico. Risadas abafadas. Então vejo alguém no canto do salão, jogando em um notebook com fones enormes.)";
            stage++;
            break;
        case 17:
            console.log("Mostrando Jake");
            storyText.textContent = "(Ele me olha por cima dos fones, com um sorriso.) __Você deve ser a garota do colar — murmura. —Eu sou Jake...";
            showCharacterImage(jakeImage);
            stage++;
            break;
        case 18:
            storyText.textContent = "(Antes que eu pudesse responder, ouço passos suaves. Um homem alto, com postura rígida, entra em silêncio. Ele apenas me encara.)";
            showCharacterImage(klausImage, 4000);
            stage++;
            break;
        case 19:
            storyText.textContent = "(Jake suspira, sem parar o jogo.) __Ignore o Klaus. Ele prefere o silêncio ao caos... e às pessoas.";
            stage++;
            break;
        case 20:
            showFirstChoicesEp4();
            break;
        case 21:
            showSecondChoicesEp4();
            break;
        case 22:
            defineRouteEp4();
            break;
    }
}

function mudarCenario(classe) {
  const tela = document.getElementById('game-screen');
  console.log('Mudando cenário para:', classe);

  // Remove todas as classes de cenário
  tela.classList.remove('bg-quarto', 'bg-salao');

  // Adiciona a nova
  tela.classList.add(classe);
}


/**FUNÇÕES EPISÓDIO 3**/
function showCollarImage() {
  const collarImage = document.getElementById('collar-image');

  if (collarImage) {
    collarImage.classList.remove('hidden'); // mostra o colar
    collarImage.classList.add('pulsing');   // animação opcional

    setTimeout(() => {
      collarImage.classList.add('hidden');   // esconde o colar após 3s
      collarImage.classList.remove('pulsing');
    }, 3000);
  } else {
    console.error('Colar não encontrado');
  }
}





function showIdentityChoice() {
    storyText.textContent = "As vozes diziam meu nome... mas não o de agora. Um nome antigo, esquecido.";
    choices.innerHTML = `
        <button class="choice-button" onclick="chooseIdentity(1)">Aceitar o chamado</button>
        <button class="choice-button" onclick="chooseIdentity(2)">Recusar e tirar o colar</button>
    `;
}



function chooseIdentity(option) {
    choices.innerHTML = '';
    if (option === 1) {
        storyText.textContent = "(Você fecha os olhos. As vozes ecoam em sua mente. Algo desperta.)";
    } else {
        storyText.textContent = "(Você arranca o colar. O silêncio volta... mas algo dentro de você grita.)";
        lucienAffinity -= 1;
        eliasAffinity -= 1;
    }
    stage = 12;
}

function showBondingChoice() {
    setTimeout(() => {
        storyText.textContent = "Lucien e Elias observam de longe. Você sente o peso de suas expectativas.";
        choices.innerHTML = `
            <button class="choice-button" onclick="bond(1)">Aproximar-se de Lucien</button>
            <button class="choice-button" onclick="bond(2)">Ficar ao lado de Elias</button>
            <button class="choice-button" onclick="bond(3)">Ficar sozinha com o colar</button>
        `;
    }, 1000);
}

function bond(option) {
    choices.innerHTML = '';
    if (option === 1) {
        storyText.textContent = "Lucien se aproxima com um sorriso sombrio. __'Você está começando a entender.'";
        lucienAffinity += 2;
    } else if (option === 2) {
        storyText.textContent = "Elias toca seu ombro suavemente. __'Não está sozinha. Nunca esteve.'";
        eliasAffinity += 2;
    } else {
        storyText.textContent = "(Você segura o colar com força. Precisa de silêncio para ouvir o que ele diz.)";
        lucienAffinity = 0;
        eliasAffinity = 0;
    }
    stage = 13;
}

function concludeEpisode3() {
    setTimeout(() => {
        if (lucienAffinity > eliasAffinity) {
            storyText.textContent = "Lucien a observa. __'A chave despertou. E o que está preso... sente você.'";
        } else if (eliasAffinity > lucienAffinity) {
            storyText.textContent = "Elias segura sua mão. __'O selo está enfraquecendo. Mas ainda há tempo... se escolher com sabedoria.'";
        } else {
            storyText.textContent = "Sozinha no quarto, você ouve novamente os sussurros. __Eles estão vindo.__";
        }

        localStorage.setItem('lucienAffinity', lucienAffinity);
        localStorage.setItem('eliasAffinity', eliasAffinity);

        stage = 14;

     setTimeout(() => {
        nextScene();
}, 5000);
    }, 3000);
}

/** ==== FUNÇÕES EPISÓDIO 4 ==== **/
function showCharacterImage(imageElement, duration = 3000) {
  // Esconde todas as outras imagens antes
  const allImages = document.querySelectorAll('.character-image');
  allImages.forEach(img => {
    img.classList.remove('show');
  });

  // Mostra a imagem suavemente
  imageElement.classList.add('show');

  // Esconde depois de X milissegundos (fade out)
  setTimeout(() => {
    imageElement.classList.remove('show');
  }, duration);
}


function showFirstChoicesEp4() {
    choices.innerHTML = `
        <button class="choice-button" onclick="chooseEp4First(1)">Ficar perto de Jake e puxar conversa</button>
        <button class="choice-button" onclick="chooseEp4First(2)">Observar Klaus em silêncio</button>
    `;
}

function chooseEp4First(option) {
    choices.innerHTML = '';
    if (option === 1) {
        storyText.textContent = "(Jake solta uma risada sombria...) — Gosto de gente curiosa — sussurra.";
        jakeAffinity += 1;
    } else if (option === 2) {
        storyText.textContent = "(Klaus rompe o silêncio...) — Silêncio também é uma forma de confiança — diz.";
        klausAffinity += 1;
    }
    stage = 21;
}

function showSecondChoicesEp4() {
    setTimeout(() => {
        storyText.textContent = "Há algo sombrio neles... Um guarda segredos nas palavras afiadas, o outro, nos silêncios profundos.";
        choices.innerHTML = `
            <button class="choice-button" onclick="chooseEp4Second(1)">Mostrar interesse pelo mundo de Jake</button>
            <button class="choice-button" onclick="chooseEp4Second(2)">Tentar entender o silêncio de Klaus</button>
            <button class="choice-button" onclick="chooseEp4Second(3)">Preferir ficar sozinha e refletir</button>
        `;
    }, 1000);
}

function chooseEp4Second(option) {
    choices.innerHTML = '';
    if (option === 1) {
        storyText.textContent = "(Jake fecha o notebook, olhos faiscando...) — Você joga? Podemos conversar sobre a sua missão...";
        jakeAffinity += 2;
    } else if (option === 2) {
        storyText.textContent = "(Klaus avança lentamente...) — Você sente, não sente? Algo se move entre mundos.";
        klausAffinity += 2;
    } else if (option === 3) {
        storyText.textContent = "(Você se retira, envolta pela escuridão crescente...)";
    }
    stage = 22;
}

function defineRouteEp4() {
    setTimeout(() => {
        if (jakeAffinity > klausAffinity) {
            storyText.textContent = "(Jake sorri, e diz) — Você é do tipo que escolhe seus próprios comandos? — Mas ele é interrompido por um estrondo.";
        } else if (klausAffinity > jakeAffinity) {
            storyText.textContent = "(Klaus permanece em silêncio, mas um leve aceno revela respeito. Ou alarme.)";
        } else {
            storyText.textContent = "(Os dois observam você. Talvez nenhum deles seja o que aparenta...)";
        }

        localStorage.setItem('jakeAffinity', jakeAffinity);
        localStorage.setItem('klausAffinity', klausAffinity);

        setTimeout(() => {
            storyText.textContent += "A mansão treme, como se estivesse tentando avisar sobre um perigo iminente.";
        }, 1000);

        setTimeout(() => {
            choices.innerHTML = `
                <button class="choice-button" onclick="goToNext()">Avançar para o capítulo 3</button>
            `;
        }, 4000);
    }, 1500);
}

function goToNext() {
    window.location.href = 'capitulo3.html';
}