// Elementos do DOM
const textElement = document.getElementById('text');
const continueBtn = document.getElementById('continue-btn');
const gameDiv = document.getElementById('game');
const flashSound = document.getElementById('flash-sound');
const choicesContainer = document.getElementById('choices-container');
const sprite = document.getElementById('sprite'); // Adicionada a referência ao sprite
const bgm = document.getElementById('bgm'); // Mantida a referência ao BGM

// Estado do jogo
const gameState = {
    currentIndex: 0,
    // Alterado o formato do script para [texto, imagem/marcador]
    script: [
        ["Escuridão..."],
        ["Goteiras ecoam. Um som ritmado... batimentos? Ou passos?"],
        ["Você respira fundo. Há cheiro de ferro e mofo no ar."],
        ["FLASH: uma rosa negra. Sangue. Um beijo interrompido por gritos."],
        ["Voz desconhecida: 'Ela finalmente despertou.'"],
        ["Você acorda em uma cela fria. Correntes nos pulsos. Pedra úmida no chão."],
        ["Um vulto entra, olhos vermelhos brilhando no escuro.", "b69c5f7a-1c61-47dc-99ab-25070a13686a.png"], // URL da imagem aqui
        ["Raven: 'Você devia estar morta. Mas algo... te trouxe de volta.'"],
        ["Ele toca uma marca no seu pescoço — uma meia-lua."],
        ["Protagonista: 'Quem é você?! O que está acontecendo?!'"],
        ["Raven: 'Você não lembra? Que pena... talvez seu corpo lembre antes da mente.'"],
        ["Uma segunda voz vem da cela ao lado."],
        ["Liam: 'Não confie nele. Ele quer te usar, como fez com os outros.'"],
        ["Com um sorriso carregado de sarcasmo, Raven diz: 'E ele ainda acha que pode ser seu herói. Que gracinha.'"],
        ["As correntes vibram. Há poder dentro de você."],
        ["FLASH: Você em um baile, dançando com alguém... alguém com olhos dourados."],
        ["Você sente algo despertar."],
        ["Eles se aproximam ao mesmo tempo. Você precisa decidir em quem confiar."]
    ],
    choicesShown: false
};

// Marcador para pensamentos (se você tiver pensamentos neste script)
// const THOUGHT_PREFIX = "(pensamento):"; // Descomente se adicionar pensamentos

// Função para exibir a próxima linha do script
function displayNextLine() {
    if (gameState.currentIndex < gameState.script.length) {
        const currentLineData = gameState.script[gameState.currentIndex];
        const lineText = currentLineData[0]; // O texto é sempre o primeiro elemento
        const lineAsset = currentLineData[1]; // O segundo elemento é a imagem ou marcador

        // Limpa classes de texto anteriores
        textElement.className = '';

        // Verifica por marcadores especiais (como FLASH ou Pensamento)
        if (lineText.startsWith("FLASH:")) {
            triggerFlashEffect(lineText);
            // A função triggerFlashEffect incrementará o índice e chamará displayNextLine
        }
        // else if (lineText.startsWith(THOUGHT_PREFIX)) { // Descomente se usar pensamentos
        //     textElement.innerText = lineText.replace(THOUGHT_PREFIX, '').trim();
        //     textElement.classList.add('thought');
        //     handleAsset(lineAsset); // Ainda verifica se há imagem associada ao pensamento
        //     gameState.currentIndex++;
        // }
        else {
            textElement.innerText = lineText;
            handleAsset(lineAsset); // Lida com a imagem ou outros assets
            gameState.currentIndex++;
        }

        // Verifica se é a última linha antes das escolhas
        if (gameState.currentIndex === gameState.script.length && !gameState.choicesShown) {
            continueBtn.style.display = 'none';
            gameState.choicesShown = true;
            setTimeout(showChoices, 1000); // Atraso antes de mostrar as escolhas
        } else if (gameState.currentIndex < gameState.script.length) {
             continueBtn.style.display = 'inline-block';
        }

    } else {
        // endGame(); // Não necessário neste episódio
    }
}

// Função para lidar com imagens ou outros assets associados a uma linha
function handleAsset(asset) {
    if (asset && asset !== 'flash') { // Verifica se há um asset e não é o marcador 'flash'
        showSprite(asset); // Assume que o asset é uma URL de imagem
    } else {
        hideSprite(); // Esconde o sprite se não houver asset ou for 'flash'
    }
}


