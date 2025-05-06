window.onload = () => {
    const audioFundo = document.getElementById("audio-fundo");
    audioFundo.volume = 0.2;  // Ajuste o volume conforme necessário
    audioFundo.play();

    mostrarMensagemNome();  // Chamada para mostrar a mensagem de nome
};

function mostrarMensagemNome() {
    const dialogo = document.getElementById("dialogo");
    const nomeMensagem = document.createElement("div");
    nomeMensagem.id = "nome-mensagem";
    nomeMensagem.innerText = "Por favor, insira seu nome:";
    nomeMensagem.style.textAlign = "center";
    nomeMensagem.style.margin = "1px";

    // Cria o campo de entrada para o nome
    const inputNome = document.createElement("input");
    inputNome.type = "text";
    inputNome.placeholder = "Seu nome aqui...";
    inputNome.id = "input-nome";

    // Cria um botão para confirmar a inserção do nome
    const botaoConfirmar = document.createElement("button");
    botaoConfirmar.innerText = "Confirmar";
    botaoConfirmar.onclick = () => {
        const nome = inputNome.value || "Jogador";  // Usa "Jogador" se nada for inserido
        document.getElementById("nome").innerText = nome;

        // Remove os elementos da tela
        dialogo.removeChild(nomeMensagem);
        dialogo.removeChild(inputNome);
        dialogo.removeChild(botaoConfirmar);

        continuarCena(); // Chama para iniciar os diálogos
    };

    // Adiciona os elementos ao diálogo
    dialogo.appendChild(nomeMensagem);
    dialogo.appendChild(inputNome);
    dialogo.appendChild(botaoConfirmar);

    const dialogos = [
        {
            texto: "Você sente uma presença observando você na escuridão. O frio percorre sua espinha, questionando se essa sensação é real ou fruto da sua imaginação. Você hesita, confuso e paralisado pela incerteza...",
            opcoes: [
                { texto: "Permanecer imóvel", proximo: 1 },
                { texto: "Chamar por alguém", proximo: 2 },
                { texto: "Correr para longe", proximo: 3 }
            ]
        },
        {
            texto: "A presença se aproxima lentamente, revelando-se como um espírito amigável. Seu olhar é penetrante e parece saber seus medos mais profundos. Você reflete: é seguro confiar nele?",
            opcoes: [
                { texto: "Conversar com o espírito", proximo: 4 },
                { texto: "Fugir novamente, não há tempo para arriscar", proximo: 5 }
            ]
        },
        {
            texto: "Ninguém responde ao seu chamado, e a escuridão ao seu redor se aprofunda, como se a própria noite estivesse te engolindo. Você se pergunta: 'Havia alguém para te ajudar ou tudo não passa de uma ilusão?'",
            opcoes: [
                { texto: "Tentar novamente, mesmo assim", proximo: 0 },
                { texto: "Correr para longe, deixar tudo para trás", proximo: 3 }
            ]
        },
        {
            texto: "Você se esconde e sente uma leve segurança na floresta, mas a incerteza persiste. Você se pergunta: 'Estarei apenas adiando o que virá?'. Os sussurros do vento compartilham segredos que só você parece ouvir.",
            opcoes: [
                { texto: "Esperar e escutar", proximo: 1 },
                { texto: "Explorar a floresta, em busca de respostas", proximo: 6 }
            ]
        },
        {
            texto: "O espírito sorri, uma expressão que transmite esperança, mas também um toque de tristeza. Ele oferece ajuda para encontrar seu caminho, mas você hesita. 'Posso confiar nele ou ele esconde algo de mim?'",
            opcoes: [
                { texto: "Aceitar a ajuda, mesmo com receios", proximo: 7 },
                { texto: "Recusar e continuar sozinho", proximo: 3 }
            ]
        },
        {
            texto: "Ao chegar mais perto da mansão, a sensação de abandono se intensifica. A porta da frente está entreaberta, como um convite ou uma armadilha. Você hesita, o medo e a curiosidade lutam dentro de você. O que te aguarda lá dentro?",
            opcoes: [
                { texto: "Entrar na mansão, enfrentar o desconhecido", proximo: 2 },
                { texto: "Voltar para a floresta, ainda na busca por segurança", proximo: 1 }
            ]
        },
        {
            texto: "Você decide que seria melhor ignorar a mansão e continuar pela floresta, mas o sentimento de um caminho sem saída te consome. 'Será que eu realmente estou escapando do que me assombra?'...",
            opcoes: [
                { texto: "Tentar uma nova direção, vendo o que mais pode surgir", proximo: 0 }
            ]
        },
        {
            texto: "Com um profundo suspiro, você empurra a porta da mansão e entra. O ar está frio e pesado, como se interrompessem seus pensamentos. Você sente como se olhos invisíveis te seguissem, questionando suas decisões e suas intenções.",
            opcoes: [
                { texto: "Tocar a maçaneta da porta ao lado, curiosidade ou medo?", proximo: 8 }
            ]
        },
        {
            texto: "Ao tocar a maçaneta, tudo ao seu redor escurece. Uma sensação de torpor se apodera de sua mente, como se você estivesse sendo levado a lugares aterrorizantes de sua própria mente. Em um instante, tudo fica preto.",
            opcoes: [
                { texto: "Continuar, mesmo sem saber onde você está indo", proximo: 4 }
            ]
        }, 

        //ADICIONANDO O BOTÃO PARA FINAL (JOGANDO PARA O EP 2)

        {
            texto: "Sua mente vaga no vazio... Até que uma nova realidade começa a se formar diante de vocÊ.",
            opcoes: [
                {texto: "Iniciar Episódio 2", proximo: "ep2"}
            ]
        }

        
    ];

    let dialogoAtual = 0; // Este controlará o índice do diálogo atual

    function mostrarDialogo(index) {
        const dialogo = dialogos[index];
        const textoDialogo = document.getElementById("texto");
        const opcoes = document.getElementById("opcoes");
    
        textoDialogo.innerText = dialogo.texto;
        opcoes.innerHTML = ""; // Limpa opções anteriores
    
        dialogo.opcoes.forEach(opcao => {
            const botao = document.createElement("button");
            botao.className = "botao-opcao";
            botao.innerText = opcao.texto;
            botao.onclick = () => {
                // Verifica se a opção tem um 'proximo' que é uma string (neste caso, "ep1")
                if (typeof opcao.proximo === 'string' && opcao.proximo === 'ep2') {
                    // Redireciona para a nova página
                    window.location.href = "http://127.0.0.1:5500/game1/ep2/ep2.html"; // Substitua "sua_nova_pagina.html" pelo nome do arquivo da sua nova página
                } else {
                    dialogoAtual = opcao.proximo; // Atualiza para o próximo diálogo
                    // Chama escurecer tela para o diálogo de tocar a maçaneta
                    if (index === 8) { // Índice do diálogo que escurece a tela
                        escurecerTela();
                    } else {
                        mostrarDialogo(dialogoAtual); // Mostra o próximo diálogo
                    }
                }
            };
            opcoes.appendChild(botao);
        });
    }

    function escurecerTela() {
        const tela = document.getElementById("tela");
        tela.style.opacity = "1"; // Torna a tela visível
        setTimeout(() => {
            dialogoAtual = 9; // Altera para o índice do próximo diálogo
            mostrarDialogo(dialogoAtual);
        }, 1000); // Espera 1 segundo antes de continuar
    }

    // Chame esta função com o índice inicial (0)
    function continuarCena() {
        mostrarDialogo(dialogoAtual);
    }
}