
const storyText = document.getElementById('story-text');
const textBox = document.getElementById('text-box');
const choices = document.getElementById('choices');
const bgMusic = document.getElementById('bg-music');

let stage = 0;
let musicStarted = false;

// VARIÁVEIS DE AFINIDADE
let lucienAffinity = 0;
let eliasAffinity = 0;

textBox.addEventListener('click', nextScene);

function nextScene() {
    if (!musicStarted) {
        bgMusic.play();
        musicStarted = true;
    }

    switch (stage) {
        case 0:
            storyText.textContent = "Uma dor de cabeça intensa... você acorda em uma cama luxuosa.";
            stage++;
            break;
        case 1:
            storyText.textContent = "O quarto é escuro, decorado com velas, cortinas pesadas... e um aroma adocicado no ar.";
            stage++;
            break;
        case 2:
            storyText.textContent = "Você tenta se levantar, mas se sente fraca. Então, ouve passos.";
            stage++;
            break;
        case 3:
            storyText.textContent = "O vampiro de olhos angelicais entra lentamente. 'Você desmaiou... mas está segura agora.'";
            stage++;
            break;
        case 4:
            storyText.textContent = "Logo em seguida, o rebelde entra, encostado na parede. 'Eu disse que ela não aguentaria. Frágil... mas intrigante.'";
            stage++;
            break;
        case 5:
            showFirstChoices();
            break;
        case 6:
            showFinalChoices();
            break;
        case 7:
            defineRoute();
            break;
    }
}

function showFirstChoices() {
    choices.innerHTML = `
        <button class="choice-button" onclick="chooseFirst(1)">'O que vocês fizeram comigo?'</button>
        <button class="choice-button" onclick="chooseFirst(2)">'Obrigada por me ajudarem... eu acho.'</button>
    `;
}

function chooseFirst(option) {
    choices.innerHTML = '';
    if (option === 1) {
        storyText.textContent = "Lucien sorri com sarcasmo. 'Nada... ainda.' Elias olha para ele, desaprovando.";
        lucienAffinity += 1;
    } else if (option === 2) {
        storyText.textContent = "Elias sorri levemente. 'Você está segura. Tentamos não assustá-la.'";
        eliasAffinity += 1;
    }
    stage = 6;
}

function showFinalChoices() {
    setTimeout(() => {
        storyText.textContent = "Eles trocam olhares. Você sente que há tensão entre eles... e também algo irresistível.";
        choices.innerHTML = `
            <button class="choice-button" onclick="chooseFinal(1)">Olhar para Lucien com curiosidade</button>
            <button class="choice-button" onclick="chooseFinal(2)">Confiar mais em Elias</button>
        `;
    }, 1000);
}

function chooseFinal(option) {
    choices.innerHTML = '';
    if (option === 1) {
        storyText.textContent = "Lucien levanta uma sobrancelha. 'Gosto de você.'";
        lucienAffinity += 2;
    } else if (option === 2) {
        storyText.textContent = "Elias se aproxima calmamente. 'Você tem um coração gentil. Isso é raro aqui.'";
        eliasAffinity += 2;
    }
    stage = 7;
}

function defineRoute() {
    setTimeout(() => {
        if (lucienAffinity > eliasAffinity) {
            storyText.textContent = "Você sente uma atração perigosa por Lucien. Sua jornada seguirá por caminhos sombrios...";
        } else if (eliasAffinity > lucienAffinity) {
            storyText.textContent = "Você confia em Elias. Sua alma se conecta com a dele de forma misteriosa.";
        } else {
            storyText.textContent = "Você ainda não tem certeza... mas sabe que os dois escondem segredos profundos.";
        }

        // começar o Episódio 3
        setTimeout(() => {
            choices.innerHTML = `
                <button class="choice-button" onclick="goToNext()">Iniciar Episódio 3</button>
            `;
        }, 3000);
    }, 1500);
}

function goToNext() {
    window.location.href = 'ep3.html'; // Crie depois
}