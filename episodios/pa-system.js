// ========================
// SISTEMA DE PA - BLOOD AND SILENCE
// ========================

// quantidade d PA
const DAILY_PA = 15;           // PA que o jogador ganha todo dia
const DAILY_BONUS_PA = 10;     // Bônus diário opcional (botão no HUD)

// Chaves de armazenamento
const STORAGE_KEY = "bs_pa_data_v1";      // estado de PA
const BONUS_KEY   = "bs_daily_bonus_v1";  // controle de bônus diário (por data)


// Alertinha bonitinho 
function showAlert(message) {
  const alertBox = document.getElementById("custom-alert");
  const alertMessage = document.getElementById("alert-message");
  const alertOk = document.getElementById("alert-ok");

  alertMessage.textContent = message;
  alertBox.classList.add("show"); 

  alertOk.onclick = () => {
    alertBox.classList.remove("show");
  };
}

// Estado em memória
let paState = {
  pa: DAILY_PA,
  lastDate: null
};


function getTodayString() {
  const hoje = new Date();
  return hoje.toISOString().slice(0, 10); // "YYYY-MM-DD"
}


function loadPAState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  const today = getTodayString();

  if (saved) {
    try {
      const data = JSON.parse(saved);

      // Dia novo → reseta PA diário
      if (data.lastDate !== today) {
        paState = {
          pa: DAILY_PA,
          lastDate: today
        };
      } else {
        paState = {
          pa: typeof data.pa === "number" ? data.pa : DAILY_PA,
          lastDate: data.lastDate || today
        };
      }
    } catch (e) {
      paState = {
        pa: DAILY_PA,
        lastDate: today
      };
    }
  } else {
    // Primeira vez jogando
    paState = {
      pa: DAILY_PA,
      lastDate: today
    };
  }

  updatePAHUD();
  savePAState();
}

function savePAState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(paState));
}

function updatePAHUD() {
  const spanPA = document.getElementById("pa-valor");
  if (spanPA) {
    spanPA.textContent = paState.pa;
  }
}

// Tenta gastar X PA. Se não tiver, bloqueia.
function tentarGastarPA(qtd) {
  if (paState.pa >= qtd) {
    paState.pa -= qtd;
    savePAState();
    updatePAHUD();
    return true;
  } else {
      showAlert("Você ficou sem PA por hoje! Volte amanhã para continuar acompanhando a história.");
    return false;
  }
}

// Retorna true se ainda não pegou bônus hoje
function podePegarBonusHoje() {
  const hoje = getTodayString();
  const lastBonus = localStorage.getItem(BONUS_KEY);
  return lastBonus !== hoje;
}

// Dá bônus diário de PA
function pegarBonusDiario() {
  if (!podePegarBonusHoje()) {
    showAlert("Você já pegou o bônus diário de hoje. Volte amanhã!");
    return;
  }

  paState.pa += DAILY_BONUS_PA;
  savePAState();
  updatePAHUD();
  localStorage.setItem(BONUS_KEY, getTodayString());

  showAlert(`Você ganhou +${DAILY_BONUS_PA} PA de bônus diário!`);
}


// INICIALIZAÇÃO
// ----------------------------
window.addEventListener("load", () => {
  // Carrega/atualiza PA diário
  loadPAState();

  // Botão de bônus diário (se você colocar no HTML)
  const btnBonus = document.getElementById("btn-bonus-diario");
  if (btnBonus) {
    btnBonus.addEventListener("click", pegarBonusDiario);
  }

  // Botão do blog / (antes era "Assistir anúncio")
  const btnAnuncio = document.getElementById("btn-anuncio");
  if (btnAnuncio) {
    btnAnuncio.addEventListener("click", () => {
      // Abre a página de blog em nova aba
      // Importante: n tem ligação com recompensa de PA, pra não dar problema com AdSense
      window.open("blog.html", "_blank");
    });
  }
});

// ----------------------------
// Função extra se você quiser
// dar PA por outras coisas (ex: códigos, eventos especiais)
// ----------------------------
function ganharPA(valor) {
  const v = Number(valor) || 0;
  if (v <= 0) return;

  paState.pa += v;
  savePAState();
  updatePAHUD();
}