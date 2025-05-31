// ============================================================================
// EPISÓDIO 5 — ROTEIRO UNIFICADO (Versão mesclada)
// ============================================================================

// Elementos do DOM
const storyText   = document.getElementById('story-text');
const textBox     = document.getElementById('text-box');
const choices     = document.getElementById('choices');

// Estado inicial
let stage = 0;
let jakeAffinity  = parseInt(localStorage.getItem('jakeAffinity'))  || 0;
let klausAffinity = parseInt(localStorage.getItem('klausAffinity')) || 0;

// Evento de clique na caixa de texto
textBox.addEventListener('click', nextScene);

// ============================================================================
// PROGRESSÃO DE CENAS
// ============================================================================
function nextScene() {
    switch (stage) {
        // -------------------------------
        // PARTE 1: Introdução (0 a 7)
        // -------------------------------
        case 0:
            storyText.textContent = "(Logo ao amanhecer, Klaus me chama para o salão vazio. Ele segura um velho grimório em mãos.)";
            showKlausImage();
            stage++;
            break;
        case 1:
            storyText.textContent = "(— Preste atenção. Isso é básico, mas essencial — ele diz, sua voz como uma lâmina afiada em brumas.)";
            stage++;
            break;
        case 2:
            storyText.textContent = "(Ele ensina símbolos antigos, proteção com sal negro e a identificação de rastros astrais.)";
            stage++;
            break;
        case 3:
            storyText.textContent = "(— Você está lidando com forças que distorcem a realidade. Não confie nem nos seus olhos — ele completa.)";
            stage++;
            break;
        case 4:
            storyText.textContent = "(Antes que eu possa responder, um estalo ecoa do lado de fora. Algo se move nas árvores.)";
            stage++;
            break;
        case 5:
            storyText.textContent = "(Jake entra correndo, interrompendo tudo, com o olhar fixo na janela.) — Klaus, temos um problema.";
            showJakeImage();
            stage++;
            break;
        case 6:
            storyText.textContent = "— Tem... algo errado. Muito errado. Eu vi movimentos na floresta. Não eram animais. Nem humanos.";
            stage++;
            break;
        case 7:
            storyText.textContent = "(Ele se aproxima, tirando os fones do pescoço. Pela primeira vez, a máscara debochada sumiu.) — Eles estão vindo.";
            stage++;
            break;

        // -------------------------------
        // PARTE 2: Treinamento e invasão (8 a 21)
        // -------------------------------
        case 8:
            storyText.textContent = "(Klaus fecha o grimório com força.) — Prepare-se.";
            stage++;
            break;
        case 9:
            storyText.textContent = "(Klaus permanece diante de mim, a presença dele tão imponente quanto as colunas da mansão.)";
            stage++;
            break;
        case 10:
            storyText.textContent = "— Antes de qualquer passo adiante, você precisa aprender a sobreviver aqui — diz ele, sem emoção.";
            stage++;
            break;
        case 11:
            storyText.textContent = "(Ele estende a mão, revelando uma adaga antiga e um grimório fechado com símbolos estranhos.)";
            stage++;
            break;
        case 12:
            storyText.textContent = "— Autodefesa. Proteção. Leitura de energia. Você não é uma humana comum. Logo, não pode agir como uma.";
            stage++;
            break;
        case 13:
            storyText.textContent = "(Passam-se horas em silêncio, interrompido apenas pelas instruções frias de Klaus. Meus dedos ardem. Minha mente pulsa.)";
            showJakeImage();
            stage++;
            break;
        case 14:
            storyText.textContent = "(A luz pisca. Um vento gélido invade pelas janelas, mesmo que todas estejam trancadas.)";
            stage++;
            break;
        case 15:
            storyText.textContent = "(Portas se abrem com violência. Lucien aparece primeiro, os olhos em brasas. Logo atrás, Elias, com o olhar duro e aflito.)";
            stage++;
            break;
        case 16:
            storyText.textContent = "— Já começaram... — murmura Lucien. — Ela precisa ser protegida.";
            stage++;
            break;
        case 17:
            showLucienElias();
            break;
        case 18:
            storyText.textContent = "— Precisamos de um círculo de contenção agora — diz Elias, tirando um punhado de sal negro do casaco.";
            stage++;
            break;
        case 19:
        case 20:
            storyText.textContent = ""; // Texto vazio temporário (caso deseje inserir algo depois)
            stage++;
            break;
        case 21:
            showFirstChoiceEp5(); // Exibe escolhas
            break;

        // -------------------------------
        // ESCOLHAS: Controladas por funções (22+)
        // -------------------------------
        default:
            break; // Aguardando clique em botões
    }
}

// ============================================================================
// FUNÇÕES DE IMAGEM
// ============================================================================
function showKlausImage() {
    const img = document.getElementById('klaus-image');
    img.style.opacity = 1;
    setTimeout(() => { img.style.opacity = 0; }, 3500);
}

function showJakeImage() {
    const img = document.getElementById('jake-image');
    img.style.opacity = 1;
    setTimeout(() => { img.style.opacity = 0; }, 3500);
}

function showLucienElias() {
    const container = document.getElementById('game-container');

    const lucienImg = document.createElement('img');
    lucienImg.src = '/meu-jogo/assets/lucien.jpg';
    lucienImg.classList.add('character-image');
    lucienImg.style.opacity = 0;
    lucienImg.style.zIndex = 4;
    container.appendChild(lucienImg);
    setTimeout(() => { lucienImg.style.opacity = 1; }, 100);

    const eliasImg = document.createElement('img');
    eliasImg.src = '/assets/elias.jpg';
    eliasImg.classList.add('character-image');
    eliasImg.style.opacity = 0;
    eliasImg.style.zIndex = 4;
    container.appendChild(eliasImg);
    setTimeout(() => { eliasImg.style.opacity = 1; }, 100);

    stage++;
}

// ============================================================================
// FUNÇÕES DE ESCOLHA (Final do Episódio 5)
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
            storyText.textContent = "(Você ajuda Klaus a traçar runas protetoras no chão. Ele te olha com aprovação silenciosa.)";
            klausAffinity += 2;
            break;
        case 2:
            storyText.textContent = "(Você corre atrás de Jake. Ele sorri, meio nervoso. — Finalmente alguém com espírito de aventura.)";
            jakeAffinity += 2;
            break;
        case 3:
            storyText.textContent = "(Você se esconde atrás de uma estátua. Lá fora, a escuridão toma forma, mas algo parece perceber sua presença.)";
            break;
    }

    setTimeout(endEp5, 2000);
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
