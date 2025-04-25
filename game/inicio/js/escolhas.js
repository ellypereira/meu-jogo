import { atualizarAfinidade } from './afinidade.js';

export function escolha(opcao) {
    const nome = document.getElementById("nome");
    const texto = document.getElementById("texto");
    const pensamento = document.getElementById("pensamento");
    const textoPensamento = document.getElementById("texto-pensamento");
    const personagem = document.getElementById("personagem");
    const opcoes = document.getElementById("opcoes");

    // Esconde os botões após a escolha
    opcoes.style.display = "none";

    // Início das cenas
    switch (opcao) {
        case 1: // Permanecer imóvel
            nome.innerText = "???";
            texto.innerText = "O ar parece congelar. Um sussurro, quente como um sopro, roça sua nuca.";
            setTimeout(() => {
                personagem.style.display = "block";
                nome.innerText = "Adrian";
                texto.innerText = "Você é mais calma do que eu esperava...";
                atualizarAfinidade(2);  // Ajusta a afinidade
            }, 3000);
            break;

        case 2: // Chamar por alguém
            nome.innerText = "???";
            texto.innerText = "Sua voz ecoa... e então, uma resposta: grave, melodiosa, próxima demais.";
            setTimeout(() => {
                personagem.style.display = "block";
                nome.innerText = "Adrian";
                texto.innerText = "Chamando por mim? Isso é... perigoso.";
                atualizarAfinidade(1);  // Ajusta a afinidade
            }, 3000);
            break;

        case 3: // Correr para longe
            nome.innerText = "???";
            texto.innerText = "Você corre, tropeça em algo invisível... e cai. Uma sombra se aproxima.";
            setTimeout(() => {
                personagem.style.display = "block";
                nome.innerText = "Adrian";
                texto.innerText = "Tsc... fugir nunca é uma boa escolha nesta casa.";
                atualizarAfinidade(1);  // Ajusta a afinidade
            }, 3000);
            break;
    }
}
