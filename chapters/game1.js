// ========================
// 🎮 BLOOD AND SILENCE 🎮
// ========================

document.addEventListener('DOMContentLoaded', () => {

    // 🔗 Seleção de Elementos
    const storyText = document.getElementById('story-text');
    const textBox = document.getElementById('text-box');
    const choicesContainer = document.getElementById('choices');
    const fadeScreen = document.getElementById('fade-screen');
    const musicFloresta = document.getElementById('bg-floresta');
    const musicQuarto = document.getElementById('bg-quarto');
    const volumeBtn = document.getElementById('volume-toggle');
    const gameContainer = document.getElementById('game-container');
    const silhouette = document.getElementById('silhouette');
    const speechBubble = document.getElementById("speech-bubble");
    const speechText = document.getElementById("speech-text");

    // Personagens
    const lucienImg = document.getElementById("lucien");
    const eliasImg = document.getElementById("elias");

    // Variáveis de Controle
    let isMuted = false;
    let currentMusic = null;
    let waitingForChoice = false;
    const STAGE_KEY = 'bs_stage_v1';
    let canAdvance = true;

    // Carrega o estágio salvo ou começa do 0
    let stage = parseInt(localStorage.getItem(STAGE_KEY), 10) || 0;

    // Sistema de Afinidade
    let affinity = JSON.parse(localStorage.getItem('affinity')) || {
        Lucien: 0, Elias: 0, Klaus: 0, Jake: 0
    };

    // --- FUNÇÕES DE INTERFACE ---

    function showCharacter(char) {
        if (char) {
            char.style.display = "block";
            setTimeout(() => { char.style.opacity = "1"; }, 50);
        }
    }

    function hideCharacters() {
        [lucienImg, eliasImg, silhouette].forEach(img => {
            if (img) {
                img.style.opacity = "0";
                setTimeout(() => { img.style.display = "none"; }, 500);
            }
        });
    }

    function showSpeech(character, text) {
        if (!speechBubble || !textBox) return;

        textBox.style.display = "none";
        speechBubble.classList.remove("hidden", "bubble-left", "bubble-right");

        hideCharacters();

        if (character === "lucien") {
            showCharacter(lucienImg);
            speechBubble.classList.add("bubble-right");
        } else if (character === "elias") {
            showCharacter(eliasImg);
            speechBubble.classList.add("bubble-left");
        }

        speechText.textContent = text;
    }

    function narrator(text) {
        if (!speechBubble || !textBox) return;
        speechBubble.classList.add("hidden");
        hideCharacters();
        textBox.style.display = "block";
        storyText.textContent = text;
    }

    // --- FUNÇÃO INICIAR JOGO ---
    window.startGame = function () {
        const nameInput = document.getElementById("name-input");
        const name = nameInput.value.trim();

        if (!name) {
            alert("Digite seu nome...");
            return;
        }

        localStorage.setItem("playerName", name);
        document.getElementById("name-screen").style.display = "none";

        // Reset stage para começar do começo
        stage = 0;
        nextScene();
    };

    // --- LÓGICA DA HISTÓRIA ---
    function nextScene() {
        if (waitingForChoice) return;

        const playerName = localStorage.getItem("playerName") || "???";

        switch (stage) {
            case 0:
                narrator(`Meu nome é ${playerName}... e aquele foi o começo do fim.`);
                break;
            case 1:
                narrator("Eu não deveria estar ali. Sabia disso desde o momento em que decidi sair sem rumo...");
                break;
            case 2:
                narrator("A floresta foi ficando mais densa, o ar mais frio, e percebi que não reconhecia mais o caminho.");
                break;
            case 3:
                narrator("Foi então que senti... Olhares.");
                showCharacter(silhouette);
                break;
            case 4:
                showSpeech("lucien", "— Hum... Humana perdida?");
                break;
            case 5:
                showSpeech("elias", "— Ela está assustada. Devemos ajudá-la.");
                break;
            case 6:
                narrator("Meu coração dispara. Eles não pareciam pessoas comuns. Havia algo elegante e perigoso neles.");
                break;
            case 7:
                narrator("(Instinto puro toma conta. Antes que eu pudesse pensar, comecei a correr.)");
                break;
            case 8:
                screenShake();
                narrator("*PUM!* (Tropeço em uma raiz. O chão some e tudo escurece.)");
                fadeToBlackAndBack();
                break;
            case 9:
                narrator("(Acordo em um lugar diferente. Cheiro de velas e madeira antiga.)");
                if (currentMusic !== 'quarto') playMusic('quarto');
                break;
            case 10:
                showSpeech("lucien", "— Dorminhoca. Achei que acordaria gritando.");
                break;
            case 11:
                showSpeech("elias", "— Lucien... vá com calma. Ela acabou de despertar.");
                break;
            case 12:
                showFirstChoices();
                return; // Pausa para escolha
            case 13:
                narrator("O silêncio que se seguiu foi pesado. Algo antigo acabara de despertar.");
                break;
            case 14:
                showSpeech("elias", "— Você carrega o colar... A Guardiã.");
                break;
            case 15:
                showFinalChoices();
                return;
            default:
                narrator("Fim do Capítulo 1.");
                document.getElementById('chapter-end').style.display = "flex";
                document.getElementById('next-episode-btn').style.display = "block";
                return;
        }

        stage++;
        localStorage.setItem(STAGE_KEY, stage);
    }

    // --- ESCOLHAS ---
    function showFirstChoices() {
        waitingForChoice = true;
        choicesContainer.innerHTML = `
            <button class="gothic-btn" onclick="makeChoice('lucien', 1)">"Fiquem longe de mim!"</button>
            <button class="gothic-btn" onclick="makeChoice('elias', 1)">"Obrigada por me ajudarem."</button>
        `;
    }

    window.makeChoice = function(char, points) {
        waitingForChoice = false;
        choicesContainer.innerHTML = '';

        if (char === 'lucien') {
            affinity.Lucien += points;
            showAffinityMessage("+1 Afinidade com Lucien ❤️");
        } else {
            affinity.Elias += points;
            showAffinityMessage("+1 Afinidade com Elias 💙");
        }

        updateAffinityPanel();
        stage++;
        nextScene();
    };

    function showFinalChoices() {
        waitingForChoice = true;
        choicesContainer.innerHTML = `
            <button class="gothic-btn" onclick="window.location.href='capitulo2.html'">Avançar para o Capítulo 2</button>
        `;
    }

    // --- UTILITÁRIOS ---
    function playMusic(type) {
        musicFloresta.pause();
        musicQuarto.pause();
        if (type === 'floresta') musicFloresta.play().catch(e => {});
        if (type === 'quarto') musicQuarto.play().catch(e => {});
        currentMusic = type;
    }

    function updateAffinityPanel() {
        document.getElementById('lucien-score').textContent = affinity.Lucien;
        document.getElementById('elias-score').textContent = affinity.Elias;
        localStorage.setItem('affinity', JSON.stringify(affinity));
    }

    function showAffinityMessage(text) {
        const msgDiv = document.getElementById('affinity-message');
        msgDiv.textContent = text;
        msgDiv.style.opacity = "1";
        setTimeout(() => { msgDiv.style.opacity = "0"; }, 3000);
    }

    function screenShake() {
        gameContainer.classList.add('shake');
        setTimeout(() => gameContainer.classList.remove('shake'), 500);
    }

    function fadeToBlackAndBack() {
        fadeScreen.style.opacity = "1";
        setTimeout(() => { fadeScreen.style.opacity = "0"; }, 1500);
    }

    // --- INICIALIZAÇÃO ---
    volumeBtn.addEventListener('click', () => {
        isMuted = !isMuted;
        musicFloresta.muted = isMuted;
        musicQuarto.muted = isMuted;
        volumeBtn.textContent = isMuted ? '🔇' : '🔊';
    });

    textBox.addEventListener('click', nextScene);
    speechBubble.addEventListener('click', nextScene);

    // Atualiza painel de afinidade
    updateAffinityPanel();

    // Inicia música de fundo
    playMusic('floresta');

});
