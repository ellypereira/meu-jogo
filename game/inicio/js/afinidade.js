function atualizarAfinidade(pontos) {
    afinidadeAdrian += pontos;
    document.getElementById('pontosAdrian').textContent = afinidadeAdrian;

    const afinidadeBox = document.getElementById('afinidade');
    afinidadeBox.style.display = 'block';
    afinidadeBox.style.opacity = 0;

    // Fade-in
    setTimeout(() => {
        afinidadeBox.style.transition = 'opacity 0.5s';
        afinidadeBox.style.opacity = 1;
    }, 100);

    // Fade-out depois de 3 segundos
    setTimeout(() => {
        afinidadeBox.style.opacity = 0;
    }, 3000);
}
