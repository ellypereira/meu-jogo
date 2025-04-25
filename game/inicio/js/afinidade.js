let afinidadeAdrian = 0;

export function atualizarAfinidade(valor) {
    afinidadeAdrian += valor;
    document.getElementById("pontosAdrian").innerText = afinidadeAdrian;
}
