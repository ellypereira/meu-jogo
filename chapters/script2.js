// ========================
// 🎮 BLOOD AND SILENCE — Capítulo 2
// ========================

const storyText = document.getElementById('story-text');
const textBox = document.getElementById('text-box');
const choices = document.getElementById('choices');
const bgMusic = document.getElementById('bg-music');

const jakeImage = document.getElementById('jake-image');
const klausImage = document.getElementById('klaus-image');
const collarImage = document.getElementById('collar-image');

const STAGE_KEY_CAP2 = 'bs_stage_cap2_v1';
let savedStage = parseInt(localStorage.getItem(STAGE_KEY_CAP2), 10);
let stage = Number.isNaN(savedStage) ? 0 : savedStage;

let musicStarted = false;
let isLocked = false;
let waitingForChoice = false; // evitar gastar PA em escolha

// Afinidades
const oldAffinity = JSON.parse(localStorage.getItem('affinity')) || {
  Lucien: 0,
  Elias: 0,
  Klaus: 0,
  Jake: 0
};

// inicializações com fallback seguro (parseInt com radix e verificação NaN)
let lucienAffinity = parseInt(localStorage.getItem('lucienAffinity'), 10);
if (Number.isNaN(lucienAffinity)) lucienAffinity = oldAffinity.Lucien || 0;

let eliasAffinity = parseInt(localStorage.getItem('eliasAffinity'), 10);
if (Number.isNaN(eliasAffinity)) eliasAffinity = oldAffinity.Elias || 0;

let jakeAffinity = parseInt(localStorage.getItem('jakeAffinity'), 10);
if (Number.isNaN(jakeAffinity)) jakeAffinity = oldAffinity.Jake || 0;

let klausAffinity = parseInt(localStorage.getItem('klausAffinity'), 10);
if (Number.isNaN(klausAffinity)) klausAffinity = oldAffinity.Klaus || 0;

// ========================
// EVENTO DE CLIQUE
// ========================
textBox.addEventListener('click', nextScene);

// ========================
// FUNÇÕES GERAIS
// ========================
function updateStoryText(newText) {
  storyText.classList.add('fade-out');
  setTimeout(() => {
    storyText.textContent = newText;
    storyText.classList.remove('fade-out');
  }, 200);
}

function showTemporaryImage(imageElement, duration = 3000) {
  const allImages = document.querySelectorAll('.character-image, #collar-image');
  allImages.forEach(img => {
  img.classList.remove('show');
  img.classList.add('hidden');
  });

  if (imageElement) {
    imageElement.classList.remove('hidden');
    imageElement.classList.add('show');

    setTimeout(() => {
      imageElement.classList.remove('show');
      imageElement.classList.add('hidden');
    }, duration);
  }
}

function showCharacterImage(imageElement, duration = 3000) {
  showTemporaryImage(imageElement, duration);
}

function showCollarImage() {
  showTemporaryImage(collarImage, 3000);
}

function mudarCenario(classe) {
  const tela = document.getElementById('game-screen');
  if (!tela) return;
  tela.classList.remove('bg-quarto', 'bg-salao');
  tela.classList.add(classe);
}

