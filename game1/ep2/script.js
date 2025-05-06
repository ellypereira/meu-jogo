// Elementos do DOM
const textElement = document.getElementById('text');
const continueBtn = document.getElementById('continue-btn');
const gameDiv = document.getElementById('game');
const flashSound = document.getElementById('flash-sound');
const choicesContainer = document.getElementById('choices-container');
const sprite = document.getElementById('sprite'); // Adicionada a referência ao sprite
const bgm = document.getElementById('bgm'); // Mantida a referência ao BGM
const endChapterBtn = document.getElementById('end-chapter-btn'); // botão de fim de capítulo

// Estado do jogo
const gameState = {
    currentIndex: 0,
    script: [], // Começa vazio, será preenchido em initGame
    choicesShown: false,
    currentScriptArray: null, // Para saber qual array de script estou usando atualmente (initial, continuation, nextHook)
    isPausedForAsset: false // Novo estado para controlar a pausa para visualização do asset
};

// Scripts de continuação baseados nas escolhas
const continuationScripts = {
    "Raven": [
        ["Você encara Raven. Seus olhos vermelhos parecem brilhar mais intensamente."],
        ["Protagonista: 'Fale. O que você fez comigo?'"],
        ["Raven sorri, mas há algo triste em seu olhar."],
        ["Raven: 'Eu apenas impedi que você morresse... mas não posso impedir o que você se tornou.'"],
        ["Ele se aproxima, e seu toque no seu pulso faz suas correntes se desfazerem em cinzas."],
        ["FLASH: Um salão, corpos dançando... sangue escorrendo pelo mármore. Você, no centro."],
        ["Raven: 'Seu sangue não é mais humano. Você pertence à Noite agora.'"]
    ],
    "Liam": [
        ["Você vira o rosto para a cela ao lado. Os olhos de Liam brilham em azul pálido."],
        ["Protagonista: 'Liam, me diga a verdade. O que está acontecendo?'"],
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
        ["Protagonista: 'Eu não pertenço a nenhum de vocês. Não mais.'"],
        ["O poder se manifesta — som de vidro quebrando, luz distorcida."]
    ]
};

const nextHookScript = [
    ["Uma figura observa de longe, entre as sombras.", "misterioso.png"], // Linha com a imagem
    ["??? : 'A herdeira despertou. O pacto está se cumprindo.'"],
    ["END_CHAPTER_2"] // Marcador para o fim do capítulo/episódio
];

// Script inicial do jogo
const initialScript = [
    ["Escuridão..."],
    ["Goteiras ecoam. Um som ritmado... batimentos? Ou passos?"],
    ["Você respira fundo. Há cheiro de ferro e mofo no ar."],
    ["FLASH:uma rosa negra. Sangue. Um beijo interrompido por gritos."], // Linha de FLASH
    ["Voz desconhecida: 'Ela finalmente despertou.'"], // Próxima linha após o FLASH
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
    ["FLASH: Você em um baile, dançando com alguém... alguém com olhos dourados."], // Outro FLASH
    ["Você sente algo despertar."], // Próxima linha após o segundo FLASH
    ["Eles se aproximam ao mesmo tempo. Você precisa decidir em quem confiar."] // Esta é a linha antes das escolhas
];


// --- Funções de Manipulação do DOM ---

// Função para lidar com imagens ou outros assets associados a uma linha
function handleAsset(asset) {
    if (asset && asset !== 'flash') { 
        showSprite(asset); 
    } else {
        hideSprite(); 
    }
}

// Função para mostrar a imagem do sprite
function showSprite(imageUrl) {
    sprite.src = imageUrl;
    sprite.style.display = 'block';
    void sprite.offsetWidth;
    sprite.style.opacity = '1';

    sprite.onerror = () => {
        console.error("Falha ao carregar a imagem:", imageUrl);
        hideSprite(); // Esconde o sprite se a imagem não carregar
    };
}

// Função para esconder a imagem do sprite com transição
function hideSprite() {
    sprite.style.opacity = '0';
    const transitionDuration = parseFloat(getComputedStyle(sprite).transitionDuration) * 1000;
    setTimeout(() => {
        sprite.style.display = 'none';
        sprite.src = ''; // Limpa o src para evitar carregar a imagem escondida
    }, transitionDuration);
}


// --- Funções Principais de Fluxo ---

