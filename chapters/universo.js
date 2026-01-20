  // Botão do blog / (antes era "Assistir anúncio")
  const btnAnuncio = document.getElementById("btn-anuncio");
  if (btnAnuncio) {
    btnAnuncio.addEventListener("click", () => {
      // Abre a página de blog em nova aba
      // Importante: n tem ligação com recompensa de PA, pra não dar problema com AdSense
      window.open("/pagina/universo.html", "_blank");
    });
  }