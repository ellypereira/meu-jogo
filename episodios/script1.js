 // Elementos principais
  const btnIniciar = document.getElementById('btn-iniciar');
  const telaInicial = document.getElementById('tela-inicial');

  const telaNome = document.getElementById('tela-nome');
  const btnConfirmarNome = document.getElementById('btn-confirmar-nome');
  const nomeInput = document.getElementById('nome-input');

  const episodio = document.getElementById('episodio');
  const fraseGrande = document.getElementById('frase-grande');
  const dialogoDiv = document.getElementById('dialogo');
  const autorDiv = document.getElementById('autor');
  const botaoContinuar = document.getElementById('botao-continuar');
  const opcoesDiv = document.getElementById('opcoes');

  let nomeJogador = '';
  let dialogoIndex = 0;
  let dialogos = [];

  // Quando clicar em Iniciar
  btnIniciar.onclick = () => {
    telaInicial.style.display = 'none';
    telaNome.style.display = 'flex';
  };

  // Confirmar nome
  document.getElementById('btn-confirmar-nome').onclick = () => {
    const nome = nomeInput.value.trim();
    if (nome !== '') {
      nomeJogador = nome;
      telaNome.style.display = 'none';
      iniciarEpisodio();
    } else {
      alert('Por favor, insira seu nome.');
    }
  };

  // Função para iniciar o episódio
  function iniciarEpisodio() {
    fraseGrande.style.display = 'block';
    setTimeout(() => {
      fraseGrande.style.display = 'none';
      iniciarCena();
    }, 3000);
  }

  // Função para iniciar a cena
  function iniciarCena() {
    episodio.style.display = 'flex';

    // Sequência inicial do narrador
    dialogos = [
      {
        texto: "Você corre... Mas não sabe de quê. A neblina é espessa como um véu, e o som das suas próprias pegadas ecoa como se a floresta estivesse vazia. Você sente... algo. Como se estivesse sendo observada.",
        autor: "NARRADOR"
      }
    ];
    dialogoIndex = 0;
    exibirProximoDialogo();

    // Evento do botão "Continuar"
    botaoContinuar.onclick = () => {
      exibirProximoDialogo();
    };
  }

  // Função principal para exibir diálogos
  function exibirProximoDialogo() {
    if (dialogoIndex < dialogos.length) {
      const d = dialogos[dialogoIndex];
      dialogo.innerHTML = `<p style="${d.pensamento ? 'font-style:italic;' : ''}">${d.texto}</p>`;
      autor.innerHTML = `<em>${d.autor}</em>`;
      dialogoIndex++;
    } else {
      // Quando acabar o diálogo
      dialogo.innerHTML = `<p>Continua...</p>`;
      autor.innerHTML = '';
    }
  }

  