const storyText = document.getElementById('story-text');
const textBox = document.getElementById('text-box');
const choices = document.getElementById('choices');
const affinityBar = document.getElementById('affinity-bar');
const affJake = document.getElementById('aff-jake');
const affElias = document.getElementById('aff-elias');
const affLucien = document.getElementById('aff-lucien');
const affKlaus = document.getElementById('aff-klaus');

const bgMusic = document.getElementById('bg-music');
const thunderSound = document.getElementById('thunder-sound');

let stage = 0;
let waitingClick = false;
let musicStarted = false;

let jakeAffinity = parseInt(localStorage.getItem('jakeAffinity')) || 0;
let eliasAffinity = parseInt(localStorage.getItem('eliasAffinity')) || 0;
let lucienAffinity = parseInt(localStorage.getItem('lucienAffinity')) || 0;
let klausAffinity = parseInt(localStorage.getItem('klausAffinity')) || 0;

let survivors = {};
let deadCharacter = null;

textBox.addEventListener('click', () => {
    if (!musicStarted) {
        bgMusic.volume = 0.5;
        bgMusic.play();
        musicStarted = true;
    }
    if (waitingClick) {
        waitingClick = false;
        nextScene();
    }
});

function updateAffinityBar() {
    affJake.textContent = jakeAffinity;
    affElias.textContent = eliasAffinity;
    affLucien.textContent = lucienAffinity;
    affKlaus.textContent = klausAffinity;
}

function determineSurvivors() {
    survivors = {
        jake: jakeAffinity > -999,
        elias: eliasAffinity > -999,
        lucien: lucienAffinity > -999,
        klaus: klausAffinity > -999,
    };
}

function findLowestAffinity() {
    let affinities = [
        {name: 'jake', val: jakeAffinity, alive: survivors.jake},
        {name: 'elias', val: eliasAffinity, alive: survivors.elias},
        {name: 'lucien', val: lucienAffinity, alive: survivors.lucien},
        {name: 'klaus', val: klausAffinity, alive: survivors.klaus},
    ].filter(p => p.alive);

    if (affinities.length === 0) return null;
    affinities.sort((a,b) => a.val - b.val);
    return affinities[0].name;
}

function startEpisode() {
    determineSurvivors();
    deadCharacter = findLowestAffinity();
    localStorage.setItem('deadCharacter', deadCharacter);

    waitingClick = true;
    affinityBar.style.display = 'none';
    updateAffinityBar();

    stage = 0;
    storyText.style.opacity = 1;
    storyText.textContent = '(A escuridão envolve a mansão. O destino será decidido.)';
}

function nextScene() {
    if (!waitingClick) return;
    waitingClick = false;

    switch(stage) {
        case 0:
            storyText.textContent = "(Os trovões ribombam ao longe. Você sente o peso da decisão tomada.)";
            stage++;
            setTimeout(() => waitingClick = true, 500);
            break;
        case 1:
            storyText.textContent = "(Os sobreviventes se reúnem, tensos, sabendo que apenas um será salvo... ou todos sucumbirão.)";
            waitingClick = true;
            stage++;
            break;
        case 2:
            storyText.classList.add('glitch');
            storyText.textContent = `(O destino foi cruel... ${capitalize(deadCharacter)} não resistiu e caiu em batalha.)`;
            playThunder();
            waitingClick = true;
            stage++;
            break;
        case 3:
            storyText.classList.remove('glitch');
            storyText.textContent = `(Você sente o vazio da perda e a tensão aumenta na mansão.)`;
            waitingClick = true;
            stage++;
            break;
        case 4:
            if (localStorage.getItem('choseQueenRoute') === 'true') {
                storyText.textContent = `(A Rainha das Sombras sorri em seu trono, chamando você para um futuro sombrio e cruel.)`;
                stage = 100;
            } else {
                storyText.textContent = `(Você e os sobreviventes preparam-se para o confronto final contra as forças das trevas.)`;
                stage++;
            }
            break;
        case 5:
            showChoicesMain();
            break;
        case 100:
            storyText.textContent = `(Você está ao lado da Rainha, a mansão se torna um redemoinho de sombras e caos...)`;
            stage++;
            break;
        case 101:
            showChoicesQueen();
            break;
        case 102:
            storyText.textContent = `(A escuridão consome tudo... você sente o poder da Rainha crescendo em seu sangue.)`;
            stage++;
            break;
        case 103:
            storyText.textContent = `(Fim do episódio 8. O destino do mundo está por um fio...)`;
            showContinueButton();
            break;
        default:
            break;
    }
}

