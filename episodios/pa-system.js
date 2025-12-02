// ========================
// SISTEMA DE PA - BLOOD AND SILENCE
// ========================
const DAILY_PA = 15;     // PA diário
const AD_PA = 10;        // PA por "anúncio"
const STORAGE_KEY = "bs_pa_data_v1";

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
    if (typeof showAlert === "function") {
      showAlert("Você ficou sem PA por hoje! Volte amanhã ou use o botão de patrocínio para ganhar mais.");
    } else {
      alert ("Você ficou sem PA por hoje! Volte amanhã ou use botão de patrocínio para ganhar mais.");
    }
    return false;
  }
}

// Ganha PA (chamado quando o jogador retorna do patrocinio.html)
function ganharPAComAnuncio() {
  paState.pa += AD_PA;
  savePAState();
  updatePAHUD();
  showAlert(`Você ganhou +${AD_PA} PA por apoiar o jogo!`);
}

// Inicialização do sistema de PA
window.addEventListener("load", () => {
  loadPAState();

  // Verifica se o jogador acabou de sair do patrocinio.html
  const rewardFlag = localStorage.getItem("reward-pa");
  if (rewardFlag === "ok") {
    localStorage.removeItem("reward-pa");
    // Dá a recompensa apenas uma vez
    ganharPAComAnuncio();
  }

  const btnAnuncio = document.getElementById("btn-anuncio");
  if (btnAnuncio) {
    btnAnuncio.addEventListener("click", () => {
      // Leva para a página de patrocínio
      window.location.href = "   blog.html";
    });
  }
});
