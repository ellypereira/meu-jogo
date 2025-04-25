import { mostrarBotaoContinuar } from './cenas.js';
import { atualizarAfinidade } from './afinidade.js';

export function aceitarToque() {
    const texto = document.getElementById("texto");
    const pensamento = document.getElementById("pensamento");
    const textoPensamento = document.getElementById("texto-pensamento");
    const opcoes = document.getElementById("opcoes");
    const nome = document.getElementById("nome");

    atualizarAfinidade(2);  // Aumenta a afinidade ao aceitar

    opcoes.style.display = "none";

    pensamento.style.display = "block";
    texto.innerText = "";
    textoPensamento.innerText = "A sensação é estranha. Como se... eu já tivesse feito isso antes.";

    setTimeout(() => {
        pensamento.style.display = "none";
        nome.innerText = "Adrian";
        texto.innerText = "Você sente isso? Esse calor... Isso não deveria acontecer.";
    }, 3000);

    setTimeout(() => {
        pensamento.style.display = "block";
        texto.innerText = "";
        textoPensamento.innerText = "Os dedos dele deslizam pelos meus... é um toque frio, mas meu corpo reage como se estivesse em chamas.";
    }, 6000);

    setTimeout(() => {
        pensamento.style.display = "none";
        nome.innerText = "Adrian";
        texto.innerText = "Seu coração está acelerado. Isso é medo... ou desejo?";
    }, 9000);

    setTimeout(() => {
        pensamento.style.display = "block";
        texto.innerText = "";
        textoPensamento.innerText = "Ele está tão perto... e eu nem sei seu nome. Mas não consigo me afastar.";
    }, 12000);

    setTimeout(() => {
        pensamento.style.display = "none";
        mostrarBotaoContinuar();
    }, 15000);
}

export function recusarToque() {
    const texto = document.getElementById("texto");
    const opcoes = document.getElementById("opcoes");
    const pensamento = document.getElementById("pensamento");
    const textoPensamento = document.getElementById("texto-pensamento");

    atualizarAfinidade(-1);  // Diminui a afinidade ao recusar

    texto.innerText = "Ele recua, o olhar dele perde o brilho por um instante.";
    pensamento.style.display = "block";
    textoPensamento.innerText = "Talvez eu tenha cometido um erro...";

    opcoes.style.display = "none";
    // Pode seguir a cena com tensão ou distanciamento

    window.onload = () => {
        mostrarBotaoContinuar();
    };
}
