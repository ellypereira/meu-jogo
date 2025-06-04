// ============================================================================
// ELEMENTOS DO DOM
// ============================================================================
const storyText = document.getElementById('story-text');
const textBox   = document.getElementById('text-box');
const choices   = document.getElementById('choices');

// ============================================================================
// VARIÁVEIS DE ESTADO
// ============================================================================
let stage = 0;
let jakeAffinity  = parseInt(localStorage.getItem('jakeAffinity'))  || 0;
let klausAffinity = parseInt(localStorage.getItem('klausAffinity')) || 0;

// ============================================================================
// EVENTO PRINCIPAL
// ============================================================================
textBox.addEventListener('click', nextScene);

// ============================================================================
// FUNÇÃO: PROGRESSÃO DAS CENAS
// ============================================================================
function nextScene() {
    switch (stage) {
        // -------------------------------
        // PARTE 1: Introdução e Treinamento
        // -------------------------------
        case 0:
            updateScene("(Logo ao amanhecer, Klaus me chama para o salão vazio. Ele segura um velho grimório em mãos.)");
            showKlausImage();
            break;
        case 1:
            updateScene("— Preste atenção. Isso é básico, mas essencial — ele diz, sua voz como uma lâmina afiada em brumas.)");
            break;
        case 2:
            updateScene("(Ele ensina símbolos antigos, proteção com sal negro e a identificação de rastros astrais.)");
            break;
        case 3:
            updateScene("— Você está lidando com forças que distorcem a realidade. Não confie nem nos seus olhos — ele completa.)");
            break;
        case 4:
            updateScene("(Antes que eu possa responder, um estalo ecoa do lado de fora. Algo se move nas árvores.)");
            break;
        case 5:
            updateScene("(Jake entra correndo, interrompendo tudo, com o olhar fixo na janela.) — Klaus, temos um problema.");
            showJakeImage();
            break;
        case 6:
            updateScene("— Tem... algo errado. Muito errado. Eu vi movimentos na floresta. Não eram animais. Nem humanos.");
            break;
        case 7:
            updateScene("(Ele se aproxima, tirando os fones do pescoço. Pela primeira vez, a máscara debochada sumiu.) — Eles estão vindo.");
            break;

        // -------------------------------
        // PARTE 2: Ritual e Alerta de Invasão
        // -------------------------------
        case 8:
            updateScene("(Klaus fecha o grimório com força.) — Prepare-se.");
            break;
        case 9:
            updateScene("(Klaus permanece diante de mim, a presença dele tão imponente quanto as colunas da mansão.)");
            break;
        case 10:
            updateScene("— Antes de qualquer passo adiante, você precisa aprender a sobreviver aqui — diz ele, sem emoção.");
            break;
        case 11:
            updateScene("(Ele estende a mão, revelando uma adaga antiga e um grimório fechado com símbolos estranhos.)");
            break;
        case 12:
            updateScene("— Autodefesa. Proteção. Leitura de energia. Você não é uma humana comum. Logo, não pode agir como uma.");
            break;
        case 13:
            updateScene("(Passam-se horas em silêncio, interrompido apenas pelas instruções frias de Klaus. Meus dedos ardem. Minha mente pulsa.)");
            break;
        case 14:
            updateScene("(A luz pisca. Um vento gélido invade pelas janelas, mesmo que todas estejam trancadas.)");
            break;
        case 15:
            updateScene("(Portas se abrem com violência. Lucien aparece primeiro, os olhos em brasas. Logo atrás, Elias, com o semblante sério.)");
            break;
        case 16:
            updateScene("— Já começaram... — murmura Lucien. — Ela precisa ser protegida.");
            break;
        case 17:
            updateScene("(Em seguida Elias diz) — Ela veio atrás de você e do colar, tente não acreditar em nada que ela dizer. ")
            break;
        case 18:
            updateScene("— Precisamos de um círculo de contenção agora — diz Elias, tirando um punhado de sal negro do casaco.");
            break;
        case 19:
        case 20:
            showFirstChoiceEp5();
            break;

        default:
            break; // Espera por uma escolha
    }

    stage++;
}

// ============================================================================
// FUNÇÕES DE IMAGEM
// ============================================================================
function showKlausImage() {
    fadeCharacterImage('klaus-image');
}

function showJakeImage() {
    fadeCharacterImage('jake-image');
}

function fadeCharacterImage(id) {
    const img = document.getElementById(id);
    if (img) {
        img.style.opacity = 1;
        setTimeout(() => { img.style.opacity = 0; }, 3000);
    }
}

// ============================================================================
// FUNÇÕES DE ESCOLHA E FINALIZAÇÃO
// ============================================================================
function showFirstChoiceEp5() {
    storyText.textContent = "Você sente uma presença sombria se aproximando da mansão. O que faz?";
    choices.innerHTML = `
        <button class="choice-button" onclick="chooseEp5(1)">Ajudar Klaus nos preparativos</button>
        <button class="choice-button" onclick="chooseEp5(2)">Seguir Jake para investigar os vultos</button>
        <button class="choice-button" onclick="chooseEp5(3)">Se esconder e observar de longe</button>
    `;
}

function chooseEp5(option) {
    choices.innerHTML = '';

    switch (option) {
        case 1:
            updateScene("(Você ajuda Klaus a traçar runas protetoras no chão. Ele te olha com aprovação silenciosa.)");
            klausAffinity += 2;
            break;
        case 2:
            updateScene("(Você corre atrás de Jake. Ele sorri, meio nervoso. — Finalmente alguém com espírito de aventura.)");
            jakeAffinity += 2;
            break;
        case 3:
            updateScene("(Você se esconde atrás de uma estátua. Lá fora, a escuridão toma forma, mas algo parece perceber sua presença.)");
            break;
    }

    setTimeout(endEp5, 1000);
}

function endEp5() {
    localStorage.setItem('jakeAffinity', jakeAffinity);
    localStorage.setItem('klausAffinity', klausAffinity);

    setTimeout(() => {
        storyText.textContent += " A mansão estremece. A noite cai mais cedo. Algo se aproxima...";
        choices.innerHTML = `
            <button class="choice-button" onclick="goToNext()">Continuar para Episódio 6</button>
        `;
    }, 3000);
}

function goToNext() {
    window.location.href = 'ep6.html';
}

// ============================================================================
// UTILITÁRIOS
// ============================================================================
function updateScene(text) {
    storyText.textContent = text;
}
