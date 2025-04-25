export function iniciarFlashbackVisual() {
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

export function encerrarFlashback() {
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
