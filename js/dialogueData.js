/* ===============================
   🩸 BLOOD AND SILENCE
   📖 CAPÍTULO 1 — O CHAMADO
   =============================== */

const CHAPTER_1 = [
  {
    type: "narrator",
    text:
      "Eu não deveria estar ali.\n\n" +
      "Sabia disso desde o momento em que decidi sair sem rumo.\n\n" +
      "Os últimos meses tinham sido pesados demais. Silêncios longos, noites mal dormidas, " +
      "pensamentos que insistiam em não ir embora.\n\n" +
      "Eu só precisava andar. Respirar. Sumir por um instante."
  },

  {
    type: "narrator",
    text:
      "Mas a trilha parecia não terminar nunca.\n\n" +
      "A floresta foi ficando mais densa, o ar mais frio, " +
      "e quando percebi, já não reconhecia o caminho por onde tinha vindo.\n\n" +
      "Meu celular estava sem sinal.\n" +
      "Nenhum som além do vento entre as árvores."
  },

  {
    type: "narrator",
    text:
      "Foi então que senti.\n\n" +
      "Não passos.\n" +
      "Não galhos quebrando.\n\n" +
      "Olhares.",
    effect: "silhouette"
  },

  {
    type: "speech",
    character: "lucien",
    text: "Hum… uma humana perdida?"
  },

  {
    type: "speech",
    character: "elias",
    text: "Ela está assustada. Devíamos ajudá-la."
  },

  {
    type: "narrator",
    text:
      "Meu coração dispara.\n\n" +
      "Eles não pareciam pessoas comuns.\n\n" +
      "Elegantes demais. Silenciosos demais.\n\n" +
      "E ainda assim… estranhamente familiares."
  },

  {
    type: "narrator",
    text:
      "Instinto puro toma conta do meu corpo.\n\n" +
      "Sem entender o porquê, eu tinha a sensação clara de que havia cruzado uma linha invisível.\n\n" +
      "E nada do que viesse depois poderia ser desfeito."
  },

  {
    type: "narrator",
    text:
      "Antes que eu pudesse pensar melhor, virei o corpo e comecei a correr."
  },

  {
    type: "narrator",
    text:
      "*PUM!*\n\n" +
      "Meu pé prende em algo escondido sob a terra.\n\n" +
      "O chão some sob meus pés.\n" +
      "E tudo escurece.",
    effect: "shake" //"shake"
  },

  {
    type: "narrator",
    text:
      "Quando acordei, o silêncio era diferente.\n\n" +
      "Havia um cheiro de vela, madeira antiga e algo levemente doce no ar.\n\n" +
      "Minha cabeça latejava.\n" +
      "Eu estava em um lugar completamente diferente."
  },

  {
    type: "narrator",
    text:
      "O quarto era amplo demais para ser um hospital.\n\n" +
      "Cortinas pesadas.\n" +
      "Candelabros antigos.\n" +
      "Uma cama que definitivamente não era minha."
  },

  {
    type: "speech",
    character: "lucien",
    text: "Dorminhoca. Confesso que esperava que você acordasse gritando."
  },

  {
    type: "speech",
    character: "elias",
    text: "Lucien… vá com calma. Ela acabou de despertar."
  },

  {
    type: "choice",
    choices: [
      {
        text: "— O que vocês fizeram comigo? Fiquem longe de mim!",
        affinity: { Lucien: 1 },
        next: 14
      },
      {
        text: "— Obrigada por terem me ajudado… eu acho.",
        affinity: { Elias: 1 },
        next: 14
      }
    ]
  },

  {
    type: "narrator",
    text:
      "O silêncio que se seguiu foi pesado.\n\n" +
      "Como se algo antigo tivesse acabado de despertar."
  },

  {
    type: "speech",
    character: "elias",
    text:
      "Então… é verdade.\n\n" +
      "Uma Guardiã."
  },

  {
    type: "speech",
    character: "lucien",
    text:
      "Ótimo.\n\n" +
      "Isso explica por que a mansão inteira estremeceu no momento em que você chegou."
  },

  {
    type: "narrator",
    text:
      "Meu olhar desce instintivamente até o meu peito.\n\n" +
      "O colar.\n\n" +
      "Ele ainda estava comigo."
  },

  {
    type: "narrator",
    text:
      "Quando meus dedos tocaram o pingente, um arrepio percorreu minha espinha.\n\n" +
      "Por um segundo, tive a estranha sensação de não estar sozinha dentro de mim."
  },

  {
    type: "speech",
    character: "elias",
    text:
      "Esse colar…\n\n" +
      "Ele reagiu no momento em que você chegou."
  },

  {
    type: "speech",
    character: "lucien",
    text:
      "Não reage com qualquer um.\n\n" +
      "Você faz ideia do que está carregando?"
  },

  {
    type: "narrator",
    text:
      "O ar ao meu redor pareceu ficar mais pesado.\n\n" +
      "As chamas das velas tremularam sozinhas.\n\n" +
      "E, por um instante, tive a nítida sensação de que algo havia despertado."
  },

  {
    type: "narrator",
    text:
      "Lá fora, algo se moveu.\n\n" +
      "As paredes rangeram suavemente.\n\n" +
      "E tive certeza de que…\n\n" +
      "estávamos sendo observados."
  },

  {
    type: "narrator",
    text:
      "Sem saber, eu tinha acabado de chamar a atenção das Sombras.\n\n" +
      "E aquele foi apenas o começo."
  }
];
