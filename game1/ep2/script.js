// Elementos do DOM
const textElement = document.getElementById('text');
const continueBtn = document.getElementById('continue-btn');
const gameDiv = document.getElementById('game');
const flashSound = document.getElementById('flash-sound');
const choicesContainer = document.getElementById('choices-container');
const sprite = document.getElementById('sprite');
const bgm = document.getElementById('bgm');
const endChapterBtn = document.getElementById('end-chapter-btn');

// Estado do jogo
const gameState = {
    currentIndex: 0,
    script: [],
    choicesShown: false,
    currentScriptArray: null,
    isPausedForAsset: false,
    playerName: "Protagonista" // Placeholder inicial, será substituído pelo nome salvo
};

// Scripts de continuação baseados nas escolhas
const continuationScripts = {
    "Raven": [
        ["Você encara Raven. Seus olhos vermelhos parecem brilhar mais intensamente."],
        ["{playerName}: 'Fale. O que você fez comigo?'"], // Usando o placeholder
        ["Raven sorri, mas há algo triste em seu olhar."],
        ["Raven: 'Eu apenas impedi que você morresse... mas não posso impedir o que você se tornou.'"],
        ["Ele se aproxima, e seu toque no seu pulso faz suas correntes se desfazerem em cinzas."],
        ["FLASH: Um salão, corpos dançando... sangue escorrendo pelo mármulo. Você, no centro."],
        ["Raven: 'Seu sangue não é mais humano. Você pertence à Noite agora.'"]
    ],
    "Liam": [
        ["Você vira o rosto para a cela ao lado. Os olhos de Liam brilham em azul pálido."],
        ["{playerName}: 'Liam, me diga a verdade. O que está acontecendo?'"], // Usando o placeholder
        ["Liam: 'Você é como eu agora. Mas ainda tem escolha.'"],
        ["Ele empurra algo pela fenda da parede — um pingente antigo com um símbolo de sol."],
        ["Liam: 'Use isso quando ele tentar te dominar. Ele teme o que você pode se tornar.'"],
        ["FLASH: Uma lembrança... Liam e você correndo sob a chuva. Risos. Confiança perdida."],
        ["Liam: 'Eu vou tirar você daqui. Mesmo que me custe tudo.'"]
    ],
    "Neutro": [
        ["Você solta um gemido fraco, baixando a cabeça. As correntes ainda pesam, mas você sente a energia sob a pele."],
        ["Raven ri suavemente. 'Fraca... como todos os outros.'"],
        ["Liam sussurra: 'Espere... ela está... mentindo?'"],
        ["FLASH: Altar antigo. Seu reflexo em um espelho negro. Olhos que não são seus."],
        ["Você explode as correntes com a força da mente. A cela treme."],
        ["{playerName}: 'Eu não pertenço a nenhum de vocês. Não mais.'"], // Usando o placeholder
        ["O poder se manifesta — som de vidro quebrando, luz distorcida."]
    ]
};

// Script do próximo gancho
const nextHookScript = [
    ["Uma figura observa de longe, entre as sombras.", "misterioso.png"],
    ["??? : 'A herdeira {playerName} despertou. O pacto está se cumprindo.'"], // Usando o placeholder
    ["END_CHAPTER_2"]
];

