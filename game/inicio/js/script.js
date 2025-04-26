import { atualizarAfinidade } from './afinidade.js';

let etapa = 0;
let afinidadeAdrian = 0;
let rotaAtual = "Adrian";
let nomeJogador = "";

window.onload = () => {
    nomeJogador = prompt("Qual é o seu nome?");
    if (!nomeJogador) nomeJogador = "Você";
    mostrarBotaoContinuar();
};

// Função de escolha (opções do jogador)
export function escolha(opcao) {
    const nome = document.getElementById("nome");
    const texto = document.getElementById("texto");
    const pensamento = document.getElementById("pensamento");
    const textoPensamento = document.getElementById("texto-pensamento");
    const personagem = document.getElementById("personagem");
    const opcoes = document.getElementById("opcoes");

    opcoes.style.display = "none";

    switch (opcao) {
        case 1:
            nome.innerText = "???";
            texto.innerText = "O ar parece congelar. Um sussurro roça sua nuca.";
            setTimeout(() => {
                personagem.style.display = "block";
                personagem.src = "assets/img/adrian.png";
                nome.innerText = "Adrian";
                texto.innerText = "Você é mais calma do que eu esperava...";
                afinidadeAdrian += 2;
            }, 3000);
            break;
        case 2:
            nome.innerText = "???";
            texto.innerText = "Sua voz ecoa... Uma resposta grave e próxima demais.";
            setTimeout(() => {
                personagem.style.display = "block";
                personagem.src = "assets/img/adrian.png";
                nome.innerText = "Adrian";
                texto.innerText = "Chamando por mim? Isso é... perigoso.";
                afinidadeAdrian += 1;
            }, 3000);
            break;
        case 3:
            nome.innerText = "???";
            texto.innerText = "Você tropeça e cai. Uma sombra se aproxima.";
            setTimeout(() => {
                personagem.style.display = "block";
                personagem.src = "assets/img/adrian.png";
                nome.innerText = "Adrian";
                texto.innerText = "Fugir nunca é uma boa escolha nesta casa.";
                afinidadeAdrian += 1;
            }, 3000);
            break;
    }
}

// Função para mostrar o botão de continuar
function mostrarBotaoContinuar() {
    const opcoes = document.getElementById("opcoes");
    opcoes.innerHTML = '<button class="botao-opcao" onclick="continuarCena()">Continuar</button>';
    opcoes.style.display = "block";
}

// Função para continuar a cena
function continuarCena() {
    const nome = document.getElementById("nome");
    const texto = document.getElementById("texto");
    const pensamento = document.getElementById("pensamento");
    const textoPensamento = document.getElementById("texto-pensamento");
    const personagem = document.getElementById("personagem");
    const opcoes = document.getElementById("opcoes");

    pensamento.style.display = "none";
    textoPensamento.innerText = "";

    switch (etapa) {
        case 0:
            nome.innerText = "Adrian";
            texto.innerText = `${nomeJogador}... você não deveria estar aqui.`;
            etapa++;
            break;
        case 1:
            texto.innerText = "Mas agora que está... vai ter que encarar a verdade.";
            etapa++;
            break;
        case 2:
            pensamento.style.display = "block";
            texto.innerText = "";
            textoPensamento.innerText = "Ele sabe meu nome...? Mas como?";
            etapa++;
            break;
        case 3:
            pensamento.style.display = "none";
            nome.innerText = "Adrian";
            texto.innerText = "Há algo em você... algo antigo.";
            etapa++;
            break;
        case 4:
            nome.innerText = "Adrian";
            texto.innerText = "Você sente isso também, não sente?";
            etapa++;
            break;
        case 5:
            pensamento.style.display = "block";
            texto.innerText = "";
            textoPensamento.innerText = "Meu peito dói... Como se algo estivesse despertando.";
            etapa++;
            break;
        case 6:
            pensamento.style.display = "none";
            nome.innerText = "Adrian";
            texto.innerText = "Venha. Lhe mostrarei o que sua alma esconde.";
            etapa++;
            break;
        case 7:
            texto.innerText = "Mas você precisa aceitar. Tocar minha mão.";
            opcoes.innerHTML = `
                <button class="botao-opcao" onclick="aceitarToque()">Aceitar o toque</button>
                <button class="botao-opcao" onclick="recusarToque()">Recusar</button>
            `;
            break;
        case 12:
            iniciarFlashbackVisual();
            etapa++;
            break;
    }
}

// Função para aceitar o toque
function aceitarToque() {
    // Implemente a ação ao aceitar o toque, caso necessário
}

// Função para recusar o toque
function recusarToque() {
    // Implemente a ação ao recusar o toque, caso necessário
}

// Função de iniciar flashback visual
function iniciarFlashbackVisual() {
    const flashbackDiv = document.getElementById("flashback-visual");
    const img = document.getElementById("imagem-flashback");
    const audio = document.getElementById("audio-flashback");

    const imagens = [
        "assets/img/flash1.png",
        "assets/img/flash2.png",
        "assets/img/flash3.png"
    ];

    let index = 0;
    flashbackDiv.style.display = "flex";
    img.src = imagens[index];
    img.style.opacity = 1;

    audio.currentTime = 0;
    audio.play();

    const intervalo = setInterval(() => {
        img.style.opacity = 0;
        setTimeout(() => {
            index++;
            if (index < imagens.length) {
                img.src = imagens[index];
                img.style.opacity = 1;
            } else {
                clearInterval(intervalo);
                setTimeout(() => {
                    encerrarFlashback();
                }, 2000);
            }
        }, 1000);
    }, 3000);
}

// Função para encerrar o flashback
function encerrarFlashback() {
    const flashbackDiv = document.getElementById("flashback-visual");
    const audio = document.getElementById("audio-flashback");
    const pensamento = document.getElementById("pensamento");
    const textoPensamento = document.getElementById("texto-pensamento");
    const nome = document.getElementById("nome");
    const texto = document.getElementById("texto");

    flashbackDiv.style.display = "none";
    audio.pause();
    audio.currentTime = 0;

    pensamento.style.display = "block";
    texto.innerText = "";
    textoPensamento.innerText = "Minha cabeça... o que foi isso?";

    setTimeout(() => {
        pensamento.style.display = "none";
        nome.innerText = "Adrian";
        texto.innerText = "Você desmaiou por um instante. Está tudo bem agora.";
        mostrarBotaoContinuar();
    }, 4000);
}
