import { iniciarFlashbackVisual } from './flashback.js';
import { aceitarToque, recusarToque } from './toque.js';
import { atualizarAfinidade } from './afinidade.js';

let etapa = 0;

export function mostrarBotaoContinuar() {
    const opcoes = document.getElementById("opcoes");
    opcoes.innerHTML = '<button class="botao-opcao" onclick="continuarCena()">Continuar</button>';
    opcoes.style.display = "block";
}

export function continuarCena() {
    const nome = document.getElementById("nome");
    const texto = document.getElementById("texto");
    const pensamento = document.getElementById("pensamento");
    const textoPensamento = document.getElementById("texto-pensamento");
    const personagem = document.getElementById("personagem");
    const opcoes = document.getElementById("opcoes");

    // Limpa área de pensamento por padrão
    pensamento.style.display = "none";
    textoPensamento.innerText = "";

    switch (etapa) {
        case 0:
            nome.innerText = "Adrian";
            texto.innerText = "Você não deveria estar aqui sozinha... mas confesso, é intrigante.";
            etapa++;
            break;
        case 1:
            nome.innerText = "Adrian";
            texto.innerText = "Diga-me... o que você sabe sobre essa mansão?";
            etapa++;
            break;
        case 2:
            nome.innerText = "";
            texto.innerText = "";
            pensamento.style.display = "block";
            textoPensamento.innerText = "Ele está tão perto... Os olhos dele parecem atravessar minha alma.";
            etapa++;
            break;
        case 3:
            nome.innerText = "Adrian";
            texto.innerText = "Sinto... algo em você. Algo que não sentia há muito tempo.";
            etapa++;
            break;
        case 4:
            nome.innerText = "";
            texto.innerText = "";
            pensamento.style.display = "block";
            textoPensamento.innerText = "Por que meu coração está batendo tão rápido...? Isso não faz sentido.";
            etapa++;
            break;
        case 5:
            nome.innerText = "Adrian";
            texto.innerText = "Você não é uma mera visitante. Você tem sangue antigo...";
            etapa++;
            break;
        case 6:
            nome.innerText = "Adrian";
            texto.innerText = "Venha. Há muito que você precisa lembrar — e muito que eu preciso sentir novamente.";
            etapa++;
            break;
        case 7:
            nome.innerText = "";
            texto.innerText = "";
            pensamento.style.display = "block";
            textoPensamento.innerText = "Ele estende a mão para mim. Fria... mas estranhamente reconfortante.";
            opcoes.innerHTML = `
                <button class="botao-opcao" onclick="aceitarToque()">Aceitar o toque</button>
                <button class="botao-opcao" onclick="recusarToque()">Recusar</button>
            `;
            etapa++;
            break;

        case 8: 
            nome.innerText = "";
            texto.innerText = "";
            pensamento.style.display = "block";
            textoPensamento.innerText = "Quando toco a mão dele, algo dentro de mim... estala. Como uma porta se abrindo.";
            etapa++;
            break;

        case 9: 
            nome.innerText = "";
            texto.innerText = "";
            pensamento.style.display = "block";
            textoPensamento.innerText = "Vejo imagens... sangue, velas, uma mulher que parece comigo sendo marcada com símbolos antigos.";
            etapa++;
            break;

        case 10: 
            nome.innerText = "Voz Antiga";
            texto.innerText = "Você é filha do Pacto. Guardiã da Ruptura. A última de nossa linhagem...";
            pensamento.style.display = "none";
            etapa++;
            break;

        case 11: 
            nome.innerText = "";
            texto.innerText = "";
            pensamento.style.display = "block";
            textoPensamento.innerText = "Quem era aquela mulher...? Quem está falando dentro da minha mente?";
            mostrarBotaoContinuar();
            etapa++;
            break;

        case 12: 
            iniciarFlashbackVisual();
            etapa++;
            break;
    }
}