// Script inicial do jogo
const initialScript = [
    ["Escuridão..."],
    ["Goteiras ecoam. Um som ritmado... batimentos? Ou passos?"],
    ["Você respira fundo. Há cheiro de ferro e mofo no ar."],
    ["FLASH:uma rosa negra. Sangue. Um beijo interrompido por gritos."],
    ["Voz desconhecida: 'Ela finalmente despertou.'"],
    ["Você acorda em uma cela fria. Correntes nos pulsos. Pedra úmida no chão."],
    ["Um vulto entra, olhos vermelhos brilhando no escuro.", "b69c5f7a-1c61-47dc-99ab-25070a13686a.png"],
    ["Raven: 'Você devia estar morta. Mas algo... te trouxe de volta.'"],
    ["Ele toca uma marca no seu pescoço — uma meia-lua."],
    ["{playerName}: 'Quem é você?! O que está acontecendo?!'"], // Usando o placeholder
    ["Raven: 'Você não lembra? Que pena... talvez seu corpo lembre antes da mente.'"],
    ["Uma segunda voz vem da cela ao lado."],
    ["Liam: 'Não confie nele. Ele quer te usar, como fez com os outros.'"],
    ["Com um sorriso carregado de sarcasmo, Raven diz: 'E ele ainda acha que pode ser seu herói. Que gracinha.'"],
    ["As correntes vibram. Há poder dentro de você."],
    ["FLASH: Você em um baile, dançando com alguém... alguém com olhos dourados."],
    ["Você sente algo despertar."],
    ["Eles se aproximam ao mesmo tempo. Você precisa decidir em quem confiar."]
];

// --- Funções de Manipulação do DOM ---

function handleAsset(asset) {
    if (asset && asset !== 'flash') {
        showSprite(asset);
    } else {
        hideSprite();
    }
}

function showSprite(imageUrl) {
    sprite.src = imageUrl;
    sprite.style.display = 'block';
    void sprite.offsetWidth;
    sprite.style.opacity = '1';

    sprite.onerror = () => {
        console.error("Falha ao carregar a imagem:", imageUrl);
        hideSprite();
    };
}

function hideSprite() {
    sprite.style.opacity = '0';
    const transitionDuration = parseFloat(getComputedStyle(sprite).transitionDuration) * 1000;
    setTimeout(() => {
        sprite.style.display = 'none';
        sprite.src = '';
    }, transitionDuration);
}

// --- Função Auxiliar para Formatar Texto com o Nome do Jogador ---

function formatText(text) {
    // Substitui todas as ocorrências de "{playerName}" pelo nome real do jogador
    if (typeof text === 'string') { // Garante que o texto é uma string antes de usar replace
         return text.replace(/{playerName}/g, gameState.playerName);
    }
    return text; // Retorna o texto original se não for uma string (embora não deva acontecer com seu formato)
}

// --- Funções Principais de Fluxo ---

function triggerFlashEffect(lineText) {
    console.log(`--- triggerFlashEffect chamada para: ${lineText} ---`);
    const flashDescription = lineText.replace("FLASH:", "").trim();
    // Exibe a descrição do flash (não precisa formatar aqui, pois não deve ter o nome)
    textElement.innerText = flashDescription;

    document.body.classList.add('flash');
    flashSound.currentTime = 0;
    flashSound.play().catch(e => console.error("Erro ao reproduzir som:", e));

    hideSprite();
    continueBtn.style.display = 'none';

    setTimeout(() => {
        document.body.classList.remove('flash');
        if (gameState.currentIndex < gameState.script.length) {
             continueBtn.style.display = 'inline-block';
             console.log("Flash terminado, mostrando botão continuar.");
        } else {
            console.log("Flash terminado, fim do script. Ocultando botão continuar.");
            continueBtn.style.display = 'none';
        }
    }, 1500);
    console.log(`--- Fim da chamada triggerFlashEffect ---`);
}

