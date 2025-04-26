// Importante: certifique-se de que seu HTML tenha <audio id="audio-flashback"> corretamente configurado

export function iniciarFlashbackVisual() {
    const flashbackDiv = document.getElementById("flashback-visual");
    const img = document.getElementById("imagem-flashback");
    const audio = document.getElementById("audio-flashback");

    // Lista de imagens do flashback
    const imagens = [
        "assets/img/flash1.png",
        "assets/img/flash2.png",
        "assets/img/flash3.png"
    ];

    let index = 0;

    // Mostrar container do flashback
    flashbackDiv.style.display = "block";
    img.style.opacity = 1;
    img.src = imagens[index];

    // Tocar música do flashback
    audio.currentTime = 0;
    audio.volume = 0.6;
    audio.play();

    const intervalo = setInterval(() => {
        index++;
        if (index < imagens.length) {
            // Fade out
            img.style.opacity = 0;

            setTimeout(() => {
                img.src = imagens[index];
                img.style.opacity = 1; // Fade in
            }, 1000);
        } else {
            clearInterval(intervalo);

            // Esperar um pouco antes de encerrar
            setTimeout(() => {
                encerrarFlashback();
            }, 3000);
        }
    }, 4000);
}

export function encerrarFlashback() {
    const flashbackDiv = document.getElementById("flashback-visual");
    const nome = document.getElementById("nome");
    const texto = document.getElementById("texto");
    const pensamento = document.getElementById("pensamento");
    const textoPensamento = document.getElementById("texto-pensamento");
    const opcoes = document.getElementById("opcoes");
    const audio = document.getElementById("audio-flashback");

    // Fade out da imagem
    const img = document.getElementById("imagem-flashback");
    img.style.opacity = 0;

    // Parar música
    audio.pause();
    audio.currentTime = 0;

    // Esconder flashback visual
    setTimeout(() => {
        flashbackDiv.style.display = "none";

        // Atualizar diálogo após o flashback
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

    }, 1000); // Tempo para completar o fade da imagem
}