function showChoicesMain() {
    affinityBar.style.display = 'flex';
    updateAffinityBar();
    choices.innerHTML = `
        <button class="choice-button" onclick="chooseOption('save')">Salvar os sobreviventes e enfrentar a Rainha</button>
        <button class="choice-button" onclick="chooseOption('romance')">Aproximar-se de um sobrevivente (romance)</button>
        <button class="choice-button" onclick="chooseOption('joinQueen')">Juntar-se à Rainha das Sombras</button>
    `;
    waitingClick = false;
}

function showChoicesQueen() {
    affinityBar.style.display = 'none';
    choices.innerHTML = `
        <button class="choice-button" onclick="chooseQueen('attack')">Atacar os sobreviventes</button>
        <button class="choice-button" onclick="chooseQueen('merciful')">Oferecer aliança sombria</button>
    `;
    waitingClick = false;
}

function chooseOption(option) {
    choices.innerHTML = '';
    affinityBar.style.display = 'none';
    waitingClick = true;

    switch(option) {
        case 'save':
            storyText.textContent = "(Você decide lutar com os sobreviventes contra a Rainha e suas sombras.)";
            stage = 110;
            setTimeout(() => nextSceneBattle(), 1500);
            break;
        case 'romance':
            stage = 120;
            nextScene();
            break;
        case 'joinQueen':
            storyText.textContent = "(Você escolhe o poder sombrio da Rainha e vira sua aliada.)";
            localStorage.setItem('choseQueenRoute', 'true');
            stage = 100;
            setTimeout(() => nextSceneBattle(), 1500);
            break;
    }
}

function chooseQueen(option) {
    choices.innerHTML = '';
    waitingClick = true;

    if(option === 'attack') {
        storyText.textContent = "(Você ordena um ataque brutal contra os sobreviventes. A batalha final começa.)";
    } else {
        storyText.textContent = "(Você oferece um pacto sombrio, buscando evitar um confronto sangrento.)";
    }
    stage = 103;
    setTimeout(() => nextScene(), 2000);
}

function nextSceneBattle() {
    if(stage >= 110 && stage < 120) {
        storyText.textContent = "(A batalha épica começa. As sombras se espalham e a mansão treme.)";
        stage++;
        setTimeout(() => showChoicesSurvivor(), 1500);
        return;
    }
    if(stage >= 120) {
        showRomanceChoices();
        return;
    }
}

function showChoicesSurvivor() {
    affinityBar.style.display = 'flex';
    updateAffinityBar();

    let buttons = '';
    if(survivors.jake) buttons += `<button class="choice-button" onclick="chooseSave('jake')">Salvar Jake</button>`;
    if(survivors.elias) buttons += `<button class="choice-button" onclick="chooseSave('elias')">Salvar Elias</button>`;
    if(survivors.lucien) buttons += `<button class="choice-button" onclick="chooseSave('lucien')">Salvar Lucien</button>`;
    if(survivors.klaus) buttons += `<button class="choice-button" onclick="chooseSave('klaus')">Salvar Klaus</button>`;

    choices.innerHTML = buttons;
    waitingClick = false;
}

function chooseSave(char) {
    choices.innerHTML = '';
    affinityBar.style.display = 'none';
    waitingClick = true;

    storyText.textContent = `(Você decide salvar ${capitalize(char)}. O destino dele pode mudar o futuro...)`;

    switch(char) {
        case 'jake': jakeAffinity += 3; break;
        case 'elias': eliasAffinity += 3; break;
        case 'lucien': lucienAffinity += 3; break;
        case 'klaus': klausAffinity += 3; break;
    }

    localStorage.setItem('jakeAffinity', jakeAffinity);
    localStorage.setItem('eliasAffinity', eliasAffinity);
    localStorage.setItem('lucienAffinity', lucienAffinity);
    localStorage.setItem('klausAffinity', klausAffinity);

    stage = 130;
    setTimeout(() => nextSceneSave(), 1500);
}

function nextSceneSave() {
    storyText.textContent = `(A batalha final se aproxima. As sombras avançam...)`;
    showContinueButton();
}

function showContinueButton() {
    choices.innerHTML = `
        <button class="choice-button" onclick="goToNext()">Continuar para o Episódio 9</button>
    `;
    waitingClick = false;
}

function goToNext() {
    window.location.href = 'ep9.html';
}

function playThunder() {
    thunderSound.currentTime = 0;
    thunderSound.play();
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

startEpisode();