// ========================
// CENAS
// ========================
function nextScene() {
  // bloqueia se estiver num estado de escolha
  if (isLocked || waitingForChoice) return;

  // trava rápido pra evitar double-clicks
  isLocked = true;
  setTimeout(() => isLocked = false, 600);

  if (!musicStarted) {
    bgMusic.volume = 0.4;
    try { bgMusic.play(); } catch(e) {}
    musicStarted = true;
  }

  // 💰 GASTA 1 PA ANTES DE AVANÇAR
  if (typeof tentarGastarPA === "function") {
    const ok = tentarGastarPA(1);
    if (!ok) {
      // Sem PA → não avança
      return;
    }
  }

  switch (stage) {
    // ===== EPISÓDIO 3 =====
    case 0:
      updateStoryText("(Já faz um dia desde que acordei naquela cama estranha. Elias e Lucien tentaram agir como se tudo fosse normal... mas nada aqui é.)");
      stage++;
      break;
    case 1:
      updateStoryText("(Hoje eles finalmente falaram sobre o colar... O mesmo que perdi no orfanato, anos atrás.)");
      stage++; break;
    case 2:
      updateStoryText("(Disseram que ele pertencia à minha mãe, uma Guardiã do limiar.)");
      stage++; break;
    case 3:
      updateStoryText("(Ela mantinha o equilíbrio entre o mundo dos vivos e o das sombras.)");
      stage++; break;
    case 4:
      updateStoryText("(Contaram sobre rituais antigos, vínculos de sangue e alma)");
      stage++; break;
    case 5:
      updateStoryText("(Minha mãe se ofereceu como âncora... Selando algo, ou alguém que não quer ficar presa.)");
      stage++; break;
    case 6:
      updateStoryText("(O colar era parte do pacto, uma chave.)");
      stage++; break;
    case 7:
      updateStoryText("(Eles disseram que eu fui vigiada desde o nascimento, não por compaixão, mas porque talvez eu tivesse herdado o lugar dela.)");
      stage++; break;
    case 8:
      updateStoryText("(Não sei o que dói mais, a ideia de ter sido um fardo... ou a sensação de que no fundo sempre soube que tinha algo errado comigo.)");
      stage++; break;
    case 9:
      updateStoryText("(Hoje, Elias me devolveu o mesmo colar que havia 'perdido'. Ele parece novo, mas a energia é a mesma de quando era criança)");
      showCollarImage();
      stage++; break;
    case 10:
      updateStoryText("(Ao tocá-lo... vozes antigas sussurraram sob minha pele, me chamavam...)");
      stage++; break;
    case 11:
      showIdentityChoice(); 
      // salva o ponto de escolha pra voltar aqui caso recarregue
      localStorage.setItem(STAGE_KEY_CAP2, stage);
      return;
    case 12:
      showBondingChoice(); 
      // salvado dentro da função bond se o jogador decidir
      return;
    case 13:
      concludeEpisode3(); 
      return;

    // ===== EPISÓDIO 4 =====
    case 14:
      mudarCenario('bg-salao');
      updateStoryText("(Um novo dia começa, mas o ar na mansão está diferente. O colar pesa no meu pescoço como se tivesse dobrado de peso durante a noite)");
      stage++; break;
    case 15:
      updateStoryText("(Elias saiu cedo para 'resolver algo'. Lucien desapareceu antes do amanhecer. Pela primeira vez, estou sozinha nos corredores... ou quase.)");
      stage++; break;
    case 16:
      updateStoryText("O silêncio é quebrado por um som eletrônico, quase fora de lugar ali. Cliques rápidos, música abafada, risos baixos)");
      stage++; break;
    case 17:
      updateStoryText("(Sigo o som até um canto do salão. Um garoto está jogando em um notebook. Ele levanta os olhos por cima da tela.)" +
        "__'Então você é a famosa garota do colar, sou Jake. A mansão ficou menos chata desde que você chegou.'");
      showCharacterImage(jakeImage);
      stage++; break;
    case 18:
      updateStoryText("(Antes que eu consiga responder, ouço passos firmes atrás de mim.)" +
      " Um homem alto, de postura impecável, entra em silêncio. Ele não sorri. Apenas me analisa dos pés à cabeça, como se eu fosse parte de um relatório.)");
      showCharacterImage(klausImage);
      stage++; break;
    case 19:
      updateStoryText("(Jake suspira sem tirar os olhos da tela.) __'Relaxa, ele não morde... muito' (comenta, rindo sozinho.) —'Esse é o Klaus. Ele gosta mais de planejamento do que de pessoas.'");
      stage++; break;
    case 20:
      showFirstChoicesEp4(); 
      // salva o ponto de escolha
      localStorage.setItem(STAGE_KEY_CAP2, stage);
      return;
    case 21:
      showSecondChoicesEp4(); 
      // salvo dentro da escolha
      return;
    case 22:
      defineRouteEp4(); 
      return;
    default:
      return;
  }

  // Salva o stage atual sempre que avançar cena
  localStorage.setItem(STAGE_KEY_CAP2, stage);
}

// ========================
// FUNÇÕES DE ESCOLHA — EP3
// ========================
function showIdentityChoice() {
  waitingForChoice = true;
  updateStoryText("As vozes no fundo da minha mente repetem um nome antigo, não é o nome que me deram no orfanato. É algo que parece... anterior a tudo.");
  choices.innerHTML = `
    <button class="choice-button" onclick="chooseIdentity(1)">Aceitar o chamado e ouvir as vozes</button>
    <button class="choice-button" onclick="chooseIdentity(2)">Recusar e tirar o colar</button>
  `;
}

