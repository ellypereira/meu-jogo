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



function iniciarFlashbackVisual() {
    const flashbackDiv = document.getElementById("flashback-visual");
    const img = document.getElementById("imagem-flashback");

    // Lista de imagens borradas (coloque seus arquivos aqui)
    const imagens = [
        "assets/img/flash1.png",
        "assets/img/flash2.png",
        "assets/img/flash3.png"
    ];

    let index = 0;
    flashbackDiv.style.display = "block";
    img.src = imagens[index];

    const intervalo = setInterval(() => {
        index++;
        if (index < imagens.length) {
            img.style.opacity = 0;
            setTimeout(() => {
                img.src = imagens[index];
                img.style.opacity = 1;
            }, 1000);
        } else {
            clearInterval(intervalo);
            setTimeout(() => {
                encerrarFlashback();
            }, 3000); // Espera mais um pouco na última imagem
        }
    }, 4000); // Tempo entre imagens (4s)
}

function encerrarFlashback() {
    const flashbackDiv = document.getElementById("flashback-visual");
    const nome = document.getElementById("nome");
    const texto = document.getElementById("texto");
    const pensamento = document.getElementById("pensamento");
    const textoPensamento = document.getElementById("texto-pensamento");
    const opcoes = document.getElementById("opcoes");

    flashbackDiv.style.display = "none";

    nome.innerText = "";
    texto.innerText = "";
    textoPensamento.innerText = "Minha cabeça... o que foi isso?";
    pensamento.style.display = "block";

    setTimeout(() => {
        pensamento.style.display = "none";
        nome.innerText = "Adrian";
        texto.innerText = "Você desmaiou por um instante. Está tudo bem agora.";
        mostrarBotaoContinuar();
    }, 4000);
}


function aceitarToque() {
    const texto = document.getElementById("texto");
    const pensamento = document.getElementById("pensamento");
    const textoPensamento = document.getElementById("texto-pensamento");
    const opcoes = document.getElementById("opcoes");
    const nome = document.getElementById("nome");

    afinidadeAdrian += 2;
    atualizarAfinidade();

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



setTimeout(() => {
    document.getElementById("afinidade").style.display = "block";
}, 20000); // Aparece depois de 20s (ou quando quiser)

function atualizarAfinidade() {
    document.getElementById("pontosAdrian").innerText = afinidadeAdrian;
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

    window.onload = () => {
        mostrarBotaoContinuar();
    };
}