// Função para mostrar a imagem do sprite
function showSprite(imageUrl) {
    sprite.src = imageUrl;
    sprite.style.display = 'block';
    // Força um reflow para garantir que a transição de opacidade funcione
    void sprite.offsetWidth;
    sprite.style.opacity = '1';

    sprite.onerror = () => {
        console.error("Falha ao carregar a imagem:", imageUrl);
        hideSprite(); // Esconde o sprite se a imagem não carregar
    };
}

// Função para esconder a imagem do sprite
function hideSprite() {
    sprite.style.opacity = '0';
    // Atraso para permitir que a transição de opacidade termine antes de esconder completamente
    setTimeout(() => {
        sprite.style.display = 'none';
        sprite.src = ''; // Limpa o src para evitar carregar a imagem escondida
    }, parseFloat(getComputedStyle(sprite).transitionDuration) * 1000);
}


// Função para disparar o efeito de flash
function triggerFlashEffect(lineText) {
    // Remove o prefixo "FLASH:" para exibir apenas a descrição
    const flashDescription = lineText.replace("FLASH:", "").trim();
    textElement.innerText = flashDescription; // Exibe a descrição do flash

    document.body.classList.add('flash');
    flashSound.currentTime = 0;
    flashSound.play().catch(e => console.error("Erro ao reproduzir som:", e));

    hideSprite(); // Esconde o sprite durante o flash
    continueBtn.style.display = 'none'; // Esconde o botão continuar durante o flash

    // Remove a classe flash após a animação e continua o script
    setTimeout(() => {
        document.body.classList.remove('flash');
        gameState.currentIndex++; // Incrementa o índice após o flash
        continueBtn.style.display = 'inline-block';
    }, 1500); // Duração da animação (0.5s * 3)
}


// Função para exibir os botões de escolha
function showChoices() {
    const choices = [
        { text: "Olhar para Raven e exigir respostas", affinity: "Raven" },
        { text: "Focar em Liam e pedir ajuda", affinity: "Liam" },
        { text: "Fingir fraqueza para enganá-los", affinity: "Neutro" }
    ];

    choicesContainer.innerHTML = ''; // Limpa escolhas anteriores

    choices.forEach(choice => {
        const btn = document.createElement('button');
        btn.innerText = choice.text;
        btn.className = "choice-btn";
        btn.addEventListener('click', () => handleChoice(choice.affinity));
        choicesContainer.appendChild(btn);
    });
}

// Função para lidar com a escolha do jogador
function handleChoice(affinity) {
    localStorage.setItem('afinidade', affinity); // Salvar afinidade

    choicesContainer.innerHTML = ''; // Remove os botões de escolha
    hideSprite(); // Esconde o sprite após a escolha

    let reactionText = "";
    if (affinity === "Raven") {
        reactionText = "Raven se aproxima, segura seu queixo com firmeza. 'Você quer respostas... ou quer se perder neles?'";
    } else if (affinity === "Liam") {
        reactionText = "Liam toca sua mão pelas grades. 'Eu posso te tirar daqui. Mas vai doer. Confia em mim?'";
    } else {
        reactionText = "Você cai no chão, fingindo fraqueza. Ambos se aproximam, confusos — é sua chance.";
    }
    textElement.innerText = reactionText;

    setTimeout(() => {
        textElement.innerText += "\n\nA cela estremece. Um sino soa ao longe. Algo está vindo.";
        setTimeout(() => {
            textElement.innerText += `\n\nFim do Episódio 2 – Afinidade escolhida: ${affinity}`;
            // Adicionar lógica para ir para o próximo episódio
            // window.location.href = 'episodio2.html';
        }, 3000); // Atraso antes da mensagem final
    }, 2000); // Atraso antes da próxima linha de texto
}

// Inicialização do jogo
function initGame() {
     // Precarregar a imagem do sprite
     // Percorre o script para encontrar URLs de imagens
     gameState.script.forEach(lineData => {
         if (lineData.length > 1 && lineData[1] && lineData[1] !== 'flash') {
             const img = new Image();
             img.src = lineData[1];
         }
     });


    displayNextLine(); // Inicia a exibição

    continueBtn.addEventListener('click', displayNextLine);

    // Reproduzir BGM
    if (bgm) {
        bgm.volume = 0.2; // Ajustar volume
        bgm.play().catch(e => console.error("Erro ao reproduzir BGM:", e));
    }
}

// Inicia o jogo quando a página carregar
window.onload = initGame;