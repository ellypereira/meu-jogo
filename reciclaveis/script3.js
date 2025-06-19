 const storyText = document.getElementById('story-text');
        const textBox = document.getElementById('text-box');
        const choices = document.getElementById('choices');
        const bgMusic = document.getElementById('bg-music');

        let stage = 0;
        let musicStarted = false;

        let lucienAffinity = parseInt(localStorage.getItem('lucienAffinity')) || 0;
        let eliasAffinity = parseInt(localStorage.getItem('eliasAffinity')) || 0;

        textBox.addEventListener('click', nextScene);

        function nextScene() {
            if (!musicStarted) {
                bgMusic.play();
                musicStarted = true;
            }

            switch (stage) {
                case 0:
                    storyText.textContent = "(Um dia se passou. Elias e Lucien foram atenciosos...)";
                    stage++;
                    break;
                case 1:
                    storyText.textContent = "(Falaram sobre o colar... O mesmo que perdi no orfanato anos atrás.)";
                    stage++;
                    break;
                case 2:
                    storyText.textContent = "(Disseram que ele pertencia à minha mãe, uma Guardiã do Limiar.)";
                    stage++;
                    break;
                case 3:
                    storyText.textContent = "(Ela mantinha o equilíbrio entre o mundo dos vivos e o das sombras.)";
                    stage++;
                    break;
                case 4:
                    storyText.textContent = "(Contaram sobre rituais antigos — vínculos de sangue e alma.)";
                    stage++;
                    break;
                case 5:
                    storyText.textContent = "(Minha mãe se ofereceu como âncora... selando algo. Ou alguém.)";
                    stage++;
                    break;
                case 6:
                    storyText.textContent = "(O colar era a chave. Ou o grilhão.)";
                    stage++;
                    break;
                case 7:
                    storyText.textContent = "(Não foi fácil aceitar que fui vigiada desde o nascimento.)";
                    stage++;
                    break;
                case 8:
                    storyText.textContent = "(Não por compaixão, mas porque acham que herdei o papel dela — ou algo pior.)";
                    stage++;
                    break;
                case 9:
                    storyText.textContent = "(Hoje, Elias me deu um colar. Talvez o mesmo de antes, restaurado.)";
                    showCollarImage();
                    stage++;
                    break;
                case 10:
                    storyText.textContent = "(Ao tocá-lo... vozes antigas sussurraram sob minha pele. Me chamavam.)";
                    stage++;
                    break;
                case 11:
                    showIdentityChoice();
                    break;
                case 12:
                    showBondingChoice();
                    break;
                case 13:
                    concludeEpisode();
                    break;
            }
        }

       function showCollarImage() {
    const imageContainer = document.getElementById('image-container');
    const collarImage = document.getElementById('collar-image');

    collarImage.classList.add('pulsing');
    imageContainer.classList.add('show');

    setTimeout(() => {
        imageContainer.classList.add('hide');
        collarImage.classList.remove('pulsing');
    }, 3000);

    setTimeout(() => {
        imageContainer.classList.remove('show', 'hide');
    }, 4500);
}


        function showIdentityChoice() {
            storyText.textContent = "As vozes diziam meu nome... mas não o de agora. Um nome antigo, esquecido.";
            choices.innerHTML = `
                <button class="choice-button" onclick="chooseIdentity(1)">Aceitar o chamado</button>
                <button class="choice-button" onclick="chooseIdentity(2)">Recusar e tirar o colar</button>
            `;
        }

        function chooseIdentity(option) {
            choices.innerHTML = '';
            if (option === 1) {
                storyText.textContent = "(Você fecha os olhos. As vozes ecoam em sua mente. Algo desperta.)";
                // Nenhum impacto imediato, mas abre caminho para novos poderes
            } else {
                storyText.textContent = "(Você arranca o colar. O silêncio volta... mas algo dentro de você grita.)";
                lucienAffinity -= 1;
                eliasAffinity -= 1;
            }
            stage = 12;
        }

        function showBondingChoice() {
            setTimeout(() => {
                storyText.textContent = "Lucien e Elias observam de longe. Você sente o peso de suas expectativas.";
                choices.innerHTML = `
                    <button class="choice-button" onclick="bond(1)">Aproximar-se de Lucien</button>
                    <button class="choice-button" onclick="bond(2)">Ficar ao lado de Elias</button>
                    <button class="choice-button" onclick="bond(3)">Ficar sozinha com o colar</button>
                `;
            }, 1000);
        }

        function bond(option) {
            choices.innerHTML = '';
            if (option === 1) {
                storyText.textContent = "Lucien se aproxima com um sorriso sombrio. __'Você está começando a entender.'";
                lucienAffinity += 2;
            } else if (option === 2) {
                storyText.textContent = "Elias toca seu ombro suavemente. __'Não está sozinha. Nunca esteve.'";
                eliasAffinity += 2;
            } else {
                storyText.textContent = "(Você segura o colar com força. Precisa de silêncio para ouvir o que ele diz.)";
                // Rota neutra
            }
            stage = 13;
        }

        function concludeEpisode() {
            setTimeout(() => {
                if (lucienAffinity > eliasAffinity) {
                    storyText.textContent = "Lucien a observa como se já soubesse seu destino. __'A chave despertou. E o que está preso... sente você.'";
                } else if (eliasAffinity > lucienAffinity) {
                    storyText.textContent = "Elias segura sua mão. __'O selo está enfraquecendo. Mas ainda há tempo... se escolher com sabedoria.'";
                } else {
                    storyText.textContent = "Sozinha no quarto, você ouve novamente os sussurros. __Eles estão vindo.__";
                }

                localStorage.setItem('lucienAffinity', lucienAffinity);
                localStorage.setItem('eliasAffinity', eliasAffinity);

                setTimeout(() => {
                    choices.innerHTML = `
                        <button class="choice-button" onclick="nextEpisode()">Episódio 4</button>
                    `;
                }, 4000);
            }, 1500);
        }

        function nextEpisode() {
            window.location.href = 'ep4.html';
        }