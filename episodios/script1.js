const storyText = document.getElementById('story-text');
const textBox = document.getElementById('text-box');
const choices = document.getElementById('choices');
const fadeScreen = document.getElementById('fade-screen');
const bgMusic = document.getElementById('bg-music');

let stage = 0;
let musicStarted = false;

textBox.addEventListener('click', nextScene);

function nextScene() {
     if (!musicStarted) {
        bgMusic.play();
        musicStarted = true;
    }

    switch (stage) {
        case 0:
            storyText.textContent = "Você acorda no meio de uma floresta escura... Não lembra de nada.";
            stage++;
            break;
        case 1:
            storyText.textContent = "O som de corvos ecoa. Você está tremendo, perdida, sem saber seu próprio nome.";
            stage++;
            break;
        case 2:
            storyText.textContent = "De repente, duas silhuetas surgem entre as árvores.";
            stage++;
            break;
        case 3:
            storyText.textContent = "Um deles tem olhos de fogo e um sorriso arrogante. O outro parece calmo, quase angelical.";
            stage++;
            break;
        case 4:
            storyText.textContent = `"Hum... humana perdida?" — diz o rebelde, com a voz rouca.`;
            stage++;
            break;
        case 5:
            storyText.textContent = `"Ela está assustada. Devemos ajudá-la", diz o de olhos claros, quase sussurrando.`;
            stage++;
            break;
        case 6:
            storyText.textContent = "Você sente o coração acelerar. Eles são lindos... perigosamente lindos.";
            stage++;
            break;
        case 7:
            storyText.textContent = "O medo domina seu corpo. Você vira e corre.";
            stage++;
            break;
        case 8:
            storyText.textContent = "*PUM!* Você tropeça, cai... e tudo escurece.";
            triggerFadeOut();
            stage++;
            break;
        default:
            // Fim da cena
            break;
    }
}

function triggerFadeOut() {
    fadeScreen.style.opacity = 1;

     // Após o fade, mostra o botão
    setTimeout(() => {
        const nextBtn = document.getElementById('next-episode-btn');
        nextBtn.style.display = 'block';

        nextBtn.addEventListener('click', () => {
            window.location.href = 'ep2.html';
        });
    }, 2500); // espera 2.5 segundos para aparecer
}
