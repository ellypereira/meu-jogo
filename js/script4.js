const storyText = document.getElementById('story-text');
const textBox = document.getElementById('text-box');
const choices = document.getElementById('choices');

let stage = 0;
let jakeAffinity = 0;
let klausAffinity = 0;

textBox.addEventListener('click', nextScene);

function nextScene() {
    switch (stage) {
        case 0:
            storyText.textContent = "(Um novo dia amanhece. Ainda sinto o eco do colar em minha pele...)";
            stage++;
            break;
        case 1:
            storyText.textContent = "(Elias está ausente. Lucien saiu antes do amanhecer. Estou sozinha... ou quase.)";
            stage++;
            break;
        case 2:
            storyText.textContent = "(Um som eletrônico. Risadas abafadas. Então vejo alguém no canto do salão, jogando em um notebook com fones enormes.)";
            stage++;
            break;
        case 3:
            storyText.textContent = "(Ele me olha por cima dos fones, com um sorriso.) __Você deve ser a garota do colar — murmura com voz rouca, quase encantatória. —Eu sou Jake...";
            showJakeImage();
            stage++;
            break;
        case 4:
            storyText.textContent = "(Antes que eu pudesse responder, ouço passos suaves. Um homem alto, com postura rígida, entra em silêncio. Ele apenas me encara.)";
            showKlausImage();
            stage++;
            break;
        case 5:
            storyText.textContent = "(Jake suspira, sem parar o jogo.) __Ignore o Klaus. Ele prefere o silêncio ao caos... e às pessoas.";
            stage++;
            break;
        case 6:
            showFirstChoicesEp4();
            break;
        case 7:
            showSecondChoicesEp4();
            break;
        case 8:
            defineRouteEp4();
            break;
    }
}

function showJakeImage() {
    const image = document.getElementById('jake-image');
    image.style.left = '50%';
    image.style.top = '50%';
    image.style.right = '';
    image.style.bottom = '';
    image.style.transform = 'translate(-50%, -50%)';
    image.style.opacity = 1;

    setTimeout(() => {
        image.style.opacity = 0;
    }, 3000);
}

function showKlausImage() {
    const image = document.getElementById('klaus-image');
    image.style.left = '50%';
    image.style.top = '50%';
    image.style.right = '';
    image.style.bottom = '';
    image.style.transform = 'translate(-50%, -50%)';
    image.style.opacity = 1;

    setTimeout(() => {
        image.style.opacity = 0;
    }, 4000);
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
        storyText.textContent = "(Jake solta uma risada sombria, que reverbera nas trevas ao redor.) — Gosto de gente curiosa — diz, os olhos brilhando como presas à meia-luz. — Mas cuidado... às vezes, o jogo morde de volta..";
        jakeAffinity += 1;
    } else if (option === 2) {
        storyText.textContent = "(Klaus finalmente rompe o silêncio, a voz baixa e cortante como um sussurro de noite eterna.) — Silêncio também é uma forma de confiança — murmura, envolto em sombras impenetráveis.";
        klausAffinity += 1;
    }
    stage = 7;
}

function showSecondChoicesEp4() {
    setTimeout(() => {
        storyText.textContent = "Há algo sombrio neles... Um guarda segredos nas palavras afiadas, o outro, nos silêncios profundos";
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
        storyText.textContent = "(Jake fecha o notebook com um estalo seco, olhos faiscando na penumbra..) __Você joga? Podemos fazer uma partida... ou conversar sobre a sua 'missão ancestral'.";
        jakeAffinity += 2;
    } else if (option === 2) {
        storyText.textContent = "(Klaus avança lentamente, a sombra dele se estendendo como um presságio..) __Você sente, não sente? Algo se move entre mundos. E você está no centro.";
        klausAffinity += 2;
    } else if (option === 3) {
        storyText.textContent = "(Você se retira, envolta pela escuridão crescente, onde o peso do silêncio pesa mais que mil vozes. Talvez, nesse vazio sem som, encontre as respostas que as palavras jamais ousaram revelar.)";
        // afinidade neutra
    }
    stage = 8;
}

function defineRouteEp4() {
    setTimeout(() => {
        if (jakeAffinity > klausAffinity) {
            storyText.textContent = "(Jake sorri, com os olhos ardendo com uma promessa sombria e proibida.)— Você é do tipo que escolhe seus próprios comandos — sussurra, a voz carregada de desejo oculto. — Gosto disso... especialmente quando sabe exatamente até onde quer levar o jogo... e o que quer perder no caminho.";
        } else if (klausAffinity > jakeAffinity) {
            storyText.textContent = "(Klaus permanece em silêncio, mas um leve aceno revela algo raro: respeito. Ou alarme.)";
        } else {
            storyText.textContent = "(Os dois observam você. Talvez nenhum deles seja o que aparenta. Ou talvez... sejam exatamente isso.)";
        }

        // Salvar afinidade
        localStorage.setItem('jakeAffinity', jakeAffinity);
        localStorage.setItem('klausAffinity', klausAffinity);

        // Final do episódio
        setTimeout(() => {
            storyText.textContent += " E então, a mansão vibra. Algo está despertando...";
        }, 1000);

        setTimeout(() => {
            choices.innerHTML = `
                <button class="choice-button" onclick="goToNext()">Episódio 5</button>
            `;
        }, 4000);
    }, 1500);
}

function goToNext() {
    window.location.href = 'ep5.html';
}