function triggerFlashEffect(lineText) {
    console.log(`--- triggerFlashEffect chamada para: ${lineText} ---`);
    const flashDescription = lineText.replace("FLASH:", "").trim();
    textElement.innerText = flashDescription; // Exibe a descrição do flash

    document.body.classList.add('flash');
    flashSound.currentTime = 0;
    flashSound.play().catch(e => console.error("Erro ao reproduzir som:", e));

    hideSprite(); // Esconde o sprite durante o flash
    continueBtn.style.display = 'none'; // Esconde o botão continuar durante o flash

    // Remove a classe flash após a animação
    setTimeout(() => {
        document.body.classList.remove('flash');

        if (gameState.currentIndex < gameState.script.length) {
             continueBtn.style.display = 'inline-block'; // Mostra o botão continuar
             console.log("Flash terminado, mostrando botão continuar.");
        } else {
            // Se o flash foi a última linha do script, garante que o botão não apareça
            console.log("Flash terminado, fim do script. Ocultando botão continuar.");
            continueBtn.style.display = 'none';
        }
        // *** FIM DA NOVA LÓGICA ***

    }, 1500); // Duração da animação 
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
         gameState.isPausedForAsset = false; // Desativa a pausa após o clique
         console.log("Pausa desativada.");

    } else {
         console.log("Jogo não pausado. Processando linha normal.");
    }

    if (gameState.currentIndex < gameState.script.length) {
        const currentLineData = gameState.script[gameState.currentIndex];
        const lineText = currentLineData[0];
        const lineAsset = currentLineData.length > 1 ? currentLineData[1] : null;

        // --- Lógica para o marcador de FIM DE CAPÍTULO ---
        if (lineText === "END_CHAPTER_2") {
            console.log(`Marcador END_CHAPTER_2 encontrado na linha ${gameState.currentIndex}.`);
            textElement.innerText = '';
            hideSprite();
            continueBtn.style.display = 'none';
            choicesContainer.style.display = 'none';
            displayEndChapterButton();
            gameState.currentIndex++; // Incrementa para evitar que o marcador seja processado novamente
            console.log(`currentIndex incrementado (após END_CHAPTER_2) para: ${gameState.currentIndex}`);
            return; 
        }

        // --- Lógica de processamento de FLASH ---
        if (lineText.startsWith("FLASH:")) {
            console.log(`Linha ${gameState.currentIndex} é um FLASH.`);
            textElement.className = '';
            gameState.currentIndex++;
            console.log(`currentIndex INCREMENTADO (antes do FLASH effect) para: ${gameState.currentIndex}`);
            triggerFlashEffect(lineText);
            return; // Sai da função para esperar o timeout do flash
        }

        // --- Lógica para linhas NORMAIS (texto, asset) ---
        console.log(`Linha ${gameState.currentIndex} é uma linha normal.`);

        // Exibe o texto
        textElement.className = '';
        textElement.innerText = lineText;
        console.log(`Exibindo texto: "${lineText.substring(0, Math.min(lineText.length, 50))}..."`);

        // Lida com o asset (imagem)
        handleAsset(lineAsset);
        console.log(`Lidando com asset: ${lineAsset}`);

        // *** NOVA LÓGICA: Pausar o fluxo se houver um asset (exceto flash) ***
        if (lineAsset && lineAsset !== 'flash') {
             console.log(`Asset encontrado. Pausando para visualização.`);
             gameState.isPausedForAsset = true; // Ativa o estado de pausa
             continueBtn.style.display = 'none'; // Oculta o botão Continuar durante a pausa

             // Define um tempo para a imagem ficar visível (em milissegundos)
             const assetDisplayDuration = 3000; // Exemplo: 3 segundos.

             setTimeout(() => {
                 console.log(`Tempo de visualização do asset (${assetDisplayDuration}ms) terminado.`);
                 if ((gameState.currentIndex + 1) < gameState.script.length) {
                     continueBtn.style.display = 'inline-block';
                     console.log("Pausa terminada, mostrando botão continuar.");
                 } else {
                     // Se a linha com o asset era a última antes do fim do script
                     console.log("Pausa terminada no fim do script (após a última linha).");
                      continueBtn.style.display = 'inline-block'; // Ainda precisa do clique para ir para o fim do script
                      console.log("Mostrando botão continuar para processar o fim do script.");
                 }


             }, assetDisplayDuration); // Tempo que a imagem ficará visível

             return; // Sai da função para esperar o timeout e o clique
        }
        // *** FIM DA NOVA LÓGICA DE PAUSA ***


        // Incrementa o índice APENAS para linhas sem asset ou FLASH
        // e que não acionaram a pausa.
        gameState.currentIndex++;
        console.log(`currentIndex INCREMENTADO (após linha normal/sem asset/sem pausa) para: ${gameState.currentIndex}`);

        if (gameState.currentIndex === gameState.script.length && !gameState.choicesShown) {
            console.log(`Fim do script atual. Verificando se mostrar escolhas/fim.`);
             // Se o script atual é o initialScript, mostra as escolhas principais
            if (gameState.currentScriptArray === initialScript) {
                 continueBtn.style.display = 'none'; // Esconde o botão continuar antes de mostrar escolhas
                 gameState.choicesShown = true;
                 console.log(`Mostrando escolhas após fim do initialScript.`);
                 setTimeout(showChoices, 1000); // Atraso antes de mostrar as escolhas
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
        continueBtn.style.display = 'none'; // Garante que o botão está oculto
        hideSprite(); // Garante que o sprite está oculto no fim absoluto
        // O botão de fim de capítulo já está visível neste ponto
    }
     console.log(`--- Fim da chamada displayNextLine ---`);
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
     choicesContainer.style.display = 'flex'; // Mostra o container de escolhas
     console.log("Escolhas exibidas.");
}

// Função para lidar com a escolha do jogador
function handleChoice(affinity) {
    localStorage.setItem('afinidade', affinity); // Salvar afinidade
    console.log(`Escolha selecionada: ${affinity}. Afinidade salva.`);

    choicesContainer.innerHTML = ''; // Remove os botões de escolha
    choicesContainer.style.display = 'none'; // Oculta o container
    hideSprite(); // Esconde o sprite após a escolha
    console.log("Escolhas removidas e sprite oculto.");

    // Carrega o script de continuação com base na afinidade
    const chosenScript = continuationScripts[affinity];

    // Combina o script da escolha com o script do próximo gancho
    gameState.script = chosenScript.concat(nextHookScript);
    gameState.currentScriptArray = gameState.script; // Define o script atual
    console.log(`Novo script carregado com ${gameState.script.length} linhas.`);

    // Reinicia o índice para o início do novo script
    gameState.currentIndex = 0;
    gameState.choicesShown = false; // Resetar para permitir futuras escolhas se houver
    gameState.isPausedForAsset = false; // Garante que a pausa de asset esteja desativada ao iniciar novo script
    console.log("currentIndex resetado para 0. choicesShown resetado para false. isPausedForAsset resetado para false.");

    // Exibe a primeira linha do novo script após um pequeno atraso
    setTimeout(() => {
        console.log("Iniciando exibição do novo script após escolha...");
        displayNextLine();
    }, 1000); // Atraso antes de mostrar a primeira linha do novo scriptt
}

// --- Nova Função para o Botão de Fim de Capítulo ---

function displayEndChapterButton() {
    endChapterBtn.innerText = "Fim do Ep 2, Início do Ep 3";
    endChapterBtn.style.display = 'block'; // Mostra o botão
    endChapterBtn.removeEventListener('click', goToNextChapter); // Remove listener anterior para evitar duplicidade
    endChapterBtn.addEventListener('click', goToNextChapter); // Adiciona o listener
    console.log("Botão de fim de capítulo exibido.");
}

function goToNextChapter() {
    console.log("Botão 'Fim do Ep 2' clicado. Redirecionando...");
    // Substitua 'URL_DO_PROXIMO_SITE' pela URL real para onde você quer redirecionar...
    window.location.href = 'URL_DO_PROXIMO_SITE';
}


// --- Inicialização ---

// Inicialização do jogo
function initGame() {
    console.log("Iniciando o jogo...");

    // Define o script inicial 
    gameState.script = initialScript;
    gameState.currentScriptArray = initialScript;
    gameState.currentIndex = 0; // Garante que comece do zero
    gameState.choicesShown = false;
    gameState.isPausedForAsset = false; // Garante que não comece pausado


     // Precarregar imagens
     const allScripts = [initialScript, continuationScripts["Raven"], continuationScripts["Liam"], continuationScripts["Neutro"], nextHookScript];
     allScripts.forEach(script => {
         if (script) { // Verifica se o script existe
             script.forEach(lineData => {
                 if (lineData.length > 1 && lineData[1] && lineData[1] !== 'flash' && lineData[0] !== "END_CHAPTER_2") { // Ignora o marcador
                     const img = new Image();
                     img.src = lineData[1];
                 }
             });
         }
     });

    // Adiciona o listener ao botão "Continuar"
    // Ele será o único responsável por avançar o script, respeitando as pausas.
    continueBtn.removeEventListener('click', displayNextLine); // Remove para evitar duplicidade
    continueBtn.addEventListener('click', displayNextLine);
    console.log("Event listener adicionado ao botão continuar.");


    // Oculta o botão de fim de capítulo no início do jogo
    endChapterBtn.style.display = 'none';

    // Reproduzir BGM
    if (bgm) {
        bgm.volume = 0.2; // Ajustar volume
        bgm.play().catch(e => console.error("Erro ao reproduzir BGM:", e));
        console.log("Tentando reproduzir BGM.");
    }

    // Exibe a primeira linha do script inicial
    displayNextLine();
     console.log("initGame concluído.");
}

// Inicia o jogo quando a página carregar
window.onload = initGame;