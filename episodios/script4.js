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
            storyText.textContent = "(Ele me olha por cima dos fones, com um sorriso.) __Você deve ser a garota do colar. Eu sou Jake. Gosto de jogos... e segredos.)";
            showJakeImage();
            stage++;
            break;
        case 4:
            storyText.textContent = "(Antes que eu pudesse responder, ouço passos suaves. Um homem alto, com postura rígida, entra em silêncio. Ele apenas me encara.)";
            showKlausImage();
            stage++;
            break;
        case 5:
            storyText.textContent = "(Jake suspira, sem parar o jogo.) __Ignore o Klaus. Ele prefere o silêncio ao caos... e às pessoas.)";
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
    image.style.opacity = 1;

    setTimeout(() => {
        image.style.opacity = 0;
    }, 3000);
}

function showKlausImage() {
    const image = document.getElementById('klaus-image');
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
        storyText.textContent = "(Jake ri.) __Gosto de gente curiosa. Mas cuidado... às vezes, o jogo morde de volta.";
        jakeAffinity += 1;
    } else if (option === 2) {
        storyText.textContent = "(Klaus finalmente fala, voz baixa.) __Silêncio também é uma forma de confiança.";
        klausAffinity += 1;
    }
    stage = 7;
}

function showSecondChoicesEp4() {
    setTimeout(() => {
        storyText.textContent = "Há algo nos dois... Um guarda segredos com palavras, o outro, com silêncios.";
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
        storyText.textContent = "(Jake fecha o notebook. __Você joga? Podemos fazer uma partida... ou conversar sobre a sua 'missão ancestral'.)";
        jakeAffinity += 2;
    } else if (option === 2) {
        storyText.textContent = "(Klaus se aproxima. __Você sente, não sente? Algo se move entre mundos. E você está no centro.)";
        klausAffinity += 2;
    } else if (option === 3) {
        storyText.textContent = "Você se retira. Tudo é demais. Talvez, no silêncio, encontre respostas que palavras não revelam.";
        // afinidade neutra
    }
    stage = 8;
}

function defineRouteEp4() {
    setTimeout(() => {
        if (jakeAffinity > klausAffinity) {
            storyText.textContent = "Jake sorri ao vê-la de volta. __Você é do tipo que escolhe seus próprios comandos. Gosto disso.";
        } else if (klausAffinity > jakeAffinity) {
            storyText.textContent = "Klaus permanece em silêncio, mas um leve aceno revela algo raro: respeito. Ou alarme.";
        } else {
            storyText.textContent = "Os dois observam você. Talvez nenhum deles seja o que aparenta. Ou talvez... sejam exatamente isso.";
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