function displayNextLine() {
    console.log(`--- displayNextLine chamada ---`);
    console.log(`currentIndex ANTES do processamento: ${gameState.currentIndex}`);
    console.log(`Script length: ${gameState.script.length}`);
    console.log(`isPausedForAsset: ${gameState.isPausedForAsset}`);

    if (gameState.isPausedForAsset) {
        console.log("Jogo pausado para asset. Processando clique para avançar.");
        gameState.currentIndex++;
        console.log(`currentIndex INCREMENTADO (após clique durante pausa) para: ${gameState.currentIndex}`);
        gameState.isPausedForAsset = false;
        console.log("Pausa desativada.");
    } else {
        console.log("Jogo não pausado. Processando linha normal.");
    }

    if (gameState.currentIndex < gameState.script.length) {
        const currentLineData = gameState.script[gameState.currentIndex];
        const lineText = currentLineData[0];
        const lineAsset = currentLineData.length > 1 ? currentLineData[1] : null;

        if (lineText === "END_CHAPTER_2") {
            console.log(`Marcador END_CHAPTER_2 encontrado na linha ${gameState.currentIndex}.`);
            textElement.innerText = '';
            hideSprite();
            continueBtn.style.display = 'none';
            choicesContainer.style.display = 'none';
            displayEndChapterButton();
            gameState.currentIndex++;
            console.log(`currentIndex incrementado (após END_CHAPTER_2) para: ${gameState.currentIndex}`);
            return;
        }

        if (lineText.startsWith("FLASH:")) {
            console.log(`Linha ${gameState.currentIndex} é um FLASH.`);
            textElement.className = '';
            gameState.currentIndex++;
            console.log(`currentIndex INCREMENTADO (antes do FLASH effect) para: ${gameState.currentIndex}`);
            triggerFlashEffect(lineText);
            return;
        }

        console.log(`Linha ${gameState.currentIndex} é uma linha normal.`);

        // Exibe o texto (AGORA FORMATADO COM O NOME DO JOGADOR)
        textElement.className = '';
        textElement.innerText = formatText(lineText);
        console.log(`Exibindo texto: "${formatText(lineText).substring(0, Math.min(formatText(lineText).length, 50))}..."`);

        handleAsset(lineAsset);
        console.log(`Lidando com asset: ${lineAsset}`);

        if (lineAsset && lineAsset !== 'flash') {
            console.log(`Asset encontrado. Pausando para visualização.`);
            gameState.isPausedForAsset = true;
            continueBtn.style.display = 'none';

            const assetDisplayDuration = 3000;

            setTimeout(() => {
                console.log(`Tempo de visualização do asset (${assetDisplayDuration}ms) terminado.`);
                if ((gameState.currentIndex + 1) < gameState.script.length) {
                    continueBtn.style.display = 'inline-block';
                    console.log("Pausa terminada, mostrando botão continuar.");
                } else {
                    console.log("Pausa terminada no fim do script (após a última linha).");
                    continueBtn.style.display = 'inline-block';
                    console.log("Mostrando botão continuar para processar o fim do script.");
                }
            }, assetDisplayDuration);
            return;
        }

        gameState.currentIndex++;
        console.log(`currentIndex INCREMENTADO (após linha normal/sem asset/sem pausa) para: ${gameState.currentIndex}`);

        if (gameState.currentIndex === gameState.script.length && !gameState.choicesShown) {
            console.log(`Fim do script atual. Verificando se mostrar escolhas/fim.`);
            if (gameState.currentScriptArray === initialScript) {
                continueBtn.style.display = 'none';
                gameState.choicesShown = true;
                console.log(`Mostrando escolhas após fim do initialScript.`);
                setTimeout(showChoices, 1000);
            } else {
                console.log("Fim de script sem marcador END_CHAPTER_2 na última posição. Isso não deveria acontecer com o marcador no lugar certo.");
                continueBtn.style.display = 'none';
            }
        } else if (gameState.currentIndex < gameState.script.length) {
            if (!gameState.isPausedForAsset && !lineText.startsWith("FLASH:")) {
                console.log(`Ainda há mais linhas (não pausado, não flash). Mostrando botão continuar.`);
                continueBtn.style.display = 'inline-block';
            } else {
                console.log(`Ainda há mais linhas, mas pausado para asset ou era FLASH. Ocultando botão continuar por enquanto.`);
                continueBtn.style.display = 'none';
            }
        } else {
            console.log(`Fim do script ou escolhas/fim de capítulo já processados. Ocultando botão continuar.`);
            continueBtn.style.display = 'none';
        }

    } else {
        console.log("Fim absoluto do script após processar END_CHAPTER_2.");
        continueBtn.style.display = 'none';
        hideSprite();
    }
    console.log(`--- Fim da chamada displayNextLine ---`);
}

