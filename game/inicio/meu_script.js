let etapa = 0; // Etapa do diálogo
let afinidadeAdrian = 0;
let rotaAtual = "Adrian";

// Mostrar botão continuar desde do começo
window.onload = () => {
    mostrarBotaoContinuar();
};



function escolha(opcao) {
    const nome = document.getElementById("nome");
    const texto = document.getElementById("texto");
    const pensamento = document.getElementById("pensamento");
    const textoPensamento = document.getElementById("texto-Pensamento");
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
                afinidadeAdrian += 2;
            }, 3000);
            break;

        case 2: // Chamar por alguém
            nome.innerText = "???";
            texto.innerText = "Sua voz ecoa... e então, uma resposta: grave, melodiosa, próxima demais.";
            setTimeout(() => {
                personagem.style.display = "block";
                nome.innerText = "Adrian";
                texto.innerText = "Chamando por mim? Isso é... perigoso.";
                afinidadeAdrian += 1;
            }, 3000);
            break;

        case 3: // Correr para longe
            nome.innerText = "???";
            texto.innerText = "Você corre, tropeça em algo invisível... e cai. Uma sombra se aproxima.";
            setTimeout(() => {
                personagem.style.display = "block";
                nome.innerText = "Adrian";
                texto.innerText = "Tsc... fugir nunca é uma boa escolha nesta casa.";
                afinidadeAdrian += 1;
            }, 3000);
            break;
    }
}

function mostrarBotaoContinuar() {
    const opcoes = document.getElementById("opcoes");
        opcoes.innerHTML = '<button class="botao-opcao" onclick="continuarCena()">Continuar</button>';
        opcoes.style.display = "block";
    }

function continuarCena() {
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
            break;
    }
}

function aceitarToque() {
    const texto = document.getElementById("texto");
    const pensamento = document.getElementById("pensamento");
    const textoPensamento = document.getElementById("texto-pensamento");
    const opcoes = document.getElementById("opcoes");

    afinidadeAdrian += 2;
    pensamento.style.display = "block";
    texto.innerText = "";
    textoPensamento.innerText = "A sensação é estranha. Como se... eu já tivesse feito isso antes.";

    opcoes.style.display = "none";
    // Aqui você pode avançar para outra parte da rota dele
}

function recusarToque() {
    const texto = document.getElementById("texto");
    const opcoes = document.getElementById("opcoes");
    const pensamento = document.getElementById("pensamento");
    const textoPensamento = document.getElementById("texto-pensamento");

    afinidadeAdrian -= 1;
    texto.innerText = "Ele recua, o olhar dele perde o brilho por um instante.";
    pensamento.style.display = "block";
    textoPensamento.innerText = "Talvez eu tenha cometido um erro...";

    opcoes.style.display = "none";
    // Pode seguir a cena com tensão ou distanciamento
}