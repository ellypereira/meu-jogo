function escolha(opcao) {
    const nome = document.getElementById("nome");
    const texto = document.getElementById("texto");
    const opcoes = document.getElementById("opcoes");
    const personagem = document.getElementById("personagem");

    switch(opcao) {
        case 1:
            nome.textContent = "???";
            texto.textContent = "Você sente uma mão fria tocando seu ombro... Ele chegou.";
            personagem.style.display = "block"; // aparece sprite
            opcoes.style.display = "none";
            break;
        case 2:
            nome.textContent = "Voz misteriosa";
            texto.textContent = "Shhh... Silêncio. Eles escutam tudo.";
            personagem.style.display = "none";
            opcoes.style.display = "none";
            break;
        case 3:
            nome.textContent = "???";
            texto.textContent = "Você tropeça em algo... olhos vermelhos brilham no escuro.";
            personagem.style.display = "none";
            opcoes.style.display = "none";
            break;
    }
}