function chooseIdentity(option) {
  waitingForChoice = false;
  choices.innerHTML = '';
  if (option === 1) {
    updateStoryText("(Fecho os olhos e deixo as vozes chegarem mais perto. Elas não falam comigo como se eu fosse uma estranha... Mas como se estivessem me reencontrando)");
    // dependendo da lógica, você pode aumentar afinidade aqui
  } else {
    updateStoryText("(Meu instinto grita mais alto. Arranco o colar do pescoço, o metal arranha minha pele, as vozes somem num corte seco... Mas algo dentro de mim começa a gritar no lugar deles.)");
    lucienAffinity -= 1;
    eliasAffinity -= 1;
    // salva imediamente para não perder se jogador sair
    localStorage.setItem('lucienAffinity', lucienAffinity);
    localStorage.setItem('eliasAffinity', eliasAffinity);
  }
  stage = 12;
  localStorage.setItem(STAGE_KEY_CAP2, stage);
}

function showBondingChoice() {
  setTimeout(() => {
    waitingForChoice = true;
    updateStoryText("Quando abro os olhos, vejo Lucien e Elias me observando de longe. Não sei se é preocupação, curiosidade ou medo....");
    choices.innerHTML = `
      <button class="choice-button" onclick="bond(1)">Aproximar-se de Lucien, apesar do risco</button>
      <button class="choice-button" onclick="bond(2)">Ficar ao lado de Elias em busca de segurança</button>
      <button class="choice-button" onclick="bond(3)">Pedir para ficar sozinha com o colar</button>
    `;
  }, 500);
}

function bond(option) {
  waitingForChoice = false;
  choices.innerHTML = '';
  if (option === 1) {
    updateStoryText("(Caminho até Lucien, meu coração acelerado.) __'Você está começando a entender' (diz ele, com um sorriso sombrio. Não sei se isso é um aviso ou um elogio)");
    lucienAffinity += 2;
    localStorage.setItem('lucienAffinity', lucienAffinity);
  } else if (option === 2) {
    updateStoryText("(Me aproximo de Elias, quase por reflexo. Ele pousa a mão no meu ombro, com cuidado.) __'Você não está sozinha, nunca esteve.' (Ele diz, e alguma parte de mim acredita nisso)");
    eliasAffinity += 2;
    localStorage.setItem('eliasAffinity', eliasAffinity);
  } else {
    updateStoryText("(Respiro fundo) __Eu... preciso ficar um pouco sozinha com isso. (Seguro o colar com força, se existe uma resposta, quero ouvir da minha própria maneira)");
    lucienAffinity = 0;
    eliasAffinity = 0;
    localStorage.setItem('lucienAffinity', lucienAffinity);
    localStorage.setItem('eliasAffinity', eliasAffinity);
  }
  stage = 13;
  localStorage.setItem(STAGE_KEY_CAP2, stage);
}

function concludeEpisode3() {
  setTimeout(() => {
    if (lucienAffinity > eliasAffinity) {
      updateStoryText("(Sinto o olhar de Lucien queimar minha nuca) __'E o que está preso... Finalmente sente você, o colar despertou' (ele diz em voz baixa)");
    } else if (eliasAffinity > lucienAffinity) {
      updateStoryText("(Elias segura minha mão com firmeza) __'O selo está enfraquecendo' (ele admite) __'Mas ainda há tempo...Se você escolher com sabedoria'.");
    } else {
      updateStoryText("(Sozinha no quarto, encosto a testa na madeira fria da porta, as vozes voltam em sussurros quase inaudíveis) __Eles estão vindo.__");
    }

    // afinidades já foram salvas nas escolhas, mas reforçamos
    localStorage.setItem('lucienAffinity', lucienAffinity);
    localStorage.setItem('eliasAffinity', eliasAffinity);

    stage = 14;
    localStorage.setItem(STAGE_KEY_CAP2, stage);

   /* setTimeout(() => nextScene(), 5000); */ //fiz isso pois o meu dialogo estava avançando sem click
  }, 3000);
}

// ========================
// FUNÇÕES DE ESCOLHA — EP4
// ========================
function showFirstChoicesEp4() {
  waitingForChoice = true;
  choices.innerHTML = `
    <button class="choice-button" onclick="chooseEp4First(1)">Se aproximar de Jake e puxar conversa sobre o jogo dele</button>
    <button class="choice-button" onclick="chooseEp4First(2)">Observar Klaus em silêncio e tentar entender seu jeito</button>
  `;
}

function chooseEp4First(option) {
  waitingForChoice = false;
  choices.innerHTML = '';
  if (option === 1) {
    updateStoryText("(Me aproximo de Jake e tento ver a tela.) —'Você sempre joga assim para esquecer o caos lá fora?' (Ele ri baixo, e responde) —'Às vezes, é o caos daqui que salva do de lá.'");
    jakeAffinity += 1;
    localStorage.setItem('jakeAffinity', jakeAffinity);
  } else {
    updateStoryText("(Fico perto de Klaus, sem dizer nada. Ele percebe, mas não afasta o olhar da janela.) — O silêncio também é uma escolha (ele diz por fim.) —'E, às vezes, é a mais segura.'");
    klausAffinity += 1;
    localStorage.setItem('klausAffinity', klausAffinity);
  }
  stage = 21;
  localStorage.setItem(STAGE_KEY_CAP2, stage);
}

function showSecondChoicesEp4() {
  setTimeout(() => {
    waitingForChoice = true;
    updateStoryText("Os dois são opostos completos: um preenche o espaço com risadas e comentários, o outro com silêncio e presença. E, de algum jeito, os dois parecem perigosos");
    choices.innerHTML = `
      <button class="choice-button" onclick="chooseEp4Second(1)">Mostrar interesse pelo mundo de Jake e suas histórias</button>
      <button class="choice-button" onclick="chooseEp4Second(2)">Tentar puxar conversa séria com Klaus</button>
      <button class="choice-button" onclick="chooseEp4Second(3)">Preferir ficar sozinha e refletir</button>
    `;
  }, 600);
}

function chooseEp4Second(option) {
  waitingForChoice = false;
  choices.innerHTML = '';
  if (option === 1) {
    updateStoryText("(Sento perto de Jake.) — Me conta, o que você jogava antes de tudo isso? (Ele fecha o notebook aos poucos.) —'Histórias onde eu podia salvar alguém... Acho que agora é a sua vez de escolher quem salvar.'");
    jakeAffinity += 2;
    localStorage.setItem('jakeAffinity', jakeAffinity);
  } else if (option === 2) {
    updateStoryText("(Respiro fundo e encaro Klaus.) —'Você sempre parece saber mais do que fala.' (Ele sustenta meu olhar.) —'Saber demais é um risco. Mas alguém precisa carregar esse peso, não é?'");
    klausAffinity += 2;
    localStorage.setItem('klausAffinity', klausAffinity);
  } else {
    updateStoryText("(Dou alguns passos para longe. Preciso ver a mansão com meus próprios olhos, sem ninguém filtrando o que está acontecendo por mim.)");
  }
  stage = 22;
  localStorage.setItem(STAGE_KEY_CAP2, stage);
}

function defineRouteEp4() {
  setTimeout(() => {
    if (jakeAffinity > klausAffinity) {
      updateStoryText("(Jake se estica na cadeira, me olhando como se fosse um novo desafio.) —'Você é do tipo que prefere escolher o próprio comando, né?' (Antes que eu responda, um estrondo corta o ar)");
    } else if (klausAffinity > jakeAffinity) {
      updateStoryText("(Klaus permanece em silêncio, mas algo muda em seu olhar. Um aceno quase imperceptível, mostra um tipo de respeito silencioso que ele não dá para qualquer um.)");
    } else {
      updateStoryText("(Sinto os dois me observando. Talvez nenhum deles seja o que aparenta...)");
    }

    localStorage.setItem('jakeAffinity', jakeAffinity);
    localStorage.setItem('klausAffinity', klausAffinity);

    setTimeout(() => {
      updateStoryText(storyText.textContent + " A mansão inteira treme, como se estivesse tentando avisar sobre um perigo iminente.");
    }, 1000);

    setTimeout(() => {
      choices.innerHTML = `<button class="choice-button" onclick="goToNext()">Avançar para o capítulo 3</button>`;
    }, 4000);
  }, 1500);
}

function goToNext() {
  window.location.href = 'capitulo3.html';
}