function showChoices() {
    const choices = [
        { text: "Olhar para Raven e exigir respostas", affinity: "Raven" },
        { text: "Focar em Liam e pedir ajuda", affinity: "Liam" },
        { text: "Fingir fraqueza para enganá-los", affinity: "Neutro" }
    ];

    choicesContainer.innerHTML = '';

    choices.forEach(choice => {
        const btn = document.createElement('button');
        btn.innerText = choice.text;
        btn.className = "choice-btn";
        btn.addEventListener('click', () => handleChoice(choice.affinity));
        choicesContainer.appendChild(btn);
    });
    choicesContainer.style.display = 'flex';
    console.log("Escolhas exibidas.");
}

function handleChoice(affinity) {
    localStorage.setItem('afinidade', affinity);
    console.log(`Escolha selecionada: ${affinity}. Afinidade salva.`);

    choicesContainer.innerHTML = '';
    choicesContainer.style.display = 'none';
    hideSprite();
    console.log("Escolhas removidas e sprite oculto.");

    const chosenScript = continuationScripts[affinity];
    gameState.script = chosenScript.concat(nextHookScript);
    gameState.currentScriptArray = gameState.script;
    console.log(`Novo script carregado com ${gameState.script.length} linhas.`);

    gameState.currentIndex = 0;
    gameState.choicesShown = false;
    gameState.isPausedForAsset = false;
    console.log("currentIndex resetado para 0. choicesShown resetado para false. isPausedForAsset resetado para false.");

    setTimeout(() => {
        console.log("Iniciando exibição do novo script após escolha...");
        displayNextLine();
    }, 1000);
}

function displayEndChapterButton() {
    endChapterBtn.innerText = "Fim do Ep 2, Início do Ep 3";
    endChapterBtn.style.display = 'block';
    endChapterBtn.removeEventListener('click', goToNextChapter);
    endChapterBtn.addEventListener('click', goToNextChapter);
    console.log("Botão de fim de capítulo exibido.");
}

function goToNextChapter() {
    console.log("Botão 'Fim do Ep 2' clicado. Redirecionando...");
    // Substitua 'URL_DO_PROXIMO_SITE' pela URL real
    window.location.href = 'URL_DO_PROXIMO_SITE';
}

// --- Inicialização ---

function initGame() {
    console.log("Iniciando o jogo...");

    // *** RECUPERAÇÃO DO NOME SALVO NO localStorage ***
    const savedName = localStorage.getItem('playerName');
    if (savedName) {
        gameState.playerName = savedName;
        console.log(`Nome do jogador "${gameState.playerName}" recuperado do localStorage.`);
    } else {
        console.log("Nenhum nome de jogador encontrado no localStorage. Usando o nome padrão.");
    }
    // *************************************************

    gameState.script = initialScript;
    gameState.currentScriptArray = initialScript;
    gameState.currentIndex = 0;
    gameState.choicesShown = false;
    gameState.isPausedForAsset = false;

    // Precarregar imagens
    const allScripts = [initialScript, continuationScripts["Raven"], continuationScripts["Liam"], continuationScripts["Neutro"], nextHookScript];
    allScripts.forEach(script => {
        if (script) {
            script.forEach(lineData => {
                if (lineData.length > 1 && lineData[1] && lineData[1] !== 'flash' && lineData[0] !== "END_CHAPTER_2") {
                    const img = new Image();
                    img.src = lineData[1];
                }
            });
        }
    });

    continueBtn.removeEventListener('click', displayNextLine);
    continueBtn.addEventListener('click', displayNextLine);
    console.log("Event listener adicionado ao botão continuar.");

    endChapterBtn.style.display = 'none';

    if (bgm) {
        bgm.volume = 0.2;
        bgm.play().catch(e => console.error("Erro ao reproduzir BGM:", e));
        console.log("Tentando reproduzir BGM.");
    }

    displayNextLine();
    console.log("initGame concluído.");
}

window.onload = initGame